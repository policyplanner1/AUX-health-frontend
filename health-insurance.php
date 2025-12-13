<?php
 include 'hed-foot/header.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
<style>

.back-btn {
  background: transparent;
  border: none;
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.back-btn:focus {
  outline: none;
}

/* Slight tweak for small screens */
@media (max-width: 768px) {
  .back-btn {
    padding: 2px;
  }
}

/* Stepper Wrapper */
.stepper {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

/* Stepper List Item */
.stepper li {
  display: inline-block;
  margin: 0;
  padding: 0;
  text-align: center;
  /* width: 23.23%; Adjust based on the number of steps */
}

/* Stepper Circle */
.stepper li a {
  text-decoration: none;
  display: block;
  position: relative;
}

/* Circle Style */
.stepper li .circle {
  display: block;
  width: 20px; /* Adjust as needed */
  height: 40px; /* Adjust as needed */
  line-height: 10px;
  border-radius: 50%;
  background-color: #006D8D; /* Adjust the background color */
  color: #fff; /* Adjust the text color */
  font-weight: bold;
  margin: 0 auto 10px;
}

/* Stepper Label */
.stepper li .label {
  display: block;
  font-size: 15px;
  color: #555; /* Adjust the text color */
  width:67%;
  padding:1px;
font-weight: 500;
}

/* Completed Step Style */
.stepper li.completed .circle {
  background-color: #2ecc71; /* Adjust the background color for completed steps */
}

/* Active Step Style */
.stepper li.active .circle {
  background-color: #e74c3c; /* Adjust the background color for active steps */
}

/* Warning Step Style */
.stepper li.warning .circle {
  background-color: #f39c12; /* Adjust the background color for warning steps */
}
/* Add this CSS for the new structure */

/* Step Content Styles */
.stepper li a .step-content {
  display: flex;
  align-items: center;
}

/* Circle Style */
.stepper li a .step-content .circle {
  display: block;
  width: 70px; /* Adjust as needed */
  height: 44px; /* Adjust as needed */
  line-height: 40px;
  border-radius: 50%;
  background-color: #006D8D; /* Adjust the background color */
  color: #fff; /* Adjust the text color */
  font-weight: bold;
  margin-left: 10px; /* Adjust the spacing between label and circle */
}

/* Line Style */
.stepper li a .step-content:after {
  content: '';
  height: 2px;
  width: 100px; /* Adjust the length of the line */
  background-color: #3498db; /* Adjust the color of the line */
}

.stepper-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-step {
  display: none;
}

.form-step:first-child {
  display: block;
}

.form-navigation {
  margin-top: 20px;
  text-align: center;
  margin-bottom:30px;
}

.form-navigation button {
  margin: 0 10px;
  padding: 8px 16px;
  cursor: pointer;
}

.form-navigation button:last-child {
  margin-right: 0;
}
.stepper li.active .circle {
  background-color: red; /* Background color for active steps */
}

/* Inactive Step Style */
.stepper li:not(.active) .circle {
  background-color: black; /* Background color for inactive steps */
}

.form-navigation button {
  background-color: #006D8D; /* Button background color */
  color: #fff; /* Button text color */
  /* padding: 10px 20px; Adjust padding as needed */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  /* margin-left:30%; */
}

.form-navigation button:hover {
  background-color: #0056b3; /* Change background color on hover */
}
.card1 {
    width: 80%;
    /* height: 750px; */
    box-shadow: 4px 4px 4px 4px rgba(129, 192, 211, 0.2), -2px 2px 4px rgba(122, 193, 214, 0.2);
  margin-bottom:5%;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
    text-align: center;
    margin-left: 120px;
    margin-right: 20px;
    margin-top:3%;
  }
  .card {
  width: 300px !important;
  height:200px;
  /*padding: 20px;*/
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  position: relative;
  box-shadow: 4px 4px 4px 4px rgba(129, 192, 211, 0.2), -2px 2px 4px rgba(122, 193, 214, 0.2);
}

    .card-container {
        display: flex;
        justify-content: center !important;
        /* flex-wrap: wrap; */
        /* margin-left:25%; */
    }
    .card.selected {
        /* border-color: blue; */
    }
    .card input[type="checkbox"] {
        display: none; /* Hide the checkbox */
    }
    .card img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-bottom: 10px;
    }
    .card p {
        margin: 0;
    }
    .btn-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: -15px;
    }
    .btn-container .btn {
        cursor: pointer;
        display: inline-block;
        width: 37px;
        height: 30px;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin: 13px;
        line-height: 15px;
        font-size: 18px;
    }
    .toggle-container {
    display: flex;
    align-items: right !important;
    height: 35px;
    width: 315px;
    border-radius: 25px;
    border-color: #006D8D;
    margin-left: 21% !important;
    /* margin-top: -35px; */
  }

  .toggle-btn {
    cursor: pointer;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    transition: all 0.2s ease-in-out;
    border-radius: 15px;
    border-color: #006D8D;
    text-align: center;
  }

  .toggle-btn.active {
    background-color: rgb(5, 115, 134);
    color: #fff;
  }

  .toggle-btn:first-child {
    border-radius: 25px 0 0 25px;
    border-color: #006D8D;
  }

  .toggle-btn:last-child {
    border-radius: 0 25px 25px 0;
    border-color: #006D8D;
  }
  .card2 {
  width: 150px !important;
  /*height:200px;*/
  padding: 20px;
  margin: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  position: relative;
  box-shadow: 4px 4px 4px 4px rgba(129, 192, 211, 0.2), -2px 2px 4px rgba(122, 193, 214, 0.2);
}
.card2-container {
    display: inline-block;
    margin: 10px; /* Adjust margin as needed */
}

    .card2.selected {
        /* border-color: blue; */
    }
    .card2 input[type="checkbox"] {
        display: none; /* Hide the checkbox */
    }
    .card2 img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 10px;
    }
    .card2 p {
        margin: 0;
    }
    #Kyc_form{
      margin-top:20px;
      margin-bottom:30px;
    display: flex;
    text-align: center;
    justify-content: center;
}

    .Kyc_Inputs {
      padding: 1vw 2vw;
      margin-left: 3vw;
      height: fit-content;
      border: 0;
      border-bottom: 1px solid #34383a;
      font-size: 14px;
      background: transparent;
    }

    .Kyc_Inputs:focus {
      outline: none;
    }

    .Kyc_Inputs:focus::placeholder {
      color: transparent;
    }

    .Kyc_Inputs::placeholder {
      color: #168599;
    }
    .select-border-bottom {
  border: none;
  border-bottom: 1px solid black; /* Display bottom border */
  width: 100%; /* Adjust width as needed */
  padding: 5px;
}
.card.selected {
    border: 1px solid blue;
}
.card.disabled {
    pointer-events: none; /* Prevents any interaction with the card */
}

