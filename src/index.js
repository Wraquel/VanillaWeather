function formatHour(timestemp) {
  let date = new Date(timestemp);
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return ` ${currentHours}:${currentMinutes}`;
}
function formatDay(timestemp) {
  let date = new Date(timestemp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
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

  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }
  if (currentMonth < 10) {
    currentMonth = `0${currentMonth}`;
  }

  return `${currentDay} ${currentDate}/${currentMonth}`;
}
function getForecast(coordinates) {
  let apiKey = "16830bfc1e47231d3a538e2cfef02d61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  let cityInfo = document.querySelector(".city");
  cityInfo.innerHTML = response.data.name;
  let countryInfo = document.querySelector(".country");
  countryInfo.innerHTML = response.data.sys.country;
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperatureInfo = document.querySelector(".temperature");
  temperatureInfo.innerHTML = celsiusTemperature;
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
  let description = response.data.weather[0].main;
  descriptionInfo.innerHTML = description;
  let dateInfo = document.querySelector(".current-day");
  dateInfo.innerHTML = formatDate(response.data.dt * 1000);
  let updateInfo = document.querySelector(".last-updated-hour");
  updateInfo.innerHTML = formatHour(response.data.dt * 1000);
  let iconInfo = document.querySelector("#icon");
  iconInfo.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  if (
    description === "Rain" ||
    description === "Thunderstorm" ||
    description === "Drizzle"
  ) {
    document.body.style.backgroundImage =
      "url(https://s3.amazonaws.com/shecodesio-production/uploads/files/000/016/867/original/rain.jpg?1631187411)";
  } else if (description === "Clouds") {
    document.body.style.backgroundImage =
      "url(https://s3.amazonaws.com/shecodesio-production/uploads/files/000/016/875/original/wp6680329.jpg?1631196167)";
  } else if (description === "Clear") {
    document.body.style.backgroundImage =
      "url(https://s3.amazonaws.com/shecodesio-production/uploads/files/000/016/877/original/clear.jpg?1631199420)";
  } else if (
    description === "Mist" ||
    description === "Smoke" ||
    description === "Fog" ||
    description === "Haze" ||
    description === "Dust" ||
    description === "Sand" ||
    description === "Ash"
  ) {
    document.body.style.backgroundImage =
      "url(https://s3.amazonaws.com/shecodesio-production/uploads/files/000/016/878/original/701767.jpg?1631200692)";
  }
  getForecast(response.data.coord);
}

function showForecast(response) {
  let forecast = response.data.daily;
  let forecastInfo = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 5) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col">
                <div class="forecast-days">${formatDay(forecastDay.dt)}</div>
                <div><img src= "https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width ="55" /></div>
                <span class="forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>/<span
                  class="forecast-temperature-min"
                  >${Math.round(forecastDay.temp.min)}º</span
                  >
                  </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastInfo.innerHTML = forecastHTML;
}
function showCity(city) {
  let apiKey = "16830bfc1e47231d3a538e2cfef02d61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function showPosition(position) {
  let apiKey = "16830bfc1e47231d3a538e2cfef02d61";
  let apiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showCurrentcity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showCity(city);
}
let searchcityForm = document.querySelector("#search-form");
searchcityForm.addEventListener("submit", handleSubmit);

let currentcityButton = document.querySelector("#current-button");
currentcityButton.addEventListener("click", showCurrentcity);

showCity("Rio de Janeiro, BR");
