/* Javascript file that retrieves data from one of several public API sources to display 
the data on your HTML page

Goals: 
Display data for at least 2 of the end-points in the API
Include navigation from each model's page to the other models that are displayed
Issue new GET requests for the linked data to display in the linked pages



Import necessary modules (e.g., weatherApp.js, weatherApp.html, weatherApp.css)
Add event listeners
*/

// Add event listeners
const cityInput = document.querySelector(".cityInput");
const currentWeatherBtn = document.getElementById("currentWeatherBtn");
const forecastBtn = document.getElementById("forecastBtn");
const content = document.querySelector(".content");

// Event listeners
currentWeatherBtn.addEventListener('click', showCurrentWeather);
//forecastBtn.addEventListener('click', showForecast);

// Function to get coordinates based on city name
async function getCoordinates(city) {
    const geoCodingApi = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
    const response = await fetch(geoCodingApi);
    if (!response.ok) {
        throw new Error("Could not fetch coordinates");
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
        const latitude = data.results[0].latitude;
        const longitude = data.results[0].longitude;
        return { latitude, longitude };
    } else {
        throw new Error("No results found for the given city");
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

            console.log(displayCurrentWeatherInfo(city, weatherData));
        } catch (error) {
            console.error(error);
            displayError("Could not fetch current weather data.");
        }
    }
}

/*




currentWeatherBtn.addEventListener("click", async event => {
  event.preventDefault(); //Prevent the form from refreshing the page
  const cityInput = document.querySelector(".cityInput");
  const city = cityInput.value.trim();
  if(city){
    try {
      const {latitude, longitude}= await getCoordinates(city);
      const weatherData = await getWeatherData(latitude, longitude);
      displayWeatherInfo(weatherData);
    }
    catch(error){
      console.error(error);
      displayError(error);
    }
  }
  else{
    displayError("Please enter a city");
  }
});

// Function to get coordinates based on city name
async function getCoordinates(city) {
  const geoCodingApi = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
  const response = await fetch(geoCodingApi);
  if(!response.ok){
    throw new Error("Could not fetch Coordinates");
  }

  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const latitude = data.results[0].latitude;
    const longitude = data.results[0].longitude;
    return {latitude, longitude };
  } else {
    throw new Error("No results found for given city");
  }
}
  
//Function to get weather Data
async function getWeatherData(latitude, longitude) {
  const weatherApi = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max&timezone=auto'
  const response = await fetch(weatherApi);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  const data = await response.json();
  return data
}


/*
Create a function renderWeatherPage() {
    Fetch current weather data using fetchWeatherData(endpoint, params)
    Parse and display the following:
      - Temperature
      - Weather condition
    Add a "View Forecast" button with an event listener
      - On click, navigate to the forecast page
}

*/



async function displayWeatherInfo(data) {
  let weatherDiv = document.querySelector('.weather');
    weatherDiv.innerHTML = "";
    weatherDiv.style.display = "flex";

    let days = data.daily.time.length;

    for (let i = 0; i < days; i++) {
      let date = data.daily.time[i];
      let temp_max = data.daily.temperature_2m_max[i];
      let temp_min = data.daily.temperature_2m_min[i];
      let windspeed = data.daily.windspeed_10m_max[i];
      let weathercode = data.daily.weathercode[i];

      let weatherDesc = getWeatherDescription(weathercode);

      let html = '<h3>' + date + '</h3>' +
        '<p><strong>Weather:</strong> ' + weatherDesc + '</p>' +
        '<p><strong>Temperature:</strong> ' + temp_min + '°C - ' + temp_max + '°C</p>' +
        '<p><strong>Wind Speed:</strong> ' + windspeed + ' km/h</p>';

      let dayDiv = document.createElement('div');
      dayDiv.innerHTML = html;
      weatherDiv.appendChild(dayDiv);
    }
}

// Function to map weather codes to descriptions
function getWeatherDescription(code) {
  let descriptions = {
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

  return descriptions[code] || 'Unknown weather condition';
}





/*
Create a function renderForecastPage() {
    Fetch 7-day forecast data using fetchWeatherData(endpoint, params)
    Parse and display daily weather data:
      - Date
      - High/Low temperatures
      - Summary
    Add a "Back to Current Weather" button with an event listener
      - On click, navigate back to the weather page
}


Create a function navigateToPage(page) {
    Clear the current page content
    Based on the page name:
        - Call renderWeatherPage() for "weather"
        - Call renderForecastPage() for "forecast"
}
*/
