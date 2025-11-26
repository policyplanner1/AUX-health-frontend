import {
  Component,
  HostListener,
  OnInit,
  ElementRef
} from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from 'src/app/apicall.service';

/* ============================================
   INTERFACE – DO NOT MODIFY
============================================ */
interface ProposalData {
  productName: string;
  selectedProductType: string;
  pincode: string;
  cityState: string;
  zone: string;
  upgradeZone: string;
  adultCount: number;
  childCount: number;
  proposerName: string;
  proposerDOB: string;
  proposerGender: string;
  proposerEmail: string;
  proposerPhone: string;
  sumInsured: string;
  selectedTenure: number;
  annualIncome: string;
  nriDiscount: string;
  includeSelf: string;
  bureauDiscount: string;
  aadharNumber: string;
  panNumber: string;
  siRange?: string;
}

/* ============================================
   COMPONENT
============================================ */
@Component({
  selector: 'app-buy-now-stepper',
  templateUrl: './buy-now-stepper.component.html',
  styleUrls: ['./buy-now-stepper.component.css'],
})
export class BuyNowStepperComponent implements OnInit {

  /* ===========================================================
     🔹 FORMAL VALIDATION HELPERS (Placed at top – Option A)
  =========================================================== */

  isNameValid(v: string): boolean {
    return /^[A-Za-z ]{3,50}$/.test(v.trim());
  }

  isPersonNameValid(v: string): boolean {
    return /^[A-Za-z ]{2,50}$/.test(v.trim());
  }

  isPincodeValid(v: string): boolean {
    return /^[1-9][0-9]{5}$/.test(v.trim());
  }

  isHeightValid(v: any): boolean {
    return Number(v) >= 30 && Number(v) <= 250;
  }

  isWeightValid(v: any): boolean {
    return Number(v) >= 5 && Number(v) <= 300;
  }

  calculateAge(dateString: string): number {
    const today = new Date();
    const dob = new Date(dateString);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    return age;
  }

  isAdultAgeValid(dob: string): boolean {
    const age = this.calculateAge(dob);
    return age >= 18 && age <= 80;
  }

  isChildAgeValid(dob: string): boolean {
    const age = this.calculateAge(dob);
    return age >= 0 && age <= 25;
  }

  /* ===========================================================
     🔹 BASIC STEPPER LOGIC
  =========================================================== */

  currentStep: 1 | 2 | 3 = 1;
  today = new Date().toISOString().split('T')[0];
  fieldErrors: any = {};

  proposalData: ProposalData = {
    productName: '',
    selectedProductType: 'new',
    pincode: '',
    cityState: '',
    zone: '',
    upgradeZone: 'no',
    adultCount: 1,
    childCount: 0,
    proposerName: '',
    proposerDOB: '',
    proposerGender: '',
    proposerEmail: '',
    proposerPhone: '',
    sumInsured: '',
    selectedTenure: 1,
    annualIncome: '5L-10L',
    nriDiscount: 'no',
    includeSelf: 'yes',
    bureauDiscount: 'no',
    aadharNumber: '',
    panNumber: '',
    siRange: ''
  };
  memberErrors: any = {
  adults: [],
  children: []
};

  adults: any[] = [];
  children: any[] = [];

  diseaseList: string[] = [
    "Diabetes", "Hypertension", "Asthma", "Blood Pressure", "Thyroid",
    "Heart Disease", "Cancer", "Arthritis", "Kidney Disease"
  ];

  showPopup = false;
  selectedPlan: any = null;

  /* ===========================================================
     🔹 GETTERS (as-is)
  =========================================================== */
  get sumInsuredDisplay(): string {
    const v = this.proposalData.sumInsured;
    if (!v) return '—';
    return '₹' + (+v).toLocaleString('en-IN');
  }

  get annualIncomeDisplay(): string {
    switch (this.proposalData.annualIncome) {
      case '5L-10L': return '₹5,00,000 – 10,00,000';
      case '10L-20L': return '₹10,00,000 – 20,00,000';
      case '20L-30L': return '₹20,00,000 – 30,00,000';
      default: return this.proposalData.annualIncome || '—';
    }
  }