.card.disabled label {
    cursor: not-allowed; /* Changes the cursor to indicate disabled state */
}

/* ================================
   ✅ RESPONSIVE FIX LAYER ONLY
   (Preserves all original colors)
   ================================ */

/* Tablets & medium screens */
@media (max-width: 1024px) {

  /* Make main card centered & fit screen */
  .card1 {
    width: 90% !important;
    margin: 20px auto !important;
    padding: 15px !important;
  }

  /* Stepper stays horizontal but wraps nicely if needed */
  .stepper {
    display: flex !important;
    justify-content: center !important;
    flex-wrap: wrap !important;
    gap: 10px !important;
    text-align: center !important;
  }

  .stepper li {
    flex: 1 1 120px !important;
  }

  .stepper li .circle {
    width: 45px !important;
    height: 45px !important;
    line-height: 45px !important;
    margin-bottom: 5px !important;
  }

  /* Form fields */
  .Kyc_Inputs {
    width: 80% !important;
    margin: 10px auto !important;
    display: block !important;
  }

  /* Cards inside form */
  .card-container {
    flex-wrap: wrap !important;
    justify-content: center !important;
  }

  .card {
    width: 45% !important;
    margin: 10px !important;
  }

  .form-navigation button {
    width: 40% !important;
    margin: 8px 5px !important;
  }

  /* Gender toggle */
  .toggle-container {
    width: 80% !important;
    margin: 10px auto !important;
  }
}

/* Mobile view fixes */
@media (max-width: 768px) {

  .card1 {
    width: 95% !important;
    margin: 15px auto !important;
    padding: 10px !important;
  }

  /* Keep stepper horizontal but centered */
  .stepper {
    flex-wrap: wrap !important;
    justify-content: center !important;
    gap: 8px !important;
  }

  .stepper li {
    flex: 1 1 100px !important;
    margin: 5px !important;
  }

  /* Make sure step labels don’t overflow */
  .stepper li .label {
    font-size: 13px !important;
    word-wrap: break-word !important;
  }

  /* Form fields centered */
  .Kyc_Inputs {
    width: 90% !important;
    margin: 8px auto !important;
  }

  /* Cards stack vertically on mobile */
  .card-container {
    flex-direction: column !important;
    align-items: center !important;
  }

  .card {
    width: 90% !important;
    margin: 10px auto !important;
  }

  /* Gender toggle full width */
  .toggle-container {
    width: 90% !important;
    flex-direction: row !important;
  }

  /* Buttons full width on mobile */
  .form-navigation button {
    width: 90% !important;
    margin: 8px auto !important;
    display: block !important;
  }

  /* Son/Daughter mini cards */
  .card2 {
    width: 90% !important;
    margin: 8px auto !important;
  }

  #Kyc_form {
    flex-direction: column !important;
    align-items: center !important;
  }

  .select-border-bottom {
    width: 90% !important;
    margin: 8px auto !important;
  }
}

/* Small phones */
@media (max-width: 480px) {

  .stepper li .label {
    font-size: 12px !important;
  }

  .card {
    width: 100% !important;
  }

  .Kyc_Inputs {
    width: 100% !important;
  }

  .form-navigation button {
    width: 100% !important;
  }

  .toggle-container {
    width: 100% !important;
  }
}


</style>



<!-- <center><h4 style=" margin-top:2% !important;">Easy <span style="color:#006D8D;">4 </span><span style="color:orange;">Step </span>Check-Out</h4>
<h6 style="color:#7B7F89;">Basic Details → Address &amp; Nominee → Medical History → Make Payment </h6></center> -->

<div class="card1">
  <!-- Back Arrow (works on all steps) -->
<div class="d-flex align-items-center" style="margin-top:10px; margin-left:10px;">
  <button
    type="button"
    class="back-btn"
    onclick="prevStep()"
    aria-label="Go back">
    <svg xmlns="http://www.w3.org/2000/svg"
         width="22" height="22"
         viewBox="0 0 24 24"
         fill="none"
         stroke="#006D8D"
         stroke-width="2"
         stroke-linecap="round"
         stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
  </button>
</div>

<div class="row" style=" margin-top:2% !important;">
  <div class="col-md-12 d-flex justify-content-center">

    <!-- Steppers Wrapper -->
    <ul class="stepper stepper-horizontal" >
      <!-- First Step -->
      <li class="completed">
        <a href="#!">
          <div class="step-content">
            <span class="circle">1</span>
            <span class="label">Select Member</span>
          </div>
        </a>
      </li>

      <!-- Second Step -->
      <li class="active">
        <a href="#!">
          <div class="step-content">
            <span class="circle">2</span>
            <span class="label">Select Age of Members</span>
          </div>
        </a>
      </li>

      <!-- Third Step -->
      <li class="active">
        <a href="#!">
          <div class="step-content">
            <span class="circle">3</span>
            <span class="label">Basic Details</span>
          </div>
        </a>
      </li>

    </ul>
  </div>
