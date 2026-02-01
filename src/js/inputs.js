export function validateInputs(sInputValue, lInputValue) {
    if (!sInputValue || !lInputValue) {
        return false;
    }

    if (sInputValue > 100 || lInputValue > 100) {
        return false;
    }

    return true;
}

export function showErrorMessage() {
    const errorDiv = document.getElementById("error-message");
    errorDiv.classList.replace("hide", "show");
}

export function hideErrorMessage() {
    const errorDiv = document.getElementById("error-message");
    errorDiv.classList.replace("show", "hide");
}