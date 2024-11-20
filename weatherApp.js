/* Javascript file that retrieves data from one of several public API sources to display 
the data on your HTML page

Goals: 
Display data for at least 2 of the end-points in the API
Include navigation from each model's page to the other models that are displayed
Issue new GET requests for the linked data to display in the linked pages

Notes: Api keey should not be coded in the application logic.
Use a build tool like Vite to programmatically inject the API key during the build process


Open-Meteo - weather api app


// Install and initialize Vite for the project
Initialize Vite project
Create the following folder structure:
  - src/
    - index.html
    - main.js
    - api.js
    - weatherPage.js
    - forecastPage.js
    - styles.css
Create an .env file to store the API key securely


// .env file
VITE_API_KEY="your_open_meteo_api_key"

// Vite build process will inject the key from the environment variable


Import necessary modules (e.g., api.js, weatherPage.js, forecastPage.js)
Add event listeners for navigation between pages
Initialize the app and load the default page


Create a function fetchWeatherData(endpoint, params) {
    Construct the URL for the Open-Meteo API with the provided endpoint and params
    Fetch data from the API
    Return parsed JSON response
}


Create a function renderWeatherPage() {
    Fetch current weather data using fetchWeatherData(endpoint, params)
    Parse and display the following:
      - Temperature
      - Weather condition
    Add a "View Forecast" button with an event listener
      - On click, navigate to the forecast page
}


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


Add basic styles for layout, navigation, and data presentation
Include responsive design for mobile and desktop screens


Use Vite to bundle the application
Ensure the VITE_API_KEY from .env is injected into the build
Set up a production build command

*/