  hasPreExistingCondition(): boolean {
    const check = (arr: any[]) => arr.some(
      m => m.selectedDiseases?.length && !m.selectedDiseases.includes('None of these')
    );
    return check(this.adults) || check(this.children);
  }

  /* ===========================================================
     🔹 CONSTRUCTOR
  =========================================================== */
  constructor(
    private api: ApicallService,
    private router: Router,
    private eRef: ElementRef
  ) {}

  /* ===========================================================
     🔹 ONINIT
  =========================================================== */
  ngOnInit(): void {
    this.initializeAdults();
    this.initializeChildren();
    this.memberErrors.adults = this.adults.map(() => ({}));
    this.memberErrors.children = this.children.map(() => ({}));

    const nav = this.router.getCurrentNavigation();
    this.selectedPlan =
      (nav?.extras?.state as any)?.selectedPlan ||
      (history.state as any)?.selectedPlan ||
      null;

    if (this.selectedPlan) {
      const companyName =
        this.selectedPlan?.company?.company_name ||
        this.selectedPlan?.insurerName ||
        '';

      const planName =
        this.selectedPlan?.planName ||
        this.selectedPlan?.productName ||
        '';

      this.proposalData.productName = `${companyName} ${planName}`.trim();
    }

    try {
      const saved = localStorage.getItem('healthFormData');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.cust_coveramt) {
        this.proposalData.sumInsured = String(parsed.cust_coveramt);
      }

        if (!this.proposalData.productName && parsed?.cust_product)
          this.proposalData.productName = parsed.cust_product;

        this.proposalData.pincode = parsed?.cust_Pincode ?? this.proposalData.pincode;
        this.proposalData.cityState = parsed?.cust_city ?? this.proposalData.cityState;
        this.proposalData.zone = parsed?.zone ?? this.proposalData.zone;

        this.proposalData.proposerName =
          `${parsed?.cust_fname ?? ''} ${parsed?.cust_lname ?? ''}`.trim();
      }
    } catch {}

    // 🔹 Prevent alphabets in phone/Aadhaar
    setTimeout(() => {
      const phone = document.getElementById("phoneField") as HTMLInputElement;
      const aadhaar = document.getElementById("aadhaarField") as HTMLInputElement;

      if (phone)
        phone.addEventListener("input", () => phone.value = phone.value.replace(/\D/g, ""));

      if (aadhaar)
        aadhaar.addEventListener("input", () => aadhaar.value = aadhaar.value.replace(/\D/g, ""));
    });
  }

  /* ===========================================================
     🔹 OUTSIDE CLICK HANDLER
  =========================================================== */
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.adults.forEach(a => a.dropdownOpen = false);
      this.children.forEach(c => c.dropdownOpen = false);
    }
  }

  /* ===========================================================
     🔹 ADULT / CHILD INITIALIZERS
  =========================================================== */
  initializeAdults() {
    this.adults = Array(this.proposalData.adultCount)
      .fill(null)
      .map(() => ({
        relationship: '',
        title: '',
        fullName: '',
        dob: '',
        height: '',
        weight: '',
        abhaId: '',
        selectedDiseases: [],
        dropdownOpen: false
      }));
  }

  initializeChildren() {
    this.children = Array(this.proposalData.childCount)
      .fill(null)
      .map(() => ({
        relationship: 'Child',
        title: '',
        fullName: '',
        dob: '',
        height: '',
        weight: '',
        abhaId: '',
        selectedDiseases: [],
        dropdownOpen: false
      }));
  }

  get adultCount() { return this.proposalData.adultCount; }
  set adultCount(v: number) {
    this.proposalData.adultCount = v;
    this.initializeAdults();
  }

  get childCount() { return this.proposalData.childCount; }
  set childCount(v: number) {
    this.proposalData.childCount = v;
    this.initializeChildren();
  }

