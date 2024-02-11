import { createElement, fetchData, getLocation } from './utils';

const catApiKey = process.env.CAT_API_KEY;
const dogApiKey = process.env.DOG_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;

async function home() {
    try {
        const heroImage = createElement('img', {
            src: 'https://raw.githubusercontent.com/fireburn553/dog-cat-and-weather/main/src/images/close-up-portrait-beautiful-cat.webp', 
            alt: 'Dog and Cat Hero Image',
            className: "hero-image"
        });  
        const position = await getLocation();
        const weatherData = await fetchData(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApiKey}`)
        console.log(weatherData)
        const weatherElement = displayWeatherInfo(weatherData);

        const catData = await fetchData('https://api.thecatapi.com/v1/images/search?limit=1', catApiKey);
        const dogData = await fetchData('https://api.thedogapi.com/v1/images/search?limit=1', dogApiKey);

        const catElement = imageDiv(catData, 'cat-random-image', 'Random Cat Image Today! Enjoy');
        const dogElement = imageDiv(dogData, 'dog-random-image', 'Random Dog Image Today! Enjoy');

        const title = createElement('h2', { textContent: 'HOME' });

        return createElement('div', {}, [heroImage, title, catElement, dogElement, weatherElement]);
    } catch (error) {
        console.error('Error in home:', error);
        throw error; 
    }
}

export function imageDiv(data, className, text) {
    const picture = createElement('img', {
        src: data[0].url,
        alt: data[0].id,
        className: className,
    });

    const label = createElement('p', {
        textContent: text,
    });

    const container = createElement('div', { className: 'element-container' }, [picture, label]);

    return container;
}

function displayWeatherInfo(weatherData) {
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;

    const weatherInfoElement = createElement('p', {
        textContent: `Temperature: ${temperature}°C, Description: ${description}`,
    });

    return weatherInfoElement;
}

export default home;
