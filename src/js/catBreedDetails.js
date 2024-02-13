// Import required functions from utils.js
import { createElement, fetchData } from './utils';
const catApiKey = process.env.CAT_API_KEY;

async function catDetails(id) {
    try {

    const catBreedData = await fetchData(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}&api_key=${catApiKey}`)
    
    const breed = catBreedData[0].breeds[0]
    
    const breedImage = createElement('img', {className: 'breed-img',src: catBreedData[0].url, alt: breed.name+' picture'}
    )
    // Handle undefined or null values with default values or an empty string
    const name = breed.name || 'Unknown Breed';
    const origin = breed.origin || 'Unknown Origin';
    const weight = breed.weight ? breed.weight.metric : 'Unknown Weight';
    const temperament = breed.temperament || 'Unknown Temperament';
    const lifeSpan = breed.life_span || 'Unknown Life Span';
    const description = breed.description || 'No description available for this breed.';

    const breedName = createElement('h3', {textContent: name})
    // Create a generic description paragraph
    const descriptionParagraph = createElement('p', {
        textContent: `The ${name} is a fascinating cat breed with a rich history and unique characteristics. Originating from ${origin}, this breed typically weighs around ${weight} and has a temperament described as ${temperament}. With a life span of ${lifeSpan}, the ${name} is known for its distinctive traits. ${description}`,
    });
    
    return createElement('div', {className: 'breed-details'}, [breedImage, breedName, descriptionParagraph]  );
    }catch (error){
        console.error('Error in catDetails:', error);
        throw error; 
    }
}

export default catDetails;