changeAdultCount(delta: number) {
  let next = this.proposalData.adultCount + delta;
  next = Math.min(6, Math.max(1, next));

  if (next !== this.proposalData.adultCount) {
    this.proposalData.adultCount = next;

    this.initializeAdults();

    // ✅ REBUILD ERROR STRUCTURE
    this.memberErrors.adults = this.adults.map(() => ({}));
  }
}

changeChildCount(delta: number) {
  let next = this.proposalData.childCount + delta;
  next = Math.min(6, Math.max(0, next));

  if (next !== this.proposalData.childCount) {
    this.proposalData.childCount = next;

    this.initializeChildren();

    // ✅ REBUILD ERROR STRUCTURE
    this.memberErrors.children = this.children.map(() => ({}));
  }
}


  /* ===========================================================
     🔹 MULTI SELECT LOGIC
  =========================================================== */
  toggleDropdown(member: any) {
    member.dropdownOpen = !member.dropdownOpen;
  }

  toggleDisease(member: any, disease: string) {
    if (!member.selectedDiseases) member.selectedDiseases = [];

    if (member.selectedDiseases.includes(disease)) {
      member.selectedDiseases = member.selectedDiseases.filter((d: string) => d !== disease);
    } else {
      member.selectedDiseases.push(disease);
      member.selectedDiseases = member.selectedDiseases.filter((d: string) => d !== "None of these");
    }
  }

  selectNone(member: any) {
    member.selectedDiseases = ["None of these"];
  }

  /* ===========================================================
     🔹 FIELD VALIDATIONS
  =========================================================== */
