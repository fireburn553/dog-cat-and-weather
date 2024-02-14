// weather.js
import { createElement, fetchData, getLocation } from './utils';
const weatherApiKey = process.env.WEATHER_API_KEY;
async function weather() {

    const position = await getLocation();

    const weatherTitle = createElement('h3', { textContent: 'WEATHER' });
    const weatherContainer = createElement('div', { className: 'weather-container' });

    try {
        // Fetch weather data
        const weatherData = await fetchData(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely&units=metric&appid=${weatherApiKey}`);

        // Current weather
        const currentWeather = weatherData.current;
        const currentWeatherElement = createElement('div', { className: 'current-weather' }, [
            createElement('h4', { textContent: 'Current Weather' }),
            createElement('p', { textContent: `Temperature: ${currentWeather.temp}°C` }),
            createElement('p', { textContent: `Description: ${currentWeather.weather[0].description}` }),
            createElement('img', { src: `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`, alt: 'Weather Icon' })
        ]);

        // Hourly weather
        const hourlyWeather = weatherData.hourly.slice(0, 5); // Display the next 5 hours
        const hourlyWeatherElements = hourlyWeather.map((hour) => createElement('div', { className: 'hourly-weather' }, [
            createElement('p', { textContent: `Time: ${new Date(hour.dt * 1000).toLocaleTimeString()}` }),
            createElement('p', { textContent: `Temperature: ${hour.temp}°C` }),
            createElement('p', { textContent: `Description: ${hour.weather[0].description}` }),
            createElement('img', { src: `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`, alt: 'Weather Icon' })
        ]));

        // Daily weather
        const dailyWeather = weatherData.daily.slice(0, 5); // Display the next 3 days
        const dailyWeatherElements = dailyWeather.map((day) => createElement('div', { className: 'daily-weather' }, [
            createElement('p', { textContent: `Date: ${new Date(day.dt * 1000).toLocaleDateString()}` }),
            createElement('p', { textContent: `Max Temperature: ${day.temp.max}°C` }),
            createElement('p', { textContent: `Min Temperature: ${day.temp.min}°C` }),
            createElement('p', { textContent: `Description: ${day.weather[0].description}` }),
            createElement('img', { src: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`, alt: 'Weather Icon' })
        ]));

        // Append all elements to the weather container
        weatherContainer.append(currentWeatherElement, ...hourlyWeatherElements, ...dailyWeatherElements);

    } catch (error) {
        console.error('Error:', error);
        throw error;
    }

    return createElement('div', { className: 'weather-container' }, [weatherTitle, weatherContainer]);
}

export default weather;