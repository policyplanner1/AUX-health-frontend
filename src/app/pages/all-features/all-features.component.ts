import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

type TabKey = 'includes' | 'excludes' | 'cashless' | 'claim' | 'addons';

interface PremiumOption {
  id: '1Y' | '2Y' | '3Y';
  label: string;
  amount: number;   // base premium (numeric)
  display: string;  // formatted label for UI
}

@Component({
  selector: 'app-all-features',
  templateUrl: './all-features.component.html',
  styleUrls: ['./all-features.component.css'],
})
export class AllFeaturesComponent implements OnInit {

  constructor(private readonly sanitizer: DomSanitizer) { }

  /* ---------- DATA FROM PREVIOUS SCREEN ---------- */
  selectedPlan: any = null;

  // only if you still want to reuse this name elsewhere
  proposalData = {
    productName: '',
  };

  /* ========== Header / Summary (dynamic) ========== */
  insurerLogo = '';
  insurerName = '';
  productName = '';

  /* ========== Right panel (dynamic) ========== */
  insured = { self: '', pincode: '' };

  /* ========== Premium options (dynamic) ========== */
  premiumOptions: PremiumOption[] = [];
  selectedTenure: PremiumOption | null = null;

  coverAmount = '';
  membersCovered = '';
  discount = 0;
  private totalPremiumOverride?: number;

  get basePremium(): number {
    return this.selectedTenure?.amount || 0;
  }

  get totalPremium(): number {
    if (this.totalPremiumOverride != null) {
      return this.totalPremiumOverride;
    }
    return this.basePremium - this.discount;
  }

  /* ========== Tabs ========== */
  activeTab: TabKey = 'includes';
  setTab(tab: TabKey): void {
    this.activeTab = tab;
  }

  /* ========== Includes / Excludes from features[] ========== */
  includesList: string[] = [];
  excludesList: string[] = [];

  /* ========== YouTube inline video ========== */
  readonly youtubeId = '2g8VSYbV5ag';
  showYouTube = false;
  youtubeUrl?: SafeResourceUrl;

