// Add event listeners
const cityInput = document.querySelector(".cityInput");
const currentWeatherBtn = document.getElementById("currentWeatherBtn");
const forecastBtn = document.getElementById("forecastBtn");
const content = document.querySelector(".content");

// Event listeners
currentWeatherBtn.addEventListener('click', showCurrentWeather);
forecastBtn.addEventListener('click', showForecast); // Ensure this is uncommented

// Function to get coordinates based on city name
async function getCoordinates(city) {
  const geoCodingApi = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
  const response = await fetch(geoCodingApi);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;
    return { latitude, longitude };
  } else {
    throw new Error(`No results found for "${city}"`);
  }
}

// Function to show current weather
async function showCurrentWeather() {
  content.innerHTML = ''; // Clear previous content

  const city = cityInput.value;
  if (city) {
    try {
      const { latitude, longitude } = await getCoordinates(city);
      const weatherData = await getCurrentWeatherData(latitude, longitude);

      displayCurrentWeatherInfo(city, weatherData);
    } catch (error) {
      console.error(error);
      displayError(error.message);
    }
  }
}

// Function to show forecast
async function showForecast() {
  content.innerHTML = ''; // Clear previous content

  const city = cityInput.value;
  if (city) {
    try {
      const { latitude, longitude } = await getCoordinates(city);
      const weatherData = await getForecastData(latitude, longitude);
      displayForecastInfo(city, weatherData);
    } catch (error) {
      console.error(error);
      displayError(error.message);
    }
  }
}

// Function to get current weather data
async function getCurrentWeatherData(latitude, longitude) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch current weather data");
  }
  return await response.json();
}

// Function to get forecast data
async function getForecastData(latitude, longitude) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&timezone=auto`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }
  return await response.json();
}

// Function to display current weather data
function displayCurrentWeatherInfo(city, data) {
  content.style.display = "block";
  const currentWeather = data.current_weather;
  const weatherCode = currentWeather.weathercode;
  const temperature = currentWeather.temperature;
  const windspeed = currentWeather.windspeed;

  const weatherCard = document.createElement('div');
  weatherCard.classList.add('weather-card');

  const cityDisplay = document.createElement("h1");
  cityDisplay.textContent = city;

  const tempDisplay = document.createElement("p");
  tempDisplay.textContent = `Temperature: ${temperature.toFixed(1)}°C`;

  const windspeedDisplay = document.createElement("p");
  windspeedDisplay.textContent = `Wind Speed: ${windspeed} km/h`;

  const descDisplay = document.createElement("p");
  descDisplay.textContent = getWeatherDescription(weatherCode);

  const weatherEmoji = document.createElement("p");
  weatherEmoji.textContent = getWeatherEmoji(weatherCode);
  weatherEmoji.classList.add("weatherEmoji");

  weatherCard.appendChild(cityDisplay);
  weatherCard.appendChild(tempDisplay);
  weatherCard.appendChild(windspeedDisplay);
  weatherCard.appendChild(descDisplay);
  weatherCard.appendChild(weatherEmoji);

  content.appendChild(weatherCard);
}

// Function to display forecast data
function displayForecastInfo(city, data) {
  content.style.display = "block";
  const forecastContainer = document.createElement('div');
  forecastContainer.classList.add('forecast-container');
  const daily = data.daily;
  for (let i = 0; i < daily.time.length; i++) {
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    const date = new Date(daily.time[i]);
    const tempMax = daily.temperature_2m_max[i];
    const tempMin = daily.temperature_2m_min[i];
    const weatherCode = daily.weathercode[i];
    const windspeed = daily.windspeed_10m_max[i];

    const dateDisplay = document.createElement("h2");
    dateDisplay.textContent = date.toDateString();

    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `Temp: ${tempMin.toFixed(1)}°C - ${tempMax.toFixed(1)}°C`;

    const windspeedDisplay = document.createElement("p");
    windspeedDisplay.textContent = `Wind Speed: ${windspeed} km/h`;

    const descDisplay = document.createElement("p");
    descDisplay.textContent = getWeatherDescription(weatherCode);

    const weatherEmoji = document.createElement("p");
    weatherEmoji.textContent = getWeatherEmoji(weatherCode);
    weatherEmoji.classList.add("weatherEmoji");

    forecastCard.appendChild(dateDisplay);
    forecastCard.appendChild(tempDisplay);
    forecastCard.appendChild(windspeedDisplay);
    forecastCard.appendChild(descDisplay);
    forecastCard.appendChild(weatherEmoji);

    forecastContainer.appendChild(forecastCard);
  }

  content.appendChild(forecastContainer);
}

// Function to display error messages
function displayError(message) {
  content.innerHTML = ''; // Clear previous content
  content.style.display = "block";
  const errorMessage = document.createElement('p');
  errorMessage.classList.add('error-message');
  errorMessage.textContent = message;
  content.appendChild(errorMessage);
}

function getWeatherEmoji(code) {
  switch(true) {
      case code === 0:
          return "☀";
      case code >= 1 && code <= 3:
          return "⛅";
      case code === 45 || code === 48:
          return "🌫";
      case code >= 51 && code <= 57:
          return "🌦";
      case code >= 61 && code <= 67:
          return "🌧";
      case code >= 71 && code <= 77:
          return "❄";
      case code >= 80 && code <= 82:
          return "🌧";
      case code >= 85 && code <= 86:
          return "❄";
      case code >= 95 && code <= 99:
          return "⛈";
      default:
          return "❓";
  }
}

// Function to map weather codes to descriptions
function getWeatherDescription(code) {
  const descriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Fog',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      56: 'Light freezing drizzle',
      57: 'Dense freezing drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      66: 'Light freezing rain',
      67: 'Heavy freezing rain',
      71: 'Slight snowfall',
      73: 'Moderate snowfall',
      75: 'Heavy snowfall',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
  };
}