isEmailValid(v: string): boolean {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test((v || '').trim());
}


  isPhoneValid(v: string): boolean {
    return /^[6-9]\d{9}$/.test(v.trim());
  }

  isAadhaarValid(v: string): boolean {
    return /^[2-9]\d{11}$/.test(v.trim());
  }

  isPanValid(v: string): boolean {
    return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v.trim().toUpperCase());
  }

  /* ===========================================================
     🔹 STEP-1 VALIDATION
  =========================================================== */
  validateStep1(scrollToError = true): boolean {
    this.fieldErrors = {};
    let firstId: string | null = null;

    this.proposalData.panNumber = this.proposalData.panNumber.toUpperCase();

    const setErr = (field: string, msg: string, id: string) => {
      this.fieldErrors[field] = msg;
      if (!firstId) firstId = id;
    };

    // PINCODE
    if (!this.isPincodeValid(this.proposalData.pincode))
      setErr("pincode", "Enter valid 6-digit pincode.", "pincodeField");

    // NAME
    if (!this.proposalData.proposerName.trim())
      setErr("proposerName", "Enter proposer name", "nameField");
else if (!this.isNameValid(this.proposalData.proposerName))
      setErr("proposerName", "Only alphabets allowed (min 3 letters)", "nameField");

    // DOB
    if (!this.proposalData.proposerDOB)
      setErr("proposerDOB", "Select DOB", "dobField");
    else if (!this.isAdultAgeValid(this.proposalData.proposerDOB))
      setErr("proposerDOB", "Age must be 18–80 years", "dobField");

    // GENDER
    if (!this.proposalData.proposerGender)
      setErr("proposerGender", "Select gender", "genderField");

    // PHONE
    if (!this.proposalData.proposerPhone)
      setErr("proposerPhone", "Enter phone number", "phoneField");
    else if (!this.isPhoneValid(this.proposalData.proposerPhone))
      setErr("proposerPhone", "Enter valid mobile number", "phoneField");

    // EMAIL
    if (!this.proposalData.proposerEmail)
      setErr("proposerEmail", "Enter email", "emailField");
    else if (!this.isEmailValid(this.proposalData.proposerEmail))
      setErr("proposerEmail", "Enter valid email format", "emailField");

    // SUM INSURED
    if (!this.proposalData.sumInsured)
      setErr("sumInsured", "Select sum insured", "sumInsuredField");

    // AADHAAR
    if (!this.proposalData.aadharNumber)
      setErr("aadharNumber", "Enter Aadhaar", "aadhaarField");
    else if (!this.isAadhaarValid(this.proposalData.aadharNumber))
      setErr("aadharNumber", "Enter valid Aadhaar", "aadhaarField");
    else if (/^(\d)\1+$/.test(this.proposalData.aadharNumber))
      setErr("aadharNumber", "Aadhaar cannot contain repeating digits", "aadhaarField");

    // PAN
    if (!this.proposalData.panNumber)
      setErr("panNumber", "Enter PAN", "panField");
    else if (!this.isPanValid(this.proposalData.panNumber))
      setErr("panNumber", "Invalid PAN format", "panField");

    const valid = Object.keys(this.fieldErrors).length === 0;

   if (!valid && scrollToError && firstId) {
  setTimeout(() => {
    const el = document.getElementById(firstId || '');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 120);
}

    return valid;
  }

  validateAdultField(i: number, field: string) {
  const a = this.adults[i];

  if (field === 'fullName') {
    if (!this.isPersonNameValid(a.fullName))
      this.memberErrors.adults[i].fullName = "Enter valid full name.";
    else delete this.memberErrors.adults[i].fullName;
  }

  if (field === 'dob') {
    if (!a.dob || !this.isAdultAgeValid(a.dob))
      this.memberErrors.adults[i].dob = "Age must be 18–80 years.";
    else delete this.memberErrors.adults[i].dob;
  }

  if (field === 'height') {
    if (!this.isHeightValid(a.height))
      this.memberErrors.adults[i].height = "Height must be 30–250 cm.";
    else delete this.memberErrors.adults[i].height;
  }

  if (field === 'weight') {
    if (!this.isWeightValid(a.weight))
      this.memberErrors.adults[i].weight = "Weight must be 5–300 kg.";
    else delete this.memberErrors.adults[i].weight;
  }
}

  /* ===========================================================
     🔹 STEP-2 VALIDATION
  =========================================================== */
 isStep2Valid(): boolean {
  let hasError = false;

  // Reset old errors
  this.memberErrors.adults = this.adults.map(() => ({}));
  this.memberErrors.children = this.children.map(() => ({}));

  // VALIDATE ADULTS
  this.adults.forEach((a, i) => {
    const err = this.memberErrors.adults[i];

    if (!this.isPersonNameValid(a.fullName)) {
      err.fullName = "Enter valid full name.";
      hasError = true;
    }

    if (!a.relationship) {
      err.relationship = "Select relationship.";
      hasError = true;
    }

    if (!a.title) {
      err.title = "Select title.";
      hasError = true;
    }

    if (!a.dob || !this.isAdultAgeValid(a.dob)) {
      err.dob = "Age must be 18–80 years.";
      hasError = true;
    }

    if (!this.isHeightValid(a.height)) {
      err.height = "Height must be 30–250 cm.";
      hasError = true;
    }

    if (!this.isWeightValid(a.weight)) {
      err.weight = "Weight must be 5–300 kg.";
      hasError = true;
    }
  });

  // VALIDATE CHILDREN
  this.children.forEach((c, i) => {
    const err = this.memberErrors.children[i];

    if (!this.isPersonNameValid(c.fullName)) {
      err.fullName = "Enter valid full name.";
      hasError = true;
    }

    if (!c.relationship) {
      err.relationship = "Select relationship.";
      hasError = true;
    }

    if (!c.title) {
      err.title = "Select title.";
      hasError = true;
    }

    if (!c.dob || !this.isChildAgeValid(c.dob)) {
      err.dob = "Age must be 0–25 years.";
      hasError = true;
    }

    if (!this.isHeightValid(c.height)) {
      err.height = "Height must be 30–250 cm.";
      hasError = true;
    }

    if (!this.isWeightValid(c.weight)) {
      err.weight = "Weight must be 5–300 kg.";
      hasError = true;
    }
  });

  return !hasError;
}


  /* ===========================================================
     🔹 NAVIGATION
  =========================================================== */
blockNonDigits(event: KeyboardEvent) {
  const allowedKeys = [
    "Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"
  ];

  if (allowedKeys.includes(event.key)) return;

  // Allow only digits
  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault();
  }
}


