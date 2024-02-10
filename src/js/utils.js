export function createElement(type, props = {}, children = []){
    const element = document.createElement(type);

    // props: {textContent: "Hello World!", id: "header1", "data-product": 213, ...}
    Object.entries(props).forEach(([key, value])=> {
        if (~key.indexOf('-')) {
            element.setAttribute(key, value); //data attribute
        }else{
            element[key] = value
        }
    });

    children.forEach((child) => {
        element.appendChild(child);
    })
    return element;
}