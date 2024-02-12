// dogRouter.js
import { createElement } from './utils';

export function initDogRouter(dogView) {
    function updateDogView(newView) {
        dogView.innerHTML = '';
        dogView.appendChild(newView);
    }

    function hashToDogRoute(hash) {
        const dogDetailsMatch = hash.match(/^#\/dog\/details\/(\w+)$/);
        if (dogDetailsMatch) {
            const breedId = dogDetailsMatch[1];
            // Handle the dog details view (replace this with your actual implementation)
            updateDogView(createElement('h3', { textContent: `Dog Details for Breed ID: ${breedId}` }));
        } else {
            console.log('else')
        }
    }

    const defaultHash = window.location.hash || '#/dog';
    console.log(defaultHash)
    hashToDogRoute(defaultHash);

    window.addEventListener('hashchange', (evt) => {
        const newUrl = new URL(evt.newURL);
        const hash = newUrl.hash;

        hashToDogRoute(hash);
    });
}