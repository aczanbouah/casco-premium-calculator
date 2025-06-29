// let currentStep = 1;
const vehicleData = [];
const driverData = [];
const coverageOptions = [];
const vehicleDataForm = document.querySelector("#vehicle-data");
// const vehicleSubmitBtn = document.querySelector("#vehicle-submit-btn");
const driverDataForm = document.querySelector("#driver-data");
// const driverSubmitBtn = document.querySelector("#driver-submit-btn");
const backBtn = document.querySelector("#back-btn");
const nextBtn = document.querySelector("#next-btn");

function InsuranceQuote(vehicleData, driverData, coverageOptions) {
  this.vehicleData = vehicleData;
  this.driverData = driverData;
  this.coverageOptions = coverageOptions;
}

vehicleDataForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(vehicleDataForm);
  const obj = Object.fromEntries(formData);
  vehicleData.push(obj);
});

driverDataForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(driverDataForm);
  const obj = Object.fromEntries(formData);
  driverData.push(obj);
});

function updateStep(direction) {
  //Find current active step
  const allSteps = document.querySelectorAll("[data-step]");
  const currentActiveContainer = document.querySelector(".active-step");
  const currentStep = parseInt(currentActiveContainer.dataset.step);
  let targetStep = currentStep;

  //Remove active step class from all form containers
  allSteps.forEach((step) => {
    step.classList.remove("active-step");
  });

  //Calculate target step
  if (direction === "next" && currentStep < 3) {
    targetStep = currentStep + 1;
  } else if (direction === "back" && currentStep > 1) {
    targetStep = currentStep - 1;
  }
  // Apple active step class to result
  document
    .querySelector(`[data-step="${targetStep}"]`)
    .classList.add("active-step");

  updateButtons(targetStep);
}

function updateButtons(step) {
  backBtn.disabled = step === 1;
  nextBtn.disabled = step === 3;
}

function calculateBasePrice(value) {
  return (4 * value) / 100;
}

function calculateDriverAgePremium(basePrice, driverAge) {
  const getMultiplier = (age) => {
    if (age >= 18 && age <= 25) return 1.5;
    if (age >= 25 && age <= 35) return 1.2;
    if (age >= 35 && age <= 50) return 1.0;
    if (age >= 50 && age <= 64) return 0.9;
    if (age >= 65) return 1.3;
  };

  return basePrice * getMultiplier(driverAge);
}

function calculateDrivingExpPremium(agePremium, drivingExp) {
  const getMultiplier = (yrs) => {
    if (yrs >= 0 && yrs <= 2) return 1.4;
    if (yrs >= 3 && yrs <= 5) return 1.2;
    if (yrs >= 6 && yrs <= 10) return 1.0;
    if (yrs >= 11 && yrs <= 20) return 0.9;
    if (yrs >= 21) return 0.8;
  };

  return Math.ceil(agePremium * getMultiplier(drivingExp));
}

function calculateClaimsHistory(drivingExpPremium, numOfClaims) {
  const getMultiplier = (claims) => {
    if (claims === 0) return 1.0;
    if (claims === 1) return 1.2;
    if (claims === 2) return 1.5;
    if (claims >= 3) return 2.0;
  };

  return Math.ceil(drivingExpPremium * getMultiplier(numOfClaims));
}

function calculateLocationPremium(claimsPremium, location) {
  const getMultiplier = (location) => {
    if (location === "bucharest") return 1.2;
    if (location === "cluj-napoca") return 1.1;
    if (location === "timisoara") return 1.05;
    if (location === "constanta") return 1.15;
    if (location === "other") return 1.0;
  };

  return Math.ceil(claimsPremium * getMultiplier(location));
}

function calculateMileagePremium(locationPremium, mileageNum) {
  const getMultiplier = (mileage) => {
    if (mileage < 10000) return 0.95;
    if (mileage >= 10000 && mileage < 20000) return 1.0;
    if (mileage >= 20000 && mileage < 30000) return 1.15;
    if (mileage >= 30000) return 1.3;
  };

  return Math.ceil(locationPremium * getMultiplier(mileageNum));
}

nextBtn.addEventListener("click", () => updateStep("next"));
backBtn.addEventListener("click", () => updateStep("back"));
