const vehicleData = [];
const vehicleDataForm = document.querySelector(".form");

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
