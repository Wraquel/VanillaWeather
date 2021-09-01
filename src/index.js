function formatDate(timestemp) {
  let date = new Date(timestemp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentDate = date.getDate();
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let currentMonth = months[date.getMonth()];
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();
  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }
  if (currentMonth < 10) {
    currentMonth = `0${currentMonth}`;
  }
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay}, ${currentDate}/${currentMonth}, ${currentHours}:${currentMinutes}`;
}

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let temperatureInfo = document.querySelector(".temperature");
  temperatureInfo.innerHTML = Math.round(response.data.main.temp);

  let feelslikeInfo = document.querySelector("#feels-like");
  feelslikeInfo.innerHTML = Math.round(response.data.main.feels_like);

  let maxInfo = document.querySelector("#maximum");
  maxInfo.innerHTML = Math.round(response.data.main.temp_max);

  let minInfo = document.querySelector("#minimum");
  minInfo.innerHTML = Math.round(response.data.main.temp_min);

  let humidityInfo = document.querySelector("#humidity");
  humidityInfo.innerHTML = Math.round(response.data.main.humidity);

  let windInfo = document.querySelector("#wind");
  windInfo.innerHTML = Math.round(response.data.wind.speed);

  let descriptionInfo = document.querySelector(".description");
  descriptionInfo.innerHTML = response.data.weather[0].main;

  let dateInfo = document.querySelector(".current-day-time");
  dateInfo.innerHTML = formatDate(response.data.dt * 1000);
}

function showCity(city) {
  let apiKey = "16830bfc1e47231d3a538e2cfef02d61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showCity(city);
}

let searchcityForm = document.querySelector("#search-form");
searchcityForm.addEventListener("submit", handleSubmit);
showCity("Lisbon");
