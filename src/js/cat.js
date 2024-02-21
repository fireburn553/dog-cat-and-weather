// Import required functions from utils.js
import { createElement, fetchData, toggleLike } from './utils';

async function cat() {
    let breedLinks = [];
    let linksBreed = ""
    let cat = ""

    const catTitle = createElement('h2', {textContent: 'CAT BREED'})

    try {
        const breeds = await fetchData(`https://api.thecatapi.com/v1/breeds`);
        breeds.forEach((breed) => {
            const breedId = `cat-${breed.id}`;

            const isLiked = localStorage.getItem(breedId) === 'true';

            const breedLink = createElement('div', { className: 'breed-item' }, [
                createElement('a', {
                    href: `#/cat/details/${breed.id}`,
                    textContent: breed.name,
                }, []),
                createElement('button', {
                    className: 'like-button',
                    textContent: isLiked ? 'Unlike ⭐️' : 'Like 🌟',
                    onclick: () => toggleLike(breedId),
                }, []),
            ]);

            breedLinks.push(breedLink);
        });

        linksBreed = createElement('div', { className: 'links' }, breedLinks);
    } catch (error) {
        console.error('Error in cat:', error);
        throw error;
    }

    return createElement('div', { className: 'link-container' }, [catTitle, linksBreed, cat]);
}

export default cat;