import { createURLs } from './create.js'

function reduceResults(results) {
    return Object.values(
        results.reduce((acc, item) => {
            if (!acc[item.name] || item.distance < acc[item.name].distance) {
                acc[item.name] = item;
            }
            return acc;
        }, {})
    );
}

function filterResults(results) {
        const finalList = reduceResults(results);
        return finalList;
}

function createSwatchBox(list) {
    const swatchBox = document.createElement("div");
    swatchBox.setAttribute("class", `swatch-box`);
    
    const swatchImgTag = document.createElement("img");
	swatchImgTag.src = list.image;
	swatchImgTag.setAttribute("class", 'swatch-image');
    swatchBox.appendChild(swatchImgTag);

    const colorName = document.createElement("p");
    colorName.setAttribute("class", 'name-text');
    colorName.innerHTML = `Color: <br /> ${list.name}`;
    swatchBox.appendChild(colorName);

    const rgbValue = document.createElement("p");
    rgbValue.setAttribute("class", 'rgb-value');
    rgbValue.innerHTML = `RGB: <br /> ${list.rgb}`;
    swatchBox.appendChild(rgbValue);

    return swatchBox;
}

function displayResults(finalList) {
    const dataDiv = document.getElementById("data-area");
    dataDiv.innerHTML = "";
    dataDiv.classList.replace("hide", "flex-show");
    Object.keys(finalList).forEach(index => {
        dataDiv.appendChild(createSwatchBox(finalList[index]));
    });
}

export async function fetchData(sValue, lValue){
    // Create a function to create all the URL endpoints for h from 0 to 360
    const urls = createURLs(sValue, lValue);
    const promises = urls.map(url => fetch(url).then(response => response.json()));

    try {
        const results = await Promise.all(promises);
        // maybe a Promise.allSettled would be better?

        // First step will be to iterate through everything returned and create an object of just the data we need
        // color name, rgb, image, and distance
        const filteredResults = [];
        Object.keys(results).forEach(outerKey => {
            const innerObject = results[outerKey];
            filteredResults[outerKey] = { 
                name: innerObject.name.value,
                distance: innerObject.name.distance,
                rgb: innerObject.rgb.value,
                image: innerObject.image.bare
            };
        });

        // Call a function to filter everything
        // in the situation where there is more than one color use distance to determine the closest color
        // For example: Two reds of distance 0 and 10 should only have red with distance of 0 in the final list
        const finalList = filterResults(filteredResults);
        
        // No we have the final list -> pass it over to render the stuff on the page
        displayResults(finalList);        
    } catch (error) {
        console.error("One of the API calls failed:", error);
        const dataDiv = document.getElementById("data-area");
        dataDiv.innerHTML = 'One of the API calls failed';
        dataDiv.classList.replace("hide", "show");
    }
}