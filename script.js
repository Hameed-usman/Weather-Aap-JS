// Targeting necessary elements
const weatherCard = document.querySelector(".weather-card");
const cityCard = document.querySelector(".card");
const locationElement = document.querySelector(".location"); // Location display element
const weather_img = document.querySelector(".weather_img"); // Image placeholder element

function displayWeatherCard() {
    weatherCard.style.display = "block";
    cityCard.style.display = "none";
}

// Targeting the card input class where the user writes the location/city
const cardInput = document.querySelector(".cardInput");

cardInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        const city = cardInput.value; // Get the input value
        if (city) { // Check if city is not empty
            await checkWeather(city); // Fetch weather data
            displayWeatherCard(); // Show weather card
        } else {
            alert("Please enter a city name."); // Alert if input is empty
        }
    }
});

// Functionality for the back arrow
const backButton = document.querySelector("#backArrow-icon");
backButton.addEventListener("click", () => {
    weatherCard.style.display = "none";
    cardInput.value = "";
    cityCard.style.display = "block";
});

// Function to fetch weather data from the OpenWeatherMap API
async function checkWeather(city) {
    const api_key = "ab3e1415c476854e26ecb105ab1f831f";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`; // Using metric units for Celsius
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`City not found: ${response.statusText}`); // Handle errors
        }
        const weather_data = await response.json();
        console.log(weather_data); // Debug: Check the weather data

        // Update UI with weather data
        locationElement.innerText = `📍 ${weather_data.name}, ${weather_data.sys.country}`; // Update location
        document.querySelector(".temperature").innerText = `${Math.round(weather_data.main.temp)}°C`; // Update temperature
        document.querySelector(".description").innerText = weather_data.weather[0].description; // Update weather description

        // Change the weather image based on the condition
        switch (weather_data.weather[0].main) {
            case 'Clear':
                weather_img.src = "./images/clear.png"; // Image for Clear weather
                break;
            case 'Clouds': // Use 'Clouds' instead of 'Cloud'
                weather_img.src = "./images/cloud.png"; // Image for Cloudy weather
                break;
            case 'Rain':
                weather_img.src = "./images/rain.png"; // Image for Rainy weather
                break;
            case 'Mist':
                weather_img.src = "images/mist.png"; // Image for Misty weather
                break;
            case 'Snow':
                weather_img.src = "./images/snow.png"; // Image for Snowy weather
                break;
            
        }
        

    } catch (error) {
        alert(error.message); // Alert the error message
        console.error(error); // Log the error for debugging
    }
}


