// Weather condition to background image URL mapping
const weatherBackgrounds = {
    'Thunderstorm': 'Images/Thunderstorm.jpg',
    'Rain': 'Images/Rain.jpg',
    'Snow': 'Images/Snow.jpg',
    'Clear': 'Images/Clear.jpg',
    'Clouds': 'Images/Clouds.jpg',
    'Haze': 'Images/Haze.jpg',
    'Mist': 'Images/Mist.jpg'
};

const citynone = document.getElementById('citycont');
const tempnone = document.getElementById('tempcont');

// Function to fetch weather data
function fetchWeather(location) {
    const API_KEY = 'e57d13eceb4c94003055e70515529345';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            // Update current weather data
            const tempCelsius = Math.round(data.main.temp - 273.15);

            document.getElementById('currentTemp').textContent = tempCelsius + ' °C';
            document.getElementById('currentWeather').textContent = data.weather[0].description;
            document.getElementById('currentHumidity').textContent = data.main.humidity + '%';
            document.getElementById('currentWind').textContent = data.wind.speed + ' m/s';

            // Update city name
            document.getElementById('cityName').textContent = data.name + ', ' + data.sys.country;

            // Set background image based on weather condition
            const weatherCondition = data.weather[0].main;
            document.querySelector('.cityforecast').style.backgroundImage = `url('${weatherBackgrounds[weatherCondition]}')`;
        })
        .catch(error => {console.error('Error fetching weather data:', error);
        const cityforecast =  document.querySelector('.cityforecast');
        citynone.style.display = 'none';
        tempnone.style.display = 'none';
        cityforecast.style.backgroundImage = 'none';

        cityforecast.classList.add('error404')});
}

document.addEventListener('DOMContentLoaded', function () {
    const citynone = document.getElementById('citycont');
    const tempnone = document.getElementById('tempcont');

    const searchForm = document.getElementById('searchForm');

    // Event listener for form submission
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        const searchInput = document.getElementById('searchInput');
        const location = searchInput.value.trim(); // Get the value from the input field
        if (location) {
            fetchWeather(location); // Fetch weather data for the entered location
        } else {
            alert('Please enter a location.'); // Show an alert if the input field is empty
        }
    });


    
    
    // Fetch initial weather data for a default location (e.g., Melbourne, AU)
    fetchWeather('Delhi');
});
