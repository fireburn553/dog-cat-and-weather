// Import required functions from utils.js
import { createElement, fetchData } from './utils';

async function cat() {
    let breedLinks = [];
    let linksBreed = ""
    let cat = ""

    const catTitle = createElement('h3', {textContent: 'CAT BREED'})

    try {
        const breeds = await fetchData(`https://api.thecatapi.com/v1/breeds`);
        breeds.forEach((breed) => {
            const breedLink = createElement('a', {
                href: `#/cat/details/${breed.id}`,
                textContent: breed.name
            }, []);

            breedLinks.push(breedLink);
        });

        linksBreed = createElement('div', {className: 'links'}, breedLinks)
    } catch (error) {
        console.error('Error in dog:', error);
        throw error;
    }
    return createElement('div', {className: 'link-container'},  [catTitle, linksBreed, cat]);
}

export default cat;