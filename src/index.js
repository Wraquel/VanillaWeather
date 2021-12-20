//Time's settings //

function formatHour(unixTimestemp, timeZone) {
  let date = new Date(unixTimestemp * 1000);
  let currentHours = (date.getUTCHours() + timeZone + 24) % 24;
  let currentMinutes = date.getMinutes();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  //********  Display different backgrounds for day/night //
  if ((currentHours >= 7) & (currentHours <= 17)) {
    document.getElementById("weather-app").style.backgroundImage =
      "url(media/background-day.png)";
  } else {
    document.getElementById("weather-app").style.backgroundImage =
      "url(media/background-night.png)";
  }
  return ` ${currentHours}:${currentMinutes}`;
}

//Day's settings //
function formatDay(timestemp) {
  let date = new Date(timestemp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//Date's settings //
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

//Forecast's settings //
function getForecast(coordinates) {
  let apiKey = "16830bfc1e47231d3a538e2cfef02d61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

//Parameter's settings //
function showTemperature(response) {
  let cityInfo = document.querySelector(".city");
  cityInfo.innerHTML = response.data.name;
  let countryInfo = document.querySelector(".country");
  countryInfo.innerHTML = response.data.sys.country;
  let descriptionInfo = document.querySelector(".description");
  let description = response.data.weather[0].main;
  descriptionInfo.innerHTML = description;
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
  let dateInfo = document.querySelector(".current-day");
  dateInfo.innerHTML = formatDate(response.data.dt * 1000);
  let timezone = response.data.timezone / 3600;
  let updateInfo = document.querySelector(".local-time");
  let currentLocalTime = formatHour(Date.now() / 1000, timezone);
  updateInfo.innerHTML = `Local time ${currentLocalTime}`;
  let iconInfo = document.querySelector("#icon");
  iconInfo.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

// Display Forecast for the next days //
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastInfo = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
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

//Set the city searched on the API//
function showCity(city) {
  let apiKey = "16830bfc1e47231d3a538e2cfef02d61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

//Set coordinates of current city of location on the API//
function showPosition(position) {
  let apiKey = "16830bfc1e47231d3a538e2cfef02d61";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

//Get current city of location //
function showCurrentcity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

//Get the city that is being searched //
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  showCity(city);
}
let searchcityForm = document.querySelector("#search-form");
searchcityForm.addEventListener("submit", handleSubmit);

let currentcityButton = document.querySelector("#current-button");
currentcityButton.addEventListener("click", showCurrentcity);

showCity("Lisbon, PT");