</div>


<div class="stepper-form">
  <form id="myForm" class="form" action="https://policyplanner.com/health/#/quotes">
    <div style="align-items:center !important;">
    <div class="form-step" id="step1">
      <p style="font-size:24px;margin-top:30px;margin-bottom:20px;">Select your gender </p>
      <div class="toggle-container button_container">
    <input type="text" class="toggle-btn" onclick="toggleSort(true)" value="Male" readonly>
    <input type="text" class="toggle-btn" onclick="toggleSort(false)" value="Female" readonly>
  </div>
  <!-- Add hidden input fields for sonCount and daughterCount -->
<input type="hidden" id="sonCountInput" name="sonCount" value="">
<input type="hidden" id="daughterCountInput" name="daughterCount" value="">
<input type="hidden" id="coverForInput" name="cover_for" value="">
  <!-- Hidden input field to store the selected gender -->
  <input type="hidden" id="genderInput" name="gender" required>
  <!-- Hidden input to mark mobile verification state (0/1) -->
  <input type="hidden" id="mobile_verified" name="mobile_verified" value="0">
<h4 style="margin-top:20px;margin-bottom:20px;">Select members you want to insure </h4>
    <div class="card-container" >
    <div class="card disabled" style="border: 1px solid blue; padding: 10px; margin-bottom: 10px;">
    <label for="self" style="margin-top:15px;">
        <input id="self" type="checkbox" name="self">
        <img src="../assets/frame.svg" alt="Self" disabled> <!-- Ensure the image is disabled and non-interactive -->
        <p>Self</p>
    </label>
</div>

    <div class="card" >
        <label for="spouse" style="height:100%;margin-top:15px;"><input id="spouse" type="checkbox" name="spouse" onchange="toggleBorder('spouse')"> <img src="../assets/frame1.svg" alt="Spouse"><p>Spouse</p></label>
    </div>
    <!-- Inside the HTML -->
<div class="card">
    <label for="son" style="height:100%;margin-top:15px;">
        <input id="son" type="checkbox" name="son" >
        <img src="../assets/frame2.svg" alt="Son">
        <p>Son</p>
    </label>
    <div class="btn-container" data-type="son" style="display: none;">
        <span class="btn" onclick="decrement('son')">-</span>
        <span id="sonCount">0</span>
        <span class="btn" onclick="increment('son')">+</span>
    </div>
</div>
<div class="card">
    <label for="daughter" style="height:100%;margin-top:15px;">
        <input id="daughter" type="checkbox" name="daughter">
        <img src="../assets/frame3.svg" alt="Daughter">
        <p>Daughter</p>
    </label>
    <div class="btn-container" data-type="daughter" style="display: none;">
        <span class="btn" onclick="decrement('daughter')">-</span>
        <span id="daughterCount">0</span>
        <span class="btn" onclick="increment('daughter')">+</span>
    </div>
</div>
</div>


      <div class="form-navigation">
        <!-- Use the same nextStep function for the single "Next" button -->
        <button type="button" onclick="nextStep()">Next</button>
      </div>
    </div>
</div>


<div class="form-step" id="step2">
<p style="font-size:24px;margin-top:30px;margin-bottom:20px;">Tell us the age of your family members</p>
<div id="selectedMembersContainer"></div>
    <div class="form-navigation">
        <button type="button" onclick="prevStep('step1')">Previous</button>
        <button type="button" onclick="nextStep('step3')">Next</button>
    </div>
</div>


    <div class="form-step" id="step3">
      <p style="font-size:22px;margin-top:30px;">Tell us more about youself</p>
    <div id="Kyc_form">
        <input class="Kyc_Inputs first_input" type="text" id="fname" name="cust_fname" placeholder="Enter First Name" style="margin-top:10px;" maxlength="20" pattern="[A-Za-z]*" title="Please enter only letters" required ><br>
        <!--<input class="Kyc_Inputs" type="text" id="mname" name="cust_mname" placeholder="Enter Middle Name" style="margin-top:10px;" maxlength="20" pattern="[A-Za-z]*" title="Please enter only letters" required><br>-->
        <input class="Kyc_Inputs" type="text" id="lname" name="cust_lname" placeholder="Enter Last Name" style="margin-top:10px;"  maxlength="20" pattern="[A-Za-z]*" title="Please enter only letters" required><br>
        <!-- <input class="Kyc_Inputs" type="text" name="cust_mobile" id="cust_mobile" placeholder="Enter Mobile Number" style="margin-top:10px;" required> -->
    <!-- Mobile + Verify Button Row -->
<div style="display:flex; align-items:center; gap:8px; margin-top:10px;">

  <input class="Kyc_Inputs"
         type="text"
         name="cust_mobile"
         id="cust_mobile"
         placeholder="Enter Mobile Number"
         required
         style="flex:1;">

  <button type="button"
          id="verifyBtn"
          class="btn"
          style="background-color:#006D8D; border:none; padding:8px 14px; white-space:nowrap; color:#fff">
    Verify Number
  </button>

</div>

<!-- <span id="verifyStatus"
      style="display:block; margin-top:6px; font-weight:600; color:#28a745; display:none;">
  Verified number
</span> -->

    
      </div>

    <div id="Kyc_form">
        <!--<input class="Kyc_Inputs first_input" type="text" name="cust_mobile" id="cust_mobile" placeholder="Enter Mobile Number" style="margin-top:10px;margin-left: -2px;" required><br>-->
        <input class="Kyc_Inputs" type="text" id="pincode" name="cust_Pincode" placeholder="Enter Pincode" style="margin-top:10px;" required><br>

        <!-- City + Zone (auto) -->
      <input class="Kyc_Inputs"
       type="text"
       id="city"
       name="cust_city"
       placeholder="Enter or select City"
       list="cityList"
       style="margin-top:10px;"
       required>

