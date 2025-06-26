const vehicleData = [];
const driverData = [];
const vehicleDataForm = document.querySelector("#vehicle-data");
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
  vehicleDataForm.reset();
});

driverDataForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(driverDataForm);
  const obj = Object.fromEntries(formData);
  driverData.push(obj);
  driverDataForm.reset();
});
