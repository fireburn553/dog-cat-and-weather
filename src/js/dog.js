// Import required functions from utils.js
import { createElement, fetchData, toggleLike } from './utils';

async function dog() {
    let breedLinks = [];
    let linksBreed = ""
    let dog = ""

    const dogTitle = createElement('h2', {textContent: 'DOG BREED'})

    try {
        const breeds = await fetchData(`https://api.thedogapi.com/v1/breeds`);
        breeds.forEach((breed) => {
            
            const breedId = `dog-${breed.id}`;

            const isLiked = localStorage.getItem(breedId) === 'true';

            const breedLink = createElement('div', { className: 'breed-item' }, [
                createElement('a', {
                    href: `#/dog/details/${breed.id}`,
                    textContent: breed.name
            }, []),
            createElement('button', {
                className: 'like-button',
                textContent: isLiked ? 'Unlike ⭐️' : 'Like 🌟',
                onclick: () => toggleLike(breedId),
            }, []),
        ]);

            breedLinks.push(breedLink);
        });

        linksBreed = createElement('div', {className: 'links'}, breedLinks)
    } catch (error) {
        console.error('Error in dog:', error);
        throw error;
    }
    return createElement('div', {className: 'link-container'},  [dogTitle, linksBreed, dog]);
}

export default dog;