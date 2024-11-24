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

form.addEventListener("submit", async event => {
  event.preventDefault(); //Prevent the form from refreshing the page
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

async function displayWeatherInfo(data)







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