onPincodeChange() {
  let val = this.proposalData.pincode || "";

  // Remove non-digits
  val = val.replace(/\D/g, "");

  // Max length = 6
  val = val.substring(0, 6);

  this.proposalData.pincode = val;

  // Validation
  if (!val) {
    this.fieldErrors.pincode = "Pincode is required.";
    return;
  }

  if (val.length !== 6) {
    this.fieldErrors.pincode = "Enter a valid 6-digit pincode.";
    return;
  }

  delete this.fieldErrors.pincode;
}

allowOnlyAlphabets(event: KeyboardEvent) {
  const allowedKeys = [
    "Backspace",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
    " "
  ];

  if (allowedKeys.includes(event.key)) return;

  // Allow A-Z and a-z only
  if (!/^[A-Za-z]$/.test(event.key)) {
    event.preventDefault();
  }
}
onProposerNameChange() {
  let val = this.proposalData.proposerName || "";

  // Remove everything except alphabets and space
  val = val.replace(/[^A-Za-z ]/g, "");

  this.proposalData.proposerName = val;

  // Validation message
  if (!val.trim()) {
    this.fieldErrors.proposerName = "Full name is required.";
  } else {
    delete this.fieldErrors.proposerName;
  }
}


onNameChange() {
  let val = this.proposalData.proposerName || "";

  // Remove digits
  val = val.replace(/[0-9]/g, "");

  // Remove invalid chars
  val = val.replace(/[^A-Za-z ]/g, "");

  this.proposalData.proposerName = val;

  // VALIDATION
  if (!val.trim()) {
    this.fieldErrors.proposerName = "Full Name is required.";
    return;
  }

  if (val.trim().length < 3) {
    this.fieldErrors.proposerName = "Name must be at least 3 characters.";
    return;
  }

  delete this.fieldErrors.proposerName;
}

onPanChange() {
  let val = this.proposalData.panNumber || "";

  // Force uppercase
  val = val.toUpperCase();

  // Allow only valid PAN characters
  val = val.replace(/[^A-Z0-9]/g, "");

  // Limit to 10 characters
  val = val.substring(0, 10);

  this.proposalData.panNumber = val;

  // PAN REGEX CHECK
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  if (!val) {
    this.fieldErrors.panNumber = "PAN Number is required.";
    return;
  }

  if (!panRegex.test(val)) {
    this.fieldErrors.panNumber = "Enter valid PAN number.";
    return;
  }

  delete this.fieldErrors.panNumber;
}


  onNameInput() {
  // Remove numbers instantly
  this.proposalData.proposerName = this.proposalData.proposerName.replace(/[0-9]/g, '');

  // Re-validate only the name field live
  if (!this.proposalData.proposerName.trim()) {
    this.fieldErrors.proposerName = "Enter proposer name";
  }
  else if (!this.isNameValid(this.proposalData.proposerName)) {
    this.fieldErrors.proposerName = "Only alphabets allowed (min 3 letters)";
  }
  else {
    // CLEAR ERROR IF VALID
    delete this.fieldErrors.proposerName;
  }
}



  goBack() {
    window.history.back();
  }

  nextStep() {
  if (this.currentStep === 1) {
    if (!this.validateStep1(true)) return;
    this.currentStep = 2;
  }
  else if (this.currentStep === 2) {
    if (!this.isStep2Valid()) return;  // NO ALERTS ANYMORE
    this.currentStep = 3;
  }
}

  previousStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  /* ===========================================================
     🔹 ON FIELD BLUR VALIDATION
  =========================================================== */
  onFieldBlur() {
    this.validateStep1(false);
  }

  /* ===========================================================
     🔹 FINAL SUBMIT
  =========================================================== */
  completePurchase() {
    if (!this.validateStep1()) {
      alert("Please correct errors in Step 1.");
      this.currentStep = 1;
      return;
    }

    this.showPopup = true;

    const payload = {
      ...this.proposalData,
      adults: this.adults,
      children: this.children
    };

    this.api.saveHealthProposal(payload).subscribe({
      next: () => {},
      error: () => {
        alert("Failed to submit proposal.");
      }
    });
  }

  closePopup() {
    this.showPopup = false;
  }
}