  startVideo(): void {
    if (this.showYouTube) return;
    const url = `https://www.youtube.com/embed/${this.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
    this.youtubeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.showYouTube = true;
  }

  /* ========== Share plan ========== */
  async sharePlan(): Promise<void> {
    const navAny = navigator as Navigator & { share?: Function; clipboard?: any };

    const payload = {
      title: `${this.insurerName} ${this.productName}`.trim(),
      text: 'Check this health plan',
      url: window.location.href,
    };

    try {
      if (typeof navAny.share === 'function') {
        await navAny.share(payload);
        return;
      }
    } catch {
      // ignore and fall back to copy
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied!');
    } catch {
      prompt('Copy this link:', window.location.href);
    }
  }

  /* ========== Tenure selection ========== */
  chooseTenure(opt: PremiumOption & { base?: number; discount?: number; payable?: number }): void {
    this.selectedTenure = opt;
    // keep right-panel numbers in sync
    this.discount = Number((opt as any).discount ?? 0);
    this.totalPremiumOverride = Number((opt as any).payable ?? (opt.amount - this.discount));
  }

  /* =====================================================
     ngOnInit – USE selectedPlan DATA
     ===================================================== */
  ngOnInit(): void {
    const navState = history.state as { selectedPlan?: any };

    this.selectedPlan = navState?.selectedPlan || null;

    if (!this.selectedPlan) {
      console.warn('No selectedPlan found in history.state');
      return;
    }

    console.log('✅ Selected Plan from navigation state:', this.selectedPlan);

    /* ---------- Company + Plan ---------- */
    const companyName = this.selectedPlan.company?.company_name || '';
    const planName =
      this.selectedPlan.planName ||
      this.selectedPlan.plan?.plan_name ||
      '';

    if (companyName) {
      this.insurerName = companyName;
    }

    if (planName) {
      this.productName = planName;
    }

    this.proposalData.productName = `${companyName} ${planName}`.trim();

    /* ---------- Logo (if available in API) ---------- */
    const logoUrl =
      this.selectedPlan.company?.logo ||
      this.selectedPlan.insurerLogo ||
      this.selectedPlan.logo ||
      '';
    if (logoUrl) {
      this.insurerLogo = '/assets/quote/' + logoUrl;
    }

    /* ---------- Premium (base, discount, payable) ---------- */
    const basePremium = Number(this.selectedPlan.totalBasePremium ?? 0);
    const discount = Number(this.selectedPlan.totalDiscount ?? 0);
    const payable = Number(
      this.selectedPlan.totalPayablePremium ?? basePremium - discount
    );

    this.discount = discount;
    this.totalPremiumOverride = payable;


    /* ---------- Premium (base, discount, payable) ---------- */
    const base1 = Number(this.selectedPlan.totalBasePremium ?? 0);
    const disc1 = Number(this.selectedPlan.totalDiscount ?? 0);
    const pay1 = Number(
      this.selectedPlan.totalPayablePremium ?? base1 - disc1
    );

    /* If API gives explicit multi-year numbers, use them.
       Otherwise, fall back to multiples of 1Y. */
    const base2 = Number(this.selectedPlan.totalBasePremium2Y ?? base1 * 2);
    const disc2 = Number(this.selectedPlan.totalDiscount2Y ?? disc1 * 2);
    const pay2 = Number(
      this.selectedPlan.totalPayablePremium2Y ?? base2 - disc2
    );

    const base3 = Number(this.selectedPlan.totalBasePremium3Y ?? base1 * 3);
    const disc3 = Number(this.selectedPlan.totalDiscount3Y ?? disc1 * 3);
    const pay3 = Number(
      this.selectedPlan.totalPayablePremium3Y ?? base3 - disc3
    );

    /* Build options */
    this.premiumOptions = [];
    if (base1 > 0) {
      this.premiumOptions.push({
        id: '1Y',
        label: '1 Year',
        amount: base1,              // ← keeps your getter working
        display: this.formatINR(pay1),
        // extra fields to drive totals/discounts
        base: base1, discount: disc1, payable: pay1,
      } as any);
    }
    if (base2 > 0) {
      this.premiumOptions.push({
        id: '2Y',
        label: '2 Year',
        amount: base2,
        display: this.formatINR(pay2),
        base: base2, discount: disc2, payable: pay2,
      } as any);
    }
    if (base3 > 0) {
      this.premiumOptions.push({
        id: '3Y',
        label: '3 Year',
        amount: base3,
        display: this.formatINR(pay3),
        base: base3, discount: disc3, payable: pay3,
      } as any);
    }

    /* Default select 1Y (or first available) */
    this.selectedTenure = this.premiumOptions[0] ?? null;

    /* Keep component-wide numbers in sync with the selected option */
    if (this.selectedTenure) {
      this.discount = (this.selectedTenure as any).discount;
      this.totalPremiumOverride = (this.selectedTenure as any).payable;
    }

    // If you only have 1-year premium from API, create 1 option
    // if (basePremium > 0) {
    //   this.premiumOptions = [
    //     {
    //       id: '1Y',
    //       label: '1 Year',
    //       amount: basePremium,
    //       display: this.formatINR(basePremium),
    //     },
    //   ];
    //   this.selectedTenure = this.premiumOptions[0];
    // }

    /* ---------- Cover amount ---------- */
    const sumInsured = this.selectedPlan.coverAmount;
    if (sumInsured) {
      this.coverAmount = '₹ ' + Number(sumInsured).toLocaleString('en-IN');
    }

    /* ---------- Age & pincode / zone ---------- */
    const age =
      this.selectedPlan.eldestActualAge ||
      this.selectedPlan.eldestLookupAge;
    if (age) {
      this.insured.self = `Self: ${age} years`;
    }

    const pincode = this.selectedPlan.pincode;
    if (pincode) {
      this.insured.pincode = `Pincode: ${pincode}`;
    } else if (this.selectedPlan.zone) {
      this.insured.pincode = `Zone: ${this.selectedPlan.zone}`;
    }

    /* ---------- Members covered ---------- */
    const adults = this.selectedPlan.noOfAdults ?? 0;
    const children = this.selectedPlan.noOfChildren ?? 0;
    if (adults || children) {
      const parts: string[] = [];
      if (adults) {
        parts.push(`${adults} Adult${adults > 1 ? 's' : ''}`);
      }
      if (children) {
        parts.push(`${children} Child${children > 1 ? 'ren' : ''}`);
      }
      this.membersCovered = parts.join(', ');
    }

    /* ---------- Includes / Excludes from features[] ---------- */
    const features = this.selectedPlan.features ?? [];
    if (Array.isArray(features)) {
      this.includesList = features
        .map((f: any) => f.includes)
        .filter((txt: string | null | undefined) =>
          txt && String(txt).trim().length > 0
        ) as string[];

      this.excludesList = features
        .map((f: any) => f.excludes)
        .filter((txt: string | null | undefined) =>
          txt && String(txt).trim().length > 0
        ) as string[];
    }
  }

  /* Helper for INR format for display string */
  private formatINR(value: number): string {
    return '₹' + (value || 0).toLocaleString('en-IN');
  }
}
