//Instantiate DOM elements
const container = document.getElementsByClassName('flex-container');
const showPass = document.getElementById('showPass');
const lenghtInput = document.getElementById('lenght');
const charactersUpper = document.getElementById('characters-upper');
const charactersLower = document.getElementById('characters-lower');
const charactersNum = document.getElementById('characters-num');
const specialsCharacters = document.getElementById('specials-characters');
const btnGeneratePass = document.getElementById('btn-generatePass');
const btnCopyPass = document.getElementById('btn-copyPass');

//Set of characters used to generate passwords
//Uppercase letters
const upperLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
//Lowercase letters
const lowerLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//Numbers
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//Special characters
const specials = ['!', '@', '#', '$', '%', '&', '*', '.', '_', '+'];

//Function that generates passwords
function generatePass() {

    //Creates a variable to store the character set, depending on the options checked by the user (A-Z, a-z, 0-9, specials)
    let setCharacters = [];

    //Create variable to store the generated password
    let pass = '';

    //Get the lenght of the password
    let maxCharacters = lenghtInput.value;

    //Check if the user has selected at least one option, if not, check the first two options (A-Z, a-z)
    if (!charactersUpper.checked && !charactersLower.checked
        && !charactersNum.checked && !specialsCharacters.checked) {
        charactersUpper.checked = true;
        charactersLower.checked = true;
    }

    //If "A-Z" is selected, add charactersUpper to setCharacters
    if (charactersUpper.checked) {
        setCharacters = setCharacters.concat(upperLetters);
    }

    //If "a-z" is selected, add charactersLower to setCharacters
    if (charactersLower.checked) {
        setCharacters = setCharacters.concat(lowerLetters);
    }

    //If "0-9" is selected, add numbers to setCharacters
    if (charactersNum.checked) {
        setCharacters = setCharacters.concat(numbers);
    }

    //If "specials" is selected, add specials to setCharacters
    if (specialsCharacters.checked) {
        setCharacters = setCharacters.concat(specials);
    }

    //Generate the password
    for (let i = 0; i < maxCharacters; i++) {
        pass += setCharacters[Math.floor(Math.random() * setCharacters.length)];
    }

    //Show the generated password
    showPass.innerText = pass;
    //Clean the array
    setCharacters = [];
}

//Function that copies the generated password to the clipboard
function copyPassword() {

    //Check if the generated password is empty
    if (showPass.value !== '') {

        //Copy the generated password to the clipboard
        navigator.clipboard.writeText(showPass.value);

        //Disable the Copy button
        btnCopyPass.disabled = true;

        //Create the copy popup
        const copyPopup = document.createElement('h3');
        copyPopup.innerText = 'Contraseña copiada al portapapeles.';
        copyPopup.style.backgroundColor = '#ffffcc';
        copyPopup.style.color = '#07722b';
        copyPopup.style.textAlign = 'center';
        copyPopup.style.position = 'absolute';
        copyPopup.style.top = '50%';
        copyPopup.style.left = '50%';
        copyPopup.style.transform = 'translate(-50%, -50%)';
        copyPopup.style.padding = '20px';
        copyPopup.style.borderRadius = '5px';
        copyPopup.style.zIndex = '9999';
        copyPopup.style.boxShadow = '0px 0px 10px 0px rgba(0, 0, 0, 0.5)';
        copyPopup.style.fontFamily = 'Helvetica, sans-serif';
        copyPopup.style.fontSize = '1rem';


        //Add the copy popup to the container
        container[0].appendChild(copyPopup);

        //Remove the copy popup after 2 seconds and enable the Copy button
        setTimeout(() => {
            copyPopup.remove();
            btnCopyPass.disabled = false;
        }, 2000);

    }
}

//Generate button click event
btnGeneratePass.addEventListener('click', () => {
    generatePass();
});

//Copy button click event (only if the generated password is not empty)
btnCopyPass.addEventListener('click', () => {
    copyPassword();
});

//Call the generatePass function when the app loads
window.load(generatePass());


