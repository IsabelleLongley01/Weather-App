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

let dateElement = document.querySelector("#time");
dateElement.innerHTML = formatDate();

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please enter a city first.");
  }
}

function getCurrentTemperature(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let temperatureElement = document.querySelector("#temperature");
  if (searchInput.value) {
    function displayTemperature(response) {
      let temperature = Math.round(response.data.temperature.current);
      temperatureElement.innerHTML = `${temperature}*C`;
    }

    let city = `${searchInput.value}`;
    let apiKey = "ae82465odb0463ef60t6098c458a9b30";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

    axios.get(apiUrl).then(displayDefaultTemperature);
  } else {
    function displayDefaultTemperature(response) {
      let temperature = Math.round(response.data.temperature.current);
      temperatureElement.innerHTML = `${temperature}*C`;
    }

    let city = "Huddersfield";
    let apiKey = "ae82465odb0463ef60t6098c458a9b30";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

    axios.get(apiUrl).then(displayDefaultTemperature);
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search, getCurrentTemperature);
