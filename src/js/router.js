import { createElement } from './utils';

export function initRouter(mainView) {
    function updateView(newView) {
        mainView.innerHTML = '';
        mainView.appendChild(newView);
    }

  function hashToRoute(hash) {
    switch (hash) {
        case '#/home':
            updateView(createElement('h3', { textContent: 'HOME' }));
            break;

        case '#/dog':
            updateView(createElement('h3', { textContent: 'DOG' }));
            break;

        case '#/cat':
            updateView(createElement('h3', { textContent: 'CAT' }));
            break;

        case '#/weather':
            updateView(createElement('h3', { textContent: 'WEATHER' }));
            break;

        case '#/join':
            updateView(createElement('h3', { textContent: 'JOIN' }));
            break;
        
        default:
            updateView(createElement('h3', { textContent: '404 Page Not Found' }));
            break;
    }
  }

    const defaultHash = window.location.hash || '#/page1';
    hashToRoute(defaultHash);

    window.addEventListener('hashchange', (evt) => {
        const newUrl = new URL(evt.newURL);
        const hash = newUrl.hash;

        hashToRoute(hash);
    });
}