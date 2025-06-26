const vehicleData = [];
const driverData = [];
const vehicleDataForm = document.querySelector("#vehicle-data");
const vehicleSubmitBtn = document.querySelector("#vehicle-submit-btn");
const driverDataForm = document.querySelector("#driver-data");

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

vehicleSubmitBtn.addEventListener("click", () => {
  document.querySelector('[data-step="1"]').classList.remove("active-step");
  document.querySelector('[data-step="2"]').classList.add("active-step");
});
