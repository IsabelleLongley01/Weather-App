function formatDate() {
  let now = new Date();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let day = days[now.getDay()];
  let date = now.getDate();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${date} ${month} ${year}, ${hours}:${minutes}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = searchInput.value;
  fetchCurrentWeather(city);
  getForecast(city);
}

function fetchCurrentWeather(city) {
  let apiKey = "ae82465odb0463ef60t6098c458a9b30";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#temperature-description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature}°C`;
  descriptionElement.innerHTML = `Weather: ${response.data.condition.description}, `;
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%, `;
  windSpeedElement.innerHTML = `Wind Speed: ${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" id="icon">`;
}

function formatDay(timestamp) {
  let date = newDate(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "ae82465odb0463ef60t6098c458a9b30";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
       <div class="weather-forecast-day">
         <div class="weather-forecast-date">${formatDay(day.time)}</div>
         <div class="weather-forecast-icon"><img src="${
           day.condition.icon_url
         }></div>
         <div class="weather-forecast-temperatures">
           <span class="weather-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}°</strong>
           </span>
           <span class="weather-forecast-temperature">${Math.round(
             day.temperature.minimum
           )}°</span>
         </div>
       </div>
        `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let dateElement = document.querySelector("#time");
dateElement.innerHTML = formatDate();

fetchCurrentWeather("Harrogate");
getForecast("Harrogate");
