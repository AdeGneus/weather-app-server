const weatherForm = document.querySelector("form");
const searchAddress = document.querySelector("input");
const forecast = document.querySelector("#forecast");
const error = document.querySelector("#error");

const fetchData = async (address) => {
  const res = await fetch(`/weather?address=${address}`);

  const data = await res.json();

  if (data.error) {
    forecast.textContent = "";
    error.textContent = data.error;
  } else {
    forecast.innerHTML = `
      <p>Address: ${data.address}</p>
      <p>Location: ${data.location}</p>
      <p>Temperature: ${data.forecastData.temperature}</p>
   `;
  }
};

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = searchAddress.value;

  forecast.textContent = "Loading...";
  fetchData(location);
});
