function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector(".temperature");
  cityTemp.innerHTML = `${temperature}`;
  let feelsLike = Math.round(response.data.main.feels_like);
  let feelslikeInfo = document.querySelector("#feels-like");
  feelslikeInfo.innerHTML = `${feelsLike}º`;
  let maximum = Math.round(response.data.main.temp_max);
  let maxInfo = document.querySelector("#maximum");
  maxInfo.innerHTML = `${maximum}º`;
  let minimum = Math.round(response.data.main.temp_min);
  let minInfo = document.querySelector("#minimum");
  minInfo.innerHTML = `${minimum}º`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityInfo = document.querySelector("#humidity");
  humidityInfo.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windInfo = document.querySelector("#wind");
  windInfo.innerHTML = `${wind}%`;
  let weatherDescription = response.data.weather[0].main;
  let weathertextDescription = document.querySelector(".description");
  weathertextDescription.innerHTML = `${weatherDescription}`;
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
