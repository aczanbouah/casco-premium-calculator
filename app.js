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
  let targetStep;

  //Remove active step class from all form containers and assign to target active step based on forward/back direction
  allSteps.forEach((step) => {
    step.classList.remove("active-step");
  });

  if (direction === "next" && currentStep < 3) {
    targetStep = currentStep + 1;
  } else if (direction === "back" && currentStep > 1) {
    targetStep = currentStep - 1;
  }

  if (targetStep) {
    document
      .querySelector(`[data-step="${targetStep}"]`)
      .classList.add("active-step");
  }
  updateButtons(targetStep);
}

function updateButtons(step) {
  backBtn.disabled = step === 1;
  nextBtn.disabled = step === 3;
}

nextBtn.addEventListener("click", () => updateStep("next"));
backBtn.addEventListener("click", () => updateStep("back"));
