const container = document.querySelector(".weather-container");
const search = document.querySelector(".search-box");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const apiKey = "3a917f073f8b10b245af3f8a3d864038";

search.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = document.querySelector(".search-box input").value;
  if (city == "") return;
  fetchWeatherData(city);
});

const getWeatherData = async (city) => {
  const weatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });

  return weatherData;
};

const fetchWeatherData = async (city) => {
  const weatherData = await getWeatherData(city);
  if (weatherData.cod == "404") {
    container.style.height = "400px";
    weatherBox.style.display = "none";
    weatherDetails.style.display = "none";
    error404.style.display = "block";
    error404.classList.add("appear");
    return;
  }
  error404.style.display = "none";
  error404.classList.remove("appear");

  const image = document.querySelector(".weather-box img");
  const temperature = document.querySelector(".weather-box .temperature");
  const description = document.querySelector(".weather-box .description");
  const humidity = document.querySelector(".weather-details .humidity span");
  const wind = document.querySelector(".weather-details .wind span");

  switch (weatherData.weather[0].main) {
    case "Clouds":
      image.src = "images/cloud.png";
      break;

    case "Clear":
      image.src = "images/clear.png";
      break;

    case "Rain":
      image.src = "images/rain.png";
      break;

    case "Snow":
      image.src = "images/snow.png";
      break;

    case "Haze":
      image.src = "images/mist.png";
      break;

    case "Mist":
      image.src = "images/mist.png";
      break;

    default:
      image.src = "";
  }

  weatherBox.style.display = "";
  weatherDetails.style.display = "";
  weatherBox.classList.remove("appear");
  weatherDetails.classList.remove("appear");
  setTimeout(() => {
    container.style.height = "590px";
    weatherBox.classList.add("appear");
    weatherDetails.classList.add("appear");
    temperature.innerHTML = `${weatherData.main.temp.toFixed(
      0
    )}<span>°C</span>`;
    description.innerHTML = weatherData.weather[0].description;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    wind.innerHTML = `${weatherData.wind.speed.toFixed(0)} km/h`;
  }, 500);
};