<datalist id="cityList"></datalist>

<!-- Visible label (no name) -->
<input class="Kyc_Inputs"
       type="text"
       id="zoneLabel"
       placeholder="Zone will auto-select"
       style="margin-top:10px;"
       readonly>

<!-- Hidden numeric value actually submitted -->
<input type="hidden" id="zone" name="zone" value="3">



        <select class="Kyc_Inputs" id="amount" name="cover_amount" style="margin-top: 10px;color:#006D8D !important;" required>
        <option value="" disabled selected >Cover Amount</option>
    	  <option value="500000">5 Lakh</option>
    		<option value="700000">7 Lakh</option>
    		<option value="1000000">10 Lakh</option>
    		<option value="1500000">15 Lakh</option>
    		<!--<option value="600000">6 Lac</option>-->
    		<option value="2000000">20 Lakh</option>
    		<!--<option value="800000">8 Lac</option>-->
    		<!--<option value="900000">9 Lac</option>-->
    		<option value="2500000">25 Lakh</option>
    		<!--<option value="1100000">11 Lac</option>-->
    		<!--<option value="1200000">12 Lac</option>-->
    		<!--<option value="1300000">13 Lac</option>-->
    		<!--<option value="1400000">14 Lac</option>-->
    		<option value="3000000">30 Lakh</option>
    		<!--<option value="1600000">16 Lac</option>-->
    		<!--<option value="1700000">17 Lac</option>-->
    		<!--<option value="1800000">18 Lac</option>-->
    		<!--<option value="1900000">19 Lac</option>-->
    		<option value="3500000">35 Lakh</option>
    		<!--<option value="2100000">21 Lac</option>-->
    		<!--<option value="2200000">22 Lac</option>-->
    		<!--<option value="2300000">23 Lac</option>-->
    		<!--<option value="2400000">24 Lac</option>-->
    		<option value="4000000">40 Lakh</option>
        <option value="4500000">45 Lakh</option>
    		<!--<option value="2600000">26 Lac</option>-->
    		<!--<option value="2700000">27 Lac</option>-->
    		<!--<option value="2800000">28 Lac</option>-->
    		<!--<option value="2900000">29 Lac</option>-->
    		<!--<option value="3000000">30 Lac</option>-->
    		<!--<option value="4000000">40 Lac</option>-->
    		<option value="5000000">50 Lakh</option>
        <option value="7500000">75 Lakh</option>
    		<!--<option value="6000000">60 Lac</option>-->
    		<!--<option value="7500000">75 Lac</option>-->
    		<option value="10000000">1 Crore</option>
    		<option value="20000000">2 Crores</option>
        <option value="20000000">3 Crores</option>
        <option value="20000000">4 Crores</option>
        <option value="20000000">5 Crores</option>


        <!-- Add more options as needed -->
    </select>
    </div>
  <div class="form-navigation">
    <button type="button" onclick="prevStep('step2')">Previous</button>
    <button type="submit">Submit</button>
  </div>
</div>

  </form>
</div>
</div>
</div>
</body>
</html>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<script>
  let currentStep = 1;
    const totalSteps = document.querySelectorAll('.form-step').length;

function nextStep() {
    // Check gender before step1
    if (currentStep === 1) {
        var genderSelected = document.getElementById("genderInput").value !== "";
        if (!genderSelected) {
            alert("Please select your gender before proceeding.");
            return;
        }
    }

    // Step 2 age validation
    if (currentStep === 2) {
        if (!validateStep2()) {
            alert("Please select age for all selected family members before proceeding.");
            return;
        }
    }

    // Move to next step
    if (currentStep < totalSteps) {
        document.getElementById(`step${currentStep}`).style.display = 'none';
        currentStep++;
        updateStepper();
      // Scroll to top when moving to the next step
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        // Fallback for older browsers
        window.scrollTo(0, 0);
      }
    }
}

    function prevStep() {
    if (currentStep > 1) {
        document.getElementById(`step${currentStep}`).style.display = 'none';
        currentStep--;
        updateStepper();
    } else {
        // On first step → browser back (previous page)
        window.history.back();
    }
}

    function updateStepper() {
        document.querySelectorAll('.stepper li').forEach(step => {
            step.classList.remove('active');
            step.querySelector('.circle').style.backgroundColor = '#006D8D'; // Set the default color for inactive steps
        });

        const currentStepElement = document.querySelector(`.stepper li:nth-child(${currentStep})`);
        currentStepElement.classList.add('active');
        currentStepElement.querySelector('.circle').style.backgroundColor = '#7b7f89'; // Set the color for the active step

        document.getElementById(`step${currentStep}`).style.display = 'block';
    }

</script>

<script>
  function validateStep2() {
    // Collect all age dropdowns inside selectedMembersContainer
    const ageInputs = document.querySelectorAll('#selectedMembersContainer select');

    for (let ageInput of ageInputs) {
        if (ageInput.value === "" || ageInput.value === null) {
            return false; // fail validation
        }
    }

    return true; // all good
}

</script>

<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
  import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

  // Your Firebase Config
  const firebaseConfig = {
    apiKey: "AIzaSyAoYqi_fHfsPOAXAQOv_dZCam2xmVdPPLg",
    authDomain: "sat1-f51fd.firebaseapp.com",
    projectId: "sat1-f51fd",
    storageBucket: "sat1-f51fd.firebasestorage.app",
    messagingSenderId: "168926562989",
    appId: "1:168926562989:web:0e06ddae9a1e8be5559424",
    measurementId: "G-CM0X3Q85T6"
  };

  // Initialize
  window.firebaseApp = initializeApp(firebaseConfig);
  window.db = getFirestore(firebaseApp);

  //console.log("Firebase App:", window.firebaseApp);
//console.log("Firestore DB:", window.db);

</script>


