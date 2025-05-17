// Step 1: Select necessary elements from the DOM
const searchBox = document.querySelector('.search input'); // Input where user types the city name
const searchButton = document.getElementById('search-img'); // Search button (image)
const tempElement = document.querySelector('.showing h1'); // Temperature display
const cityElement = document.querySelector('.showing h2'); // City name display
const humidityElement = document.querySelector('.humidity p'); // Humidity display
const windSpeedElement = document.querySelector('.wind-speed p'); // Wind speed display
const weatherIcon = document.getElementById('cloud-img'); // Weather icon (cloud image)

// Step 2: API Key and Base URL (you need to use your own API key from openweathermap.org)
const apiKey = "5f0948c84ceb8a8eba84e1ff18152fc3"; 
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; // Base URL for weather data

// Step 3: Function to fetch and display weather data
async function getWeather(city) {
    const response = await fetch(apiURL + city + `&appid=${apiKey}`); // Fetch weather for given city
    if (response.status == 404) {
        alert("City not found!"); // Show alert if city name is invalid
        return;
    }
    const data = await response.json(); // Convert response to JSON object

    // Step 4: Update UI with the data from API
    tempElement.innerHTML = `${Math.round(data.main.temp)} °C`; // Display temperature
    cityElement.innerHTML = data.name; // Display city name
    humidityElement.innerHTML = `${data.main.humidity}%<br><span>Humidity</span>`; // Display humidity
    windSpeedElement.innerHTML = `${data.wind.speed} km/hr<br><span>Wind-speed</span>`; // Display wind speed

    // Step 5: Change weather icon based on weather condition
    const condition = data.weather[0].main.toLowerCase(); // E.g., "Clear", "Clouds", "Rain"
    if (condition.includes("cloud")) {
        weatherIcon.src = "images/clouds.png";
    } else if (condition.includes("clear")) {
        weatherIcon.src = "images/clear.png";
    } else if (condition.includes("rain")) {
        weatherIcon.src = "images/rain.png";
    } else if (condition.includes("mist")) {
        weatherIcon.src = "images/mist.png";
    } else {
        weatherIcon.src = "images/clouds.png"; // Default icon
    }
}

// Step 6: Add event listener to search button
searchButton.addEventListener('click', () => {
    const city = searchBox.value.trim(); // Get the input value and remove extra spaces
    if (city !== "") {
        getWeather(city); // Call the function if input is not empty
    }
});
