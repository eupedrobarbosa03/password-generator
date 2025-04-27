const buttonGeneratorPassword = document.querySelector("#button-generator-password");
const password = document.querySelector("#password");
const passwordLenght = document.querySelector("#lenght-password");
const messageError = document.querySelector("#message-error");

const themeProperties = {
    changeTheme: document.querySelector("#button-change-theme"),
    mainTheme: document.querySelector("#main-container"),
    titleTheme: document.querySelector("#result-password h2"),
    resultBoxTheme: document.querySelector("#result-password"),
    inputTheme: document.querySelector("#lenght-password"),
    detailsBoxTheme: document.querySelector("#insert-details-password")
}

function randomChoiceOneCharacterer(possibilityTarget) {
    possibilityTarget = possibilityTarget.split("");

    let randomValue = Math.floor(Math.random() * possibilityTarget.length);
    let value = possibilityTarget[randomValue];

    return value;
}

function textError(element, text) {
    element.textContent = text;
}

class Generator {
    constructor(passwordLenght_) {
        this.passwordLenght_ = passwordLenght_;
        this.passwordCombinations = {
            numbers: "1234567890",
            letterLower: "abcdefghijklmnopqrstuvwxyz",
            letterUpper: "", // Convert lower to Upper;
            symbols: "!@#$&()-"
        }
    }

    password() {

        this.passwordLenght_ = Number(this.passwordLenght_);

        if (!this.passwordLenght_ || this.passwordLenght_ < 4 || this.passwordLenght_ > 30) {
            if (!passwordLenght.value) {
                password.classList.remove("password-active");
                textError(messageError, "Minimum Lenght: 4 and Maximum Lenght: 30.")
            }
            messageError.classList.add("message-error-active");
            return;
        }

        messageError.classList.remove("message-error-active");

        this.passwordCombinations.letterUpper = this.passwordCombinations.letterLower.toUpperCase();

        const {numbers, letterLower, letterUpper, symbols} = this.passwordCombinations;

        const possibilities = [numbers, letterLower, letterUpper, symbols];
        let listPassword = []; //convert to string;
        

        for (let i = 0; i < this.passwordLenght_; i++) {
            let possibilitiesRandom = Math.floor(Math.random() * possibilities.length);
            switch(possibilitiesRandom) {
                case 0: //numbers
                    listPassword.push(randomChoiceOneCharacterer(possibilities[0]));
                    break;
                case 1: //letters lower
                    listPassword.push(randomChoiceOneCharacterer(possibilities[1]));
                    break;
                case 2: //letters upper
                    listPassword.push(randomChoiceOneCharacterer(possibilities[2])); 
                    break;
                case 3: //symbols
                    listPassword.push(randomChoiceOneCharacterer(possibilities[3]));
                    break;
            }
        }

        const passwordPost = listPassword.join("");
        password.classList.add("password-active");
        password.textContent = `${passwordPost}`;

    }
}

function generator() {
    const passwordGet = new Generator(passwordLenght.value);
    passwordGet.password();
}

buttonGeneratorPassword.addEventListener("click", () => {
    generator();
})

passwordLenght.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        generator();
    }

    if (e.key === "Delete") {
        password.classList.remove("password-active");
    }
})

themeProperties.changeTheme.addEventListener("click", () => {

    Object.entries(themeProperties).forEach(([, valor]) => {
        valor.classList.toggle("change-theme")
    })
    
})