<script type="module">

  import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
 
  const CITIES_JSON_URL = './cities_zones_ci.json'; // change if you host elsewhere

  // Cache for { cityLower: zoneNumber }
  let CITY_ZONE_MAP = {};

  // Populate datalist with cities and attach listeners
  async function initCityAndZone() {
    try {
      const res = await fetch(CITIES_JSON_URL, { cache: 'no-store' });
      CITY_ZONE_MAP = await res.json(); // keys are lowercase city names

      const datalist = document.getElementById('cityList');
      datalist.innerHTML = '';

      // Add options
      Object.keys(CITY_ZONE_MAP)
        .sort()
        .forEach((cityLower) => {
          const opt = document.createElement('option');
          // Show proper case by capitalizing each word
          const niceLabel = cityLower
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
          opt.value = niceLabel;
          datalist.appendChild(opt);
        });

      // Initialize zone with default 3
      const zoneInput = document.getElementById('zone');
      if (zoneInput) zoneInput.value = '3';

      // When user types/selects a city, compute zone
      const cityInput = document.getElementById('city');
      cityInput.addEventListener('input', updateZoneForCity);
      cityInput.addEventListener('change', updateZoneForCity);
    } catch (e) {
      console.error('Failed to load city/zone mapping:', e);
      // Fallback: always zone 3
      const zoneInput = document.getElementById('zone');
      if (zoneInput) zoneInput.value = '3';
    }
  }

function updateZoneForCity() {
  const cityInput = document.getElementById('city');
  const zoneHidden = document.getElementById('zone');       // hidden numeric
  const zoneLabel  = document.getElementById('zoneLabel');  // visible "Zone X"
  if (!cityInput || !zoneHidden || !zoneLabel) return;

  const key  = String(cityInput.value || '').trim().toLowerCase();
  const z    = CITY_ZONE_MAP[key];

  // Default to 3 if city not found
  const zoneNum = (z && Number(z) >= 1 && Number(z) <= 3) ? Number(z) : 3;

  zoneHidden.value = String(zoneNum);         // e.g. "1"
  zoneLabel.value  = `Zone ${zoneNum}`;       // e.g. "Zone 1"
}

// also set a default on init
document.addEventListener('DOMContentLoaded', () => {
  const zoneHidden = document.getElementById('zone');
  const zoneLabel  = document.getElementById('zoneLabel');
  if (zoneHidden && zoneLabel) {
    const n = Number(zoneHidden.value || 3) || 3;
    zoneHidden.value = String(n);
    zoneLabel.value  = `Zone ${n}`;
  }
});


  // ==== Save entire form into localStorage on submit (and still submit to server) ====

(function hookFormSubmit() {
  const form = document.getElementById('myForm');
  if (!form) return;

form.addEventListener('submit', async function (e) {
  try {
    const data = {};
    const fd = new FormData(form);

    // Convert to object
    for (const [k, v] of fd.entries()) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        const prev = data[k];
        if (Array.isArray(prev)) prev.push(v);
        else data[k] = [prev, v];
      } else {
        data[k] = v;
      }
    }

    data.__savedAt = new Date().toISOString();
    data.__currentStep = typeof currentStep !== 'undefined' ? currentStep : null;

    // Save to localStorage
    localStorage.setItem('healthFormData', JSON.stringify(data));

    // 🔥 Save to Firebase
    await addDoc(collection(window.db, "AUX_enquiry_leads"), {
      ...data,
      lead_type: "health",
      form_name: "enquiry_form",
      created_at: new Date().toISOString()
    });

    console.log("🔥 Saved to Firebase");

  } catch (err) {
    console.error("Firebase/localStorage error:", err);
  }

});

})();


  // Kick off city/zone initialization after DOM is ready
  document.addEventListener('DOMContentLoaded', initCityAndZone);
</script>



<script>
document.addEventListener("DOMContentLoaded", function() {
    // Add event listeners to +/- buttons to prevent hiding when clicked and update the count
    document.querySelectorAll('.btn-container .btn').forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the click event from bubbling up
            const type = btn.parentNode.dataset.type;
        });
    });

    // Add event listeners to cards to toggle the associated checkboxes and update selected members
    document.querySelectorAll('.card').forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        const btnContainer = card.querySelector('.btn-container');

        card.addEventListener('click', function(event) {
            // Check if the click happened directly on the checkbox or the buttons
            if (event.target.nodeName !== 'INPUT' && !event.target.classList.contains('btn')) {
                // Toggle the associated checkbox only if the card is clicked directly
                checkbox.checked = !checkbox.checked;
                // Update selected members
                updateSelectedMembers();
                // Toggle the selected class for the card
                card.classList.toggle('selected');
            }
            // Prevent the click event on the buttons from bubbling up to the card
            event.stopPropagation();
        });

        // Prevent the click event on the buttons from bubbling up to the card
        btnContainer.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
});

  </script>
<script>
var maxTotalChildren = 4;

function increment(type) {
    var countElement = document.getElementById(type + 'Count');
    var count = parseInt(countElement.textContent);

    // Calculate the current total children count
    var currentTotal = count + (type === 'son' ? getDaughterCount() : getSonCount());

    // Check if adding another child exceeds the total limit of 4
    if (currentTotal >= maxTotalChildren) {
        alert('You can select up to 4 children in total.');
        return;
    }

    // Increment the count for the specific type
    count++;
    countElement.textContent = count;

    // Disable daughter card if 4 sons are selected
    if (type === 'son' && count === 4) {
        disableCard('daughter');
    }

    // Disable son card if 4 daughters are selected
    if (type === 'daughter' && count === 4) {
        disableCard('son');
    }

    updateSelectedMembers();
}

