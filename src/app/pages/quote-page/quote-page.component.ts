import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApicallService } from 'src/app/apicall.service';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Location } from '@angular/common';


interface Plan {
  id: string;
  insurerName: string;
  logo: string;
  productName: string;
  benefits: string[];
  ticks: string[];
  claimSettledPct: string;
  coverAmount: string;
  monthlyPrice: string;
  yearlyPrice: string;
  coverBand?: string;
  features?: { includes: string }[];
}

// ✅ Define the payload type OUTSIDE the class
type PlanPayload = {
  coverAmount: number;
  zone: number | string;
  age: number;
  sage: number | null;
  c1age: number | null;
  c2age: number | null;
  c3age: number | null;
  c4age: number | null;
  cust_Pincode?: string;
  city?: string;
  gender?: string;

};

@Component({
  selector: 'app-quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.css']
})
export class QuotePageComponent implements OnInit {
  trackByPlan = (_: number, plan: any) =>
    plan?.planId ?? plan?.id ?? plan?.planName ?? _;

  // groupedResults: any[] = [];
  // expandedInsurers: Set<string> = new Set();
  results: any[] = [];
  isLoading = false;
  age: number | null = null;
  pincode = '';
  selectedInsurer = '';
  // allGroupedResults: any[] = [];
  displayedResults: any[] = [];

