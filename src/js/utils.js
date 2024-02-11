export function createElement(type, props = {}, children = []) {
    const element = document.createElement(type);

    // Set attributes
    Object.entries(props).forEach(([key, value]) => {
        if (key === 'textContent') {
            element.textContent = value;
        } else if (key.includes('-')) {
            element.setAttribute(key, value);
        } else {
            element[key] = value;
        }
    });

    // Append children
    children.forEach((child) => {
        if (child instanceof Node) {
            element.appendChild(child);
        } else {
            element.appendChild(document.createTextNode(String(child)));
        }
    });

    return element;
}


export async function fetchData(apiEndpoint, key = '') {
    try {
        const url = key ? `${apiEndpoint}&api_key=${key}` : apiEndpoint;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position);
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
}