function decrement(type) {
    var countElement = document.getElementById(type + 'Count');
    var count = parseInt(countElement.textContent);

    // Check if reducing the count below 0 is not allowed
    if (count <= 0) {
        return;
    }

    // Decrement the count for the specific type
    count--;
    countElement.textContent = count;

    // Enable daughter card if less than 4 sons are selected
    if (type === 'son' && count < 4) {
        enableCard('daughter');
    }

    // Enable son card if less than 4 daughters are selected
    if (type === 'daughter' && count < 4) {
        enableCard('son');
    }

    updateSelectedMembers();
}

function getSonCount() {
    return parseInt(document.getElementById('sonCount').textContent);
}

function getDaughterCount() {
    return parseInt(document.getElementById('daughterCount').textContent);
}

function disableCard(cardType) {
    var card = document.querySelector('.card input[name="' + cardType + '"]').parentNode.parentNode;
    card.classList.add('disabled');
    document.querySelector('.card input[name="' + cardType + '"]').disabled = true;
}

function enableCard(cardType) {
    var card = document.querySelector('.card input[name="' + cardType + '"]').parentNode.parentNode;
    card.classList.remove('disabled');
    document.querySelector('.card input[name="' + cardType + '"]').disabled = false;
}

</script>

<script>

function toggleSort(gender) {
    const genderInput = document.getElementById('genderInput');
    genderInput.value = gender;
    updateSelectedMembers(); // Update selected members when gender is toggled
}

        function toggleSort(isMale) {
            var maleButton = document.querySelector('.toggle-btn[value="Male"]');
            var femaleButton = document.querySelector('.toggle-btn[value="Female"]');
            var genderInput = document.getElementById('genderInput');

            if (isMale) {
                maleButton.classList.add('active');
                femaleButton.classList.remove('active');
                genderInput.value = 'Male';
            } else {
                femaleButton.classList.add('active');
                maleButton.classList.remove('active');
                genderInput.value = 'Female';
            }

            updateCardImages();
             updateSelectedMembers();
        }

        function updateCardImages() {
            const gender = document.getElementById('genderInput').value;
            const selfCardImg = document.querySelector('#self + img');
            const spouseCardImg = document.querySelector('#spouse + img');
            if (gender === 'Female') {
                selfCardImg.src = "../assets/frame1.svg"; // Update to correct female self image path
                spouseCardImg.src = "../assets/frame.svg"; // Update to correct female spouse image path
            } else {
                selfCardImg.src = "../assets/frame.svg"; // Update to correct male self image path
                spouseCardImg.src = "../assets/frame1.svg"; // Update to correct male spouse image path
            }
        }
    </script>
<script>
// Define an object to store selected members and their counts
let selectedMembers = {
    self: false,
    spouse: false,
    son: false,
    daughter: false
};
// Function to toggle the associated checkbox and update selected members when the card is clicked
function toggleCheckboxAndMembers(member) {
    const checkbox = document.getElementById(member);
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
        updateSelectedMembers();
        // Set the card's background color based on checkbox state
        const isSelected = checkbox.checked;
        const card = checkbox.closest('.card'); // Find the closest parent element with class 'card'
        // card.style.backgroundColor = isSelected ? 'lightblue' : ''; // Change to your desired color
    } else {
        // console.error('Checkbox not found within the card.');
    }
}

// Add event listeners to cards for Self, Spouse, Son, and Daughter to toggle the associated checkboxes and update selected members
document.querySelectorAll('.card').forEach(card => {
    const member = card.querySelector('input[type="checkbox"]').id;
    card.addEventListener('click', function() {
        toggleCheckboxAndMembers(member);
    });
});
// Function to toggle the associated checkbox and update selected members when the card is clicked
function toggleCheckboxAndMembers(member) {
    const checkbox = document.getElementById(member);
    if (checkbox) {
        // Update checkbox state
        checkbox.checked = !checkbox.checked;


        updateSelectedMembers();
        // Update countElement based on checkbox state
        if (checkbox.checked) {
            const countElement = document.getElementById(member + 'Count');
            countElement.textContent = '1';

        updateSelectedMembers();
        } else {
            const countElement = document.getElementById(member + 'Count');
            countElement.textContent = '0';

        updateSelectedMembers();
        }

        // Toggle the visibility of btn-container for son and daughter
        if (member === 'son' || member === 'daughter') {
            const btnContainer = document.querySelector('.btn-container[data-type="' + member + '"]');
            if (btnContainer) {
                btnContainer.style.display = checkbox.checked ? 'flex' : 'none';
            }
        }

        // Set the card's border color based on checkbox state
        const isSelected = checkbox.checked;
        const card = checkbox.closest('.card');
        if (member !== 'spouse') {
            card.style.borderColor = isSelected ? 'blue' : '';
        }
    } else {
        console.error('Checkbox not found within the card.');
    }
}


// Add event listeners to cards for Self, Spouse, Son, and Daughter to toggle the associated checkboxes and update selected members
document.querySelectorAll('.card').forEach(card => {
    const member = card.querySelector('input[type="checkbox"]').id;
    card.addEventListener('click', function() {
        toggleCheckboxAndMembers(member);
    });
});

  </script>
  <script>
