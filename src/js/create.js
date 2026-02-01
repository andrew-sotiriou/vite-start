import { validateInputs, showErrorMessage, hideErrorMessage } from './inputs.js'
import { fetchData } from './data.js'

export function createURLs(sValue, lValue) {
    const baseUrl = 'https://www.thecolorapi.com/id?hsl=';
    const values = Array.from({ length: 361 }, (_, i) => i);
    const urls = values.map(value => `${baseUrl}${value},${sValue}%,${lValue}%`);
    
    return urls;
}

export function createErrorMessage() {
    const errorMessage = document.createElement("div");
    errorMessage.setAttribute("id", "error-message");
    errorMessage.setAttribute("class", "hide");
    errorMessage.innerHTML = "You have an issue with one of your inputs";
    return errorMessage;
}

export function createInputs(value) {
    const inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", `${value}-input-container`);
    const inputText = document.createElement("p");
    inputText.innerHTML = `This is the ${value.toUpperCase()} input in %:`;
    inputContainer.appendChild(inputText);
    const input= document.createElement("input");
    input.setAttribute("id", `${value}-input-box`);
    input.setAttribute("type", 'number');
    input.setAttribute("placeholder", `52`);
    inputContainer.appendChild(input);
    return inputContainer;
}

export function createSubmitButton() {
    const submitContainer = document.createElement("div");
    submitContainer.setAttribute("class", "submit-container");
    const submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "submit-btn");
    submitBtn.innerHTML = `submit color values`;

    submitBtn.addEventListener('click', () => { 
        const sInputValue = document.getElementById("s-input-box").value;
        const lInputValue = document.getElementById("l-input-box").value;

        // Confirm that the s and l inputs are valid
        const areInputsValid = validateInputs(sInputValue, lInputValue);

        if (!areInputsValid) {
            showErrorMessage();
        } else {
            hideErrorMessage();
            // Call the API to fetch the data
            fetchData(sInputValue, lInputValue);
        }
    });
    submitContainer.appendChild(submitBtn);
    return submitContainer;
}