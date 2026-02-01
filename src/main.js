import './css/style.css'
import { createErrorMessage, createInputs, createSubmitButton } from './js/create.js'

function init(){
    const appTag = document.getElementById('app');
    const inputContainer = document.createElement("div");
    inputContainer.setAttribute("class", "input-container");
    
    const sContainer = createInputs('s');
    const lContainer = createInputs('l');
    
    inputContainer.appendChild(sContainer);
    inputContainer.appendChild(lContainer);

    const submitContainer = createSubmitButton();
    inputContainer.appendChild(submitContainer);

    appTag.appendChild(inputContainer);

    const errorMessage = createErrorMessage();
    appTag.appendChild(errorMessage);

    const dataArea = document.createElement("div");
    dataArea.setAttribute("id", "data-area");
    dataArea.setAttribute("class", "hide");

    appTag.appendChild(dataArea);
}

init();