// Function to update selectedMembers object when a checkbox is changed
function updateSelectedMembers() {
    selectedMembers.self = document.getElementById('self').checked;
    selectedMembers.spouse = document.getElementById('spouse').checked;
    selectedMembers.sonCount = parseInt(document.getElementById('sonCount').textContent);
    selectedMembers.daughterCount = parseInt(document.getElementById('daughterCount').textContent);
    document.getElementById('sonCountInput').value = selectedMembers.sonCount;
    document.getElementById('daughterCountInput').value = selectedMembers.daughterCount;
    // Clear the container before updating
    const selectedMembersContainer = document.getElementById('selectedMembersContainer');
    selectedMembersContainer.innerHTML = '';
    const genderInput = document.getElementById('genderInput').value;
    // console.log("Gender:", genderInput);

    let selfImage = '../assets/frame.svg';
    let spouseImage = '../assets/frame1.svg';

    // Check gender to update images
    if (genderInput === 'Female') {
        selfImage = '../assets/frame1.svg';
        spouseImage = '../assets/frame.svg';
    }

 let coverForValue = '';

    // Add 1 for self
    if (selectedMembers.self) {
        coverForValue += '1';
    }

    // Add 1 for spouse if spouse is true
    if (selectedMembers.spouse) {
        coverForValue += '1';
    } else {
        // Add 0 for spouse if spouse is false
        coverForValue += '0';
    }

    // Add sonCount and daughterCount
    coverForValue += (selectedMembers.sonCount + selectedMembers.daughterCount);

    // Add 0 at the end
    coverForValue += '0';

    // Update cover_for input field with the combined values
    document.getElementById('coverForInput').value = coverForValue;

    // Generate HTML for selected members
    if (selectedMembers.self) {
        selectedMembersContainer.innerHTML += `
<div class="card2-container">
    <div class="card2">
        <label for="self">
            <input id="self" type="checkbox" name="self" >
            <img src="${selfImage}" alt="Self">
            <p>Self</p>
        </label>
        <select class="select-border-bottom" id="selfAge" name="Age" style="color:#006D8D;" required>
            <option value="">Select Age</option>
            ${generateAgeOptions()}
        </select>
    </div>
</div>`;
    }
    if (selectedMembers.spouse) {
        selectedMembersContainer.innerHTML += `
<div class="card2-container">
    <div class="card2">
        <label for="spouse">
            <input id="spouse" type="checkbox" name="spouse" >
            <img src="${spouseImage}" alt="Spouse">
            <p>Spouse</p>
        </label>
        <select class="select-border-bottom" id="spouseAge" name="SAge" style="color:#006D8D;" required>
            <option value="">Select Age</option>
            ${generateAgeOptions()}
        </select>
    </div>
</div>`;
    }
    for (let i = 0; i < selectedMembers.sonCount; i++) {
        selectedMembersContainer.innerHTML += `
<div class="card2-container">
    <div class="card2">
        <img src="../assets/frame2.svg" alt="Son">
        <label for="son${i + 1}Age">Son ${i + 1}'s Age:</label>
        <select class="select-border-bottom" id="son${i + 1}Age" name="son${i + 1}Age" style="color:#006D8D;" required>
            <option value="">Select Age</option>
             <option value="0.4">91 Days</option>
            ${generateAgeOptionSon()}
        </select>
    </div>
</div>`;
    }
    for (let i = 0; i < selectedMembers.daughterCount; i++) {
        selectedMembersContainer.innerHTML += `
<div class="card2-container">
    <div class="card2">
        <img src="../assets/frame3.svg" alt="Daughter">
        <label for="daughter${i + 1}Age">Daughter ${i + 1}'s</label>
        <select class="select-border-bottom" id="daughter${i + 1}Age" name="daughter${i + 1}Age" style="color:#006D8D;" required>
            <option value="">Select Age</option>
             <option value="0.4">91 Days</option>
            ${generateAgeOptionSon()}
        </select>
    </div>
</div>`;
    }

    // console.log("Selected Members:");
    // console.log(selectedMembers);
}

// Function to generate age options
function generateAgeOptions() {
    let options = '';
    for (let age = 18; age <= 100; age++) {
        options += `<option value="${age}">${age} Years</option>`;
    }
    return options;
}
function generateAgeOptionSon() {
    let options = '';
    for (let age = 1; age <= 25; age++) {
        options += `<option value="${age}">${age} Years</option>`;
    }
    return options;
}

    </script>
<script>
document.getElementById('cust_mobile').addEventListener('input', function() {
    var mobileNumber = this.value.trim();

    // Restrict input to maximum 10 characters
    if (mobileNumber.length > 10) {
        this.value = this.value.slice(0, 10);
    }

    // Remove any non-numeric characters from the input
    this.value = this.value.replace(/\D/g, '');
});

document.getElementById('pincode').addEventListener('input', function() {
    var pincodeNumber = this.value.trim();

    // Restrict input to maximum 10 characters
    if (pincodeNumber.length > 6) {
        this.value = this.value.slice(0, 6);
    }

    // Remove any non-numeric characters from the input
    this.value = this.value.replace(/\D/g, '');
});
</script>
<script>
  document.getElementById('fname').addEventListener('input', function() {
    // Remove any non-alphabetic characters from the input
    this.value = this.value.replace(/[^A-Za-z]/g, '');
});
// document.getElementById('mname').addEventListener('input', function() {
//     // Remove any non-alphabetic characters from the input
//     this.value = this.value.replace(/[^A-Za-z]/g, '');
// });

document.getElementById('lname').addEventListener('input', function() {
    // Remove any non-alphabetic characters from the input
    this.value = this.value.replace(/[^A-Za-z]/g, '');
});
</script>
<script>
        document.getElementById('fname').addEventListener('input', function (event) {
            event.target.value = event.target.value.toUpperCase();
        });

        document.getElementById('lname').addEventListener('input', function (event) {
            event.target.value = event.target.value.toUpperCase();
        });
    </script>
<script>
  // Function to select the default card
  function selectDefaultCard() {
    // Get the default card element by its ID
    const defaultCard = document.getElementById('self'); // Change 'self' to the ID of your default card

    // Check if the default card exists
    if (defaultCard) {
      // Simulate a click event on the default card
      defaultCard.click();
    }
  }

  // Call the function when the DOM content is loaded
  document.addEventListener('DOMContentLoaded', function() {
    selectDefaultCard();
  });
  function toggleBorder(type) {
    var checkbox = document.getElementById(type);
    var card = checkbox.parentNode.parentNode;
    if (!checkbox.checked) {
        card.classList.remove('selected');
        resetCount(type);
    } else {
        card.classList.add('selected');
    }
}

