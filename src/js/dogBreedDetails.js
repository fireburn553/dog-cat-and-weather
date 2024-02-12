// Import required functions from utils.js
import { createElement, fetchData } from './utils';
const dogApiKey = process.env.DOG_API_KEY;

async function dogDetails(id) {
    try {

    const dogBreedData = await fetchData(`https://api.thedogapi.com/v1/images/search?breed_ids=${id}&api_key=${dogApiKey}`)
    console.log(dogBreedData[0])

    return createElement('div', {className: 'breed-details', textContent:`Hello Breeds ${id}`}  );
    }catch (error){
        console.error('Error in home:', error);
        throw error; 
    }
}

export default dogDetails;

