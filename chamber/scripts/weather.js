const weatherInfo = document.querySelector('.weather-info');
const current = document.querySelector('.current');
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const description = document.querySelector('figcaption');
const weatherForecastContainer = document.querySelector('.weather-forecast');
const apiKey = 'c8e24775a530c3c13e6c5c81a4f0e243';
const url = 'https://api.openweathermap.org/data/2.5/';

// Coordinates for Kamuela, Hawaii
const latitude = 20.0007;
const longitude = -155.5762;

async function fetchWeatherData() {
    const apiUrl = `${url}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
    const forecastUrl = `${url}forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(apiUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        displayWeather(currentData, forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(currentData, forecastData) {
    const heading = document.createElement('h2');
    heading.textContent = 'Current Weather';
    
    currentTemp.textContent = `${Math.round(currentData.main.temp)}°F`;
    
    const iconUrl = `https://openweathermap.org/img/w/${currentData.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', currentData.weather[0].description);
    description.textContent = currentData.weather[0].description;

    current.appendChild(heading);
    current.appendChild(currentTemp);
    current.appendChild(weatherIcon);
    current.appendChild(description);

    displayForecast(forecastData);
}

function displayForecast(forecastData) {
    const forecastHeader = document.createElement('h3');
    forecastHeader.textContent = 'Weather Forecast';
    weatherForecastContainer.appendChild(forecastHeader);

    for (let i = 0; i < 3; i++) {
        const forecastItem = document.createElement('div');
        const icon = document.createElement('img');
        const iconUrl = `https://openweathermap.org/img/w/${forecastData.list[i].weather[0].icon}.png`;
        const temp = Math.round(forecastData.list[i].main.temp);

        icon.setAttribute('src', iconUrl);
        icon.setAttribute('alt', forecastData.list[i].weather[0].description);
        icon.setAttribute('width', 50);
        icon.setAttribute('height', 50);
        icon.setAttribute('loading', 'lazy');
        
        forecastItem.classList.add('forecast-data');
        forecastItem.innerHTML = `<br>${temp}°F`;
        forecastItem.appendChild(icon);
        weatherForecastContainer.appendChild(forecastItem);
    }
}

fetchWeatherData();