</script>

<?php
 include 'hed-foot/footer.php';
?>
<!-- OTP modal markup and verification script -->
<style>
.otp-modal {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.otp-box {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 320px;
  max-width: 90%;
  position: relative;
  box-shadow: 0 6px 18px rgba(0,0,0,0.2);
  text-align: center;
}

.otp-boxes{
  width: 48px;
  height: 48px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  border-radius: 8px;
  border: 1px solid #ccc;
}


.otp-box input {
  width: 100%;
  padding: 10px;
  margin-top: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  letter-spacing: 6px;
  text-align: center;
  font-size: 18px;
}

.otp-actions {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  justify-content: center;
}

.btn { padding: 8px 12px; border-radius: 4px; cursor: pointer; }
.btn-primary { background: #006D8D; color: #fff; border: none; }
.btn-secondary { background: #006D8D; border: 1px solid #ccc; }

.otp-error { color: #c0392b; margin-top: 8px; font-size: 13px; }

/* ✅ Close Icon */
.otp-close {
  position: absolute;
  top: 10px;
  right: 12px;
  cursor: pointer;
}
</style>


<div id="otpModal" class="otp-modal">
  <div class="otp-box">

    <!-- ✅ Close SVG Icon -->
    <span id="closeOtpBtn" class="otp-close">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
      </svg>
    </span>

    <h5>Verify Number</h5>
    <p style="font-size:13px;color:#555; margin:2px;">Enter the 4-digit OTP sent to your mobile</p>

<div style="display:flex; justify-content:center; gap:10px;">
  <input type="text" class="otp-boxes" maxlength="1">
  <input type="text" class="otp-boxes" maxlength="1">
  <input type="text" class="otp-boxes" maxlength="1">
  <input type="text" class="otp-boxes" maxlength="1">
</div>

    <div class="otp-error" id="otpError" style="display:none;"></div>

    <div class="otp-actions">
      <button type="button" id="verifyOtpBtn" class="btn btn-primary">Verify</button>
      <button type="button" id="resendOtpBtn" class="btn btn-secondary" disabled>
        Resend (30s)
      </button>
    </div>

    <p style="font-size:13px;color:#555; margin-top:12px;">Didn't receive OTP? Check your mobile number or try again after the cooldown.</p>

  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function(){

  const verifyBtn = document.getElementById('verifyBtn');
  const verifyStatus = document.getElementById('verifyStatus');
  const otpModal = document.getElementById('otpModal');
  const verifyOtpBtn = document.getElementById('verifyOtpBtn');
  const resendOtpBtn = document.getElementById('resendOtpBtn');
  const closeOtpBtn = document.getElementById('closeOtpBtn');
  const otpError = document.getElementById('otpError');
  const otpInputs = document.querySelectorAll('.otp-boxes');

  let currentMobile = null;
  let timer = null;
  let timeLeft = 30;

  function startResendTimer() {
    resendOtpBtn.disabled = true;
    timeLeft = 30;
    resendOtpBtn.textContent = `Resend (${timeLeft}s)`;

    timer = setInterval(() => {
      timeLeft--;
      resendOtpBtn.textContent = `Resend (${timeLeft}s)`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        resendOtpBtn.disabled = false;
        resendOtpBtn.textContent = 'Resend OTP';
      }
    }, 1000);
  }

  function showModal(){
    otpInputs.forEach(i => i.value = '');
    otpError.style.display = 'none';
    otpModal.style.display = 'flex';
    startResendTimer();
    otpInputs[0].focus();
  }

  function hideModal(){
    otpModal.style.display = 'none';
  }

  function getOtpValue(){
    return Array.from(otpInputs).map(i => i.value).join('');
  }

  async function callOtpApi(url, payload){
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });
    return await res.json();
  }

  async function sendOtp(mobile){
    const res = await callOtpApi('https://policyplanner.com/health-insurance/otp/send-otp', { mobile });
    if(res.success){
      currentMobile = mobile;
      showModal();
    } else {
      alert('OTP Send Failed');
    }
  }

  async function verifyOtp(){
    const otp = getOtpValue();
    if(otp.length !== 4){
      otpError.innerText = 'Enter complete 4 digit OTP';
      otpError.style.display = 'block';
      return;
    }

    const res = await callOtpApi('https://policyplanner.com/health-insurance/otp/verify-otp', {
      mobile: currentMobile,
      otp: otp
    });

    console.log('OTP verify response:', res);

    const ok = res && (
      res.valid === true || res.valid === 'true' ||
      res.status === 'success' || res.code === 200 || res.ok === true
    );

    if(ok){
      otpError.innerText = '';
      otpError.style.display = 'none';
      hideModal();
      if (verifyStatus) verifyStatus.style.display = 'inline';
      if (verifyBtn) {
        verifyBtn.textContent = 'Verified';
        verifyBtn.disabled = true;
      }
    } else {
      otpError.innerText = (res && res.message) ? res.message : 'Invalid OTP';
      otpError.style.display = 'block';
    }
  }

  // ✅ OTP Input Auto Move Logic
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', () => {
      if (!/^[0-9]$/.test(input.value)) input.value = '';
      if (input.value && otpInputs[index + 1]) {
        otpInputs[index + 1].focus();
      }
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !input.value && otpInputs[index - 1]) {
        otpInputs[index - 1].focus();
      }
    });
  });

  verifyBtn.addEventListener('click', function(){
    const mobile = document.getElementById('cust_mobile').value.trim();
    if(mobile.length !== 10){
      alert('Enter valid mobile number');
      return;
    }
    sendOtp(mobile);
  });

  verifyOtpBtn.addEventListener('click', verifyOtp);

  resendOtpBtn.addEventListener('click', function(){
    if(currentMobile) sendOtp(currentMobile);
  });

  closeOtpBtn.addEventListener('click', hideModal);

});
</script>