  insurerOptions: string[] = [];
  sortOption: string = 'lowToHigh';
  userName: string = '';
  familyCount: number = 1;
  adultCount: number | null = null;
  childCount: number | null = null;
  selectedCoverageAmt: number | null = null;
  basePayload: PlanPayload | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApicallService,
    private location: Location
  ) { }


  // ✅ Total plans count for heading
  get totalPlansCount(): number {
    return this.displayedResults?.length || 0;
  }


  ngOnInit(): void {

    // ✅ Ensure default sort on first entry to quotes page
    this.sortOption = 'lowToHigh';

    // 1) Prefer localStorage (TEST DATA ONLY – remove before pushing to server)
    const raw = {
      Age: "39",
      cover_amount: "1000000",
      cover_for: "1000",
      cust_Pincode: "416404",
      cust_city: "Cupidatat quis in si",
      cust_fname: "LEVI",
      cust_lname: "HALEY",
      cust_mobile: "9898989898",
      daughterCount: "2",
      gender: "Male",
      self: "",
      spouse: "on",
      SAge: "27",
      sonCount: "",
      zone: "1"
    };

    // localStorage.setItem('healthFormData', JSON.stringify(raw));
    const savedData = localStorage.getItem('healthFormData');

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);

        // ---- NAME FOR TOP-LEFT STRIP ----
        this.userName = `${(parsed.cust_fname || '').trim()} ${(parsed.cust_lname || '').trim()}`.trim();

        // ---- CHILD COUNT (sons + daughters) ----
        const sons = Number(parsed.sonCount || 0);
        const daughters = Number(parsed.daughterCount || 0);
        this.childCount = sons + daughters;

        // ---- ADULT COUNT BASED ON SELECTED CARDS ----
        const isOn = (val: any) => val === 'on' || val === true || val === 1;

        let adults = 0;
        if (isOn(parsed.self)) adults++;
        if (isOn(parsed.spouse) && parsed.SAge) adults++;

        this.adultCount = adults;
        this.familyCount = (this.adultCount || 0) + (this.childCount || 0);

        // ---- Build payload & fetch plans ----
        const payload = this.buildPayloadFromLocal(parsed);
        this.basePayload = payload;

        this.selectedCoverageAmt = payload.coverAmount || null;

        this.age = payload.age ?? null;
        this.pincode = parsed.cust_Pincode ?? '';

        this.fetchAllPlans(payload);
        return;

      } catch (e) {
        console.warn(
          'Failed to parse localStorage healthFormData, falling back to query params.',
          e
        );
      }
    }
  }


  private toNum(v: any, d = 0): number {
    const n = Number(v);
    return Number.isFinite(n) ? n : d;
  }

  private numOrNull(v: any): number | null {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  }

  private buildPayloadFromLocal(ls: any): PlanPayload {
    // collect child ages from sons then daughters
    const childAges: Array<number | null> = [];

    const sonCount = Number(ls?.sonCount) || 0;
    for (let i = 1; i <= sonCount; i++) {
      childAges.push(this.numOrNull(ls?.[`son${i}Age`]));
    }

    const daughterCount = Number(ls?.daughterCount) || 0;
    for (let i = 1; i <= daughterCount; i++) {
      childAges.push(this.numOrNull(ls?.[`daughter${i}Age`]));
    }

    // pad or trim to exactly 4 entries with nulls
    while (childAges.length < 4) childAges.push(null);
    if (childAges.length > 4) childAges.length = 4;

    return {
      coverAmount: this.toNum(ls?.cover_amount, 0),
      zone: ls?.zone ?? '3',           // keep as string if your API expects string
      age: this.toNum(ls?.Age, 0),
      sage: this.numOrNull(ls?.SAge),
      c1age: childAges[0],
      c2age: childAges[1],
      c3age: childAges[2],
      c4age: childAges[3],
    };
  }


  private parsePremium(raw: any): number {
    if (raw === null || raw === undefined) return Number.POSITIVE_INFINITY;

    if (typeof raw === 'number') {
      return Number.isFinite(raw) ? raw : Number.POSITIVE_INFINITY;
    }

    // remove ₹, commas, spaces, /year etc.
    const cleaned = String(raw).replace(/[^0-9.]/g, '');
    const num = Number(cleaned);

    return Number.isFinite(num) ? num : Number.POSITIVE_INFINITY;
  }

  private getPlanPremium(p: any): number {
    // fallback keys for safety
    const raw =
      p?.totalPayablePremium ??
      p?.yearlyPremium ??
      p?.annualPremium ??
      p?.premium ??
      p?.total_premium ??
      p?.totalPremium ??
      null;

    return this.parsePremium(raw);
  }

  private applyListView(): void {
    let list = [...(this.results || [])];

    // ✅ insurer filter (GLOBAL)
    if (this.selectedInsurer) {
      list = list.filter(
        (p: any) => p?.company?.company_name === this.selectedInsurer
      );
    }

    // ✅ default sort safety
    if (!this.sortOption) {
      this.sortOption = 'lowToHigh';
    }

    // ✅ GLOBAL sort (overall list)
    list.sort((a: any, b: any) => {
      const pa = this.getPlanPremium(a);
      const pb = this.getPlanPremium(b);

      if (this.sortOption === 'lowToHigh') return pa - pb;
      if (this.sortOption === 'highToLow') return pb - pa;
      return 0;
    });

    this.displayedResults = list;
  }


  goBack(): void {
    // Try real browser back first
    if (window.history.length > 1) {
      this.location.back();
    } else {
      // Fallback: navigate to the correct previous page route
      this.router.navigate(['/health-insurance.php']); // <-- change to your actual route
    }
  }
  fetchAllPlans(payload: any) {
    this.isLoading = true;
    this.api.getHealthPlanEndpoints().subscribe({
      next: (response) => {
        const apiList = response?.data?.map((item: any) => item.api_type) || [];

        this.api.callAllPremiumApis(apiList, payload).subscribe({
          next: (resArray) => {
            this.results = resArray.filter((res: any) => res && res.planName);
            console.log('Aggregated Results:', this.results);

            // ✅ insurer dropdown build from full results
            this.buildInsurerOptions();

            // ✅ apply GLOBAL filter + GLOBAL sort
            this.applyListView();

            this.isLoading = false;
          },

          error: (err) => {
            console.error('Error calling premium APIs:', err);
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error fetching endpoints:', err);
        this.isLoading = false;
      }
    });
  }
  formatCoverAmount(value: any): string {
    const num = Number(value);
    if (!num) return value;

    if (num >= 100000 && num < 10000000) {
      const lakhs = num / 100000;
      return lakhs % 1 === 0 ? `${lakhs} Lakh` : `${lakhs.toFixed(1)} Lakh`;
    }

    if (num >= 10000000) {
      const crores = num / 10000000;
      return crores % 1 === 0 ? `${crores} Crore` : `${crores.toFixed(1)} Crore`;
    }

    return num.toString();
  }
  // 🔢 Dynamic grid columns for comparison table/header
  getGridTemplateColumns(): string {
    const planCount = this.compare?.length || 0;

    // Always keep first column for "COMPARISON SUMMARY"
    // and distribute remaining width evenly among selected plans
    // const planCols = count > 0 ? count : 1;

    // 300px for left feature column, remaining columns flexible
    return `300px repeat(${planCount || 1}, 1fr)`;
  }


  onSortChange(): void {
    this.applyListView();
  }


  onCoverageChange(): void {
    if (!this.basePayload) return;

    // Build a new payload based on basePayload but with updated coverAmount
    const payload: PlanPayload = {
      ...this.basePayload,
      coverAmount: this.selectedCoverageAmt ?? this.basePayload.coverAmount
    };

    // Optionally update basePayload if you want subsequent changes to start from this
    this.basePayload = payload;

    this.fetchAllPlans(payload);
  }

  // Build unique insurer list
  buildInsurerOptions(): void {
    const set = new Set<string>();

    (this.results || []).forEach((p: any) => {
      const name = p?.company?.company_name;
      if (name) set.add(name);
    });

    this.insurerOptions = Array.from(set).sort();
  }

  onInsurerChange(): void {
    this.applyListView();
  }


  // Inside your component.ts file
  getVisibleFeatures(plan: any) {
    if (!plan?.features) return [];

    if (plan.showAll === undefined) {
      plan.showAll = false; // ✅ default
    }
    // Filter out null, undefined, or empty includes
    const validFeatures = plan.features.filter(
      (t: any) => t && t.includes && t.includes.trim() !== ''
    );

    // Show all or first two
    return plan.showAll ? validFeatures : validFeatures.slice(0, 2);
  }

  toggleShowMore(plan: any) {
    plan.showAll = !plan.showAll;
  }
  goToAllFeatures(plan: any) {

    this.router.navigate(['all-features'], { state: { selectedPlan: plan } });

  }


  /* ===================== UI / TEMPLATE STATE ===================== */


  // Slides expected by template
  infoSlides = [
    {
      img: 'assets/quote/heart.svg',
      title: 'High CSR = higher peace of mind',
      desc: 'A higher Claim Settlement Ratio (ideally 95%+) means more claims get paid. Also check how fast claims are settled and consistency across the last few years.',
      accentColor: 'linear-gradient(90deg, #0086B7 36.54%, #FB772D 63.46%)'
    },
    {
      img: 'assets/quote/loading.svg',
      title: 'Coverage is not always instant',
      desc: 'Pre-existing diseases and maternity often have 2–4 year waits. If relevant to you, pick plans with shorter waiting periods and disclose conditions honestly.',
      accentColor: 'linear-gradient(90deg, #0086B7 36.54%, #FB772D 63.46%)'
    },
    {
      img: 'assets/quote/people.svg',
      title: 'A 10-minute consult saves money',
      desc: 'Plans differ by age, city, family size, and health history. A quick expert call helps you avoid under-coverage and unnecessary add-ons.',
      accentColor: 'linear-gradient(90deg, #0086B7 36.54%, #FB772D 63.46%)'
    },
    {
      img: 'assets/quote/kit.svg',
      title: 'Match plan to your life',
      desc: 'Compare individual vs. family floater, top-up/super top-up, OPD, and maternity options. Choose benefits you’ll actually use, not just the lowest premium.',
      accentColor: 'linear-gradient(90deg, #0086B7 36.54%, #FB772D 63.46%)'
    }
  ];

  // Loading + data
  plans: Plan[] = []; // ← starts empty; filled from API or MOCK_RESPONSE
  private expanded: Record<string, boolean> = {};

  isExpanded(insurer: string): boolean { return !!this.expanded[insurer]; }
  toggleInsurer(insurer: string): void { this.expanded[insurer] = !this.expanded[insurer]; }

  // Filters (kept minimal to match template expectations)
  isFiltersOpen = false;
  openFilters() { this.isFiltersOpen = true; }
  closeFilters() { this.isFiltersOpen = false; }
  applyFilters() { this.isFiltersOpen = false; }

  sortBy: 'relevance' | 'priceAsc' | 'cashless' = 'priceAsc';
  coverageAmount:
    | 'Recommended' | 'Below 5 Lakh' | '5-9 Lakh' | '25-99 Lakh' | '1-1.99 Cr' | '2-6 Cr' | null = 'Recommended';
  premiumRange:
    | 'No preference' | 'Less than ₹1,000' | '₹1,000–1,500' | '₹1,500–2,000' | '₹2,000–3,000' | 'More than ₹3,000' | null
    = 'No preference';
  roomType: 'No preference' | 'general' | 'private' | 'single' | null = 'No preference';
  maternityWait = new Set<string>(['No preference']);
  selectedBenefits = new Set<string>();
  selectedCover: string | null = null;
  selectedBenefit: string = '';
  selectedSort: string = '';

  toggleBenefit(b: string) { this.selectedBenefits.has(b) ? this.selectedBenefits.delete(b) : this.selectedBenefits.add(b); }
  clearFilters() {
    this.selectedCover = null;
    this.selectedInsurer = '';
    this.selectedBenefit = '';
    this.selectedSort = '';
    this.sortBy = 'priceAsc';
    this.coverageAmount = null;
    this.roomType = null;
    this.selectedBenefits.clear();
  }

  tabs = [
    { id: 'sort', label: 'Sort by' },
    { id: 'cover', label: 'Coverage Amount' },
    { id: 'room', label: 'Room Rent Type' },
    { id: 'benefit', label: 'Policy Benefits' },
    { id: 'prem', label: 'Premium (per month)' },
    { id: 'matWait', label: 'Maternity cover waiting period' },
    { id: 'pedWait', label: 'Existing Disease waiting period' },
    { id: 'period', label: 'Policy period' },
    { id: 'insurer', label: 'Insurer' },
    { id: 'matCover', label: 'Maternity cover' },
  ];
  activeTab: string = 'sort';
  setTab(id: string) { this.activeTab = id; }

  get activeTabObj() { return this.tabs.find(t => t.id === this.activeTab) ?? null; }
  get activeTabLabel() { return this.activeTabObj?.label ?? ''; }
  get activeTabLabelLower() { return this.activeTabLabel.toLowerCase(); }

  // Filtering/grouping for template
  get filteredPlans(): Plan[] {
    return this.plans.filter(p => {
      const coverOk = !this.selectedCover || p.coverBand === this.selectedCover;
      const insurerOk = !this.selectedInsurer || p.insurerName === this.selectedInsurer;
      return coverOk && insurerOk;
    });
  }

  get filteredPlans1(): Plan[] {
    return this.plans.filter(p => {
      const band = p.coverBand || '';
      const coverOk =
        !this.coverageAmount ||
        (this.coverageAmount === 'Recommended' && ['5 Lakh', '10 Lakh'].includes(band)) ||
        (this.coverageAmount === 'Below 5 Lakh' && ['1 Lakh', '2 Lakh', '3 Lakh', '4 Lakh'].includes(band)) ||
        (this.coverageAmount === '5-9 Lakh' && ['5 Lakh', '6 Lakh', '7 Lakh', '8 Lakh', '9 Lakh'].includes(band)) ||
        (this.coverageAmount === '25-99 Lakh' && ['25 Lakh', '30 Lakh', '40 Lakh', '50 Lakh', '75 Lakh', '99 Lakh'].includes(band)) ||
        (this.coverageAmount === '1-1.99 Cr' && ['1 Cr', '1.5 Cr', '1.99 Cr'].includes(band)) ||
        (this.coverageAmount === '2-6 Cr' && ['2 Cr', '3 Cr', '4 Cr', '5 Cr', '6 Cr'].includes(band));
      const insurerOk = !this.selectedInsurer || p.insurerName === this.selectedInsurer;
      return coverOk && insurerOk;
    });
  }

  maxCompare = 3;
  isCompareOpen = false;
  compare: any[] = [];

  get emptySlots(): number[] {
    return Array(this.maxCompare - this.compare.length);
  }

  onCompareToggle(plan: any, event: any) {
    const checked = event.target.checked;

    if (checked) {
      // ✅ Add plan if not already selected
      if (this.compare.length < this.maxCompare) {
        if (!this.isSelected(plan)) {
          this.compare.push({
            planId: plan.planId,
            insurerName: plan.company?.company_name,
            productName: plan.planName,
            logo: '/assets/quote/' + plan.company?.logo,
            claimSettledPct: '98%',
            coverAmount: plan.coverAmount,
            monthlyPrice: plan.totalPayablePremium,
            otherDetails: JSON.parse(plan.plan?.other_details)
          });

          console.log('Current compare list:', this.compare);
        }

      } else {
        // ✅ Optional: show a message when limit reached
        alert(`You can compare up to ${this.maxCompare} plans.`);
        event.target.checked = false;
      }
    } else {
      // ✅ Remove if unchecked
      this.compare = this.compare.filter((p) => p.planId !== plan.planId);
    }
  }

  getDetailsKeys() {
    return Object.keys(this.compare[0]?.otherDetails || {});
  }

  isSelected(plan?: any) {
    return this.compare.some((p) => p.planId === plan?.planId);
  }

  removeFromCompare(plan: any) {
    this.compare = this.compare.filter((p) => p.planId !== plan.planId);
  }

  removeFromCompare2(plan: any) {
    this.removeFromCompare(plan);
  }

  clearCompare() {
    this.compare = [];
  }

  compareNow() {
    if (this.compare.length >= 2) {
      this.isCompareOpen = true;
    } else {
      alert('Select at least 2 plans to compare.');
    }
  }

  closeCompare() {
    this.isCompareOpen = false;
  }


  goToBuyNow(plan: any) {
    // You can send plan details if needed
    this.router.navigate(['/buy-now'], { state: { selectedPlan: plan } });
  }

  trackByPlanId(index: number, plan: any) {
    return plan.productName;
  }
  trackByRow(index: number, row: any) {
    return row.label;
  }

  /* -------------------------------------------------------
      🚀 PDF DOWNLOAD FUNCTION
  --------------------------------------------------------*/
  downloadPDF() {
    const DATA = document.getElementById('compareWrapper');
    if (!DATA) {
      console.warn('compareWrapper not found in DOM');
      return;
    }

    // Main scrolling area that actually holds the wide table
    const tableWrapper = DATA.querySelector('.cmp-table-wrapper') as HTMLElement | null;

    // Full content size (including horizontally scrollable part)
    const contentWidth = tableWrapper
      ? tableWrapper.scrollWidth
      : DATA.scrollWidth;

    const contentHeight = tableWrapper
      ? tableWrapper.scrollHeight + tableWrapper.offsetTop
      : DATA.scrollHeight;

    // Do we need to expand? (mobile / narrow screens)
    const needsExpand =
      contentWidth > DATA.clientWidth || contentHeight > DATA.clientHeight;

    // ✅ Remember old inline styles so we can restore later
    const prevHeight = DATA.style.height;
    const prevOverflow = DATA.style.overflow;
    const prevPosition = DATA.style.position;
    const prevWidth = DATA.style.width;

    let prevTwOverflowX = '';
    let prevTwOverflowY = '';
    let prevTwWidth = '';

    if (tableWrapper) {
      prevTwOverflowX = tableWrapper.style.overflowX;
      prevTwOverflowY = tableWrapper.style.overflowY;
      prevTwWidth = tableWrapper.style.width;
    }

    if (needsExpand) {
      // Only do this on mobile / narrow or when content is bigger than viewport
      DATA.classList.add('export-pdf');

      // Let the wrapper grow to its full scroll size and remove scrollbars
      DATA.style.height = contentHeight + 'px';
      DATA.style.overflow = 'visible';
      DATA.style.position = 'static';
      DATA.style.width = contentWidth + 'px';

      if (tableWrapper) {
        tableWrapper.style.overflowX = 'visible';
        tableWrapper.style.overflowY = 'visible';
        tableWrapper.style.width = contentWidth + 'px';
      }
    }

    html2canvas(DATA, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      // Only force width/height when we expanded for mobile
      width: needsExpand ? contentWidth : undefined,
      height: needsExpand ? contentHeight : undefined,
      windowWidth: needsExpand ? contentWidth : undefined,
      windowHeight: needsExpand ? contentHeight : undefined,
    })
      .then((canvas: HTMLCanvasElement) => {
        const imgData = canvas.toDataURL('image/png', 1.0);

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // First page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Extra pages
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('comparison.pdf');
      })
      .catch(err => {
        console.error('html2canvas error:', err);
      })
      .finally(() => {
        // ✅ Restore original DOM state (so desktop behaviour stays unchanged)
        DATA.classList.remove('export-pdf');
        DATA.style.height = prevHeight;
        DATA.style.overflow = prevOverflow;
        DATA.style.position = prevPosition;
        DATA.style.width = prevWidth;

        if (tableWrapper) {
          tableWrapper.style.overflowX = prevTwOverflowX;
          tableWrapper.style.overflowY = prevTwOverflowY;
          tableWrapper.style.width = prevTwWidth;
        }
      });
  }
}

