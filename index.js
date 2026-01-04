localStorage.setItem("passwords", JSON.stringify([]));

const buttonGeneratorPassword = document.querySelector("#button-generator-password");
const showPassword = document.querySelector("#password");
const lengthPassowrd = document.querySelector("[data-range]");
const range = document.querySelector("#range");

const buttonChangeTheme = document.querySelector("#button-change-theme");

class Generator {
    #length
    constructor(length) {
        this.#length = length;
        this.combinations = {
            numbers: "1234567890",
            letterLower: "abcdefghijklmnopqrstuvwxyz",
            symbols: "!@#$%&()-_+"
        }
    }

    getSingleValueString(string) {
        const random = Math.floor(Math.random() * string.length);
        string = string.split("");
        return string[random];
    }

    generator() {

        let chars = [];
        const { numbers, letterLower, symbols } = this.combinations;

        for (let i = 0; i < this.#length; i++) {
            const values = [
                this.getSingleValueString(numbers),
                this.getSingleValueString(letterLower),
                this.getSingleValueString(letterLower.toUpperCase()),
                this.getSingleValueString(symbols)
            ];
            const randomValue = values[Math.floor(Math.random() * values.length)];
            if (chars.includes(randomValue)) {
                i--;
                continue;
            }
            chars.push(randomValue)
        }

        const password = chars.join("");
        showPassword.textContent = `${password}`;
        showPassword.classList.add("password-active");
        const storage = JSON.parse(localStorage.getItem("passwords"));
        storage.push(password);
        localStorage.setItem("passwords", JSON.stringify(storage));

    }
}

lengthPassowrd.addEventListener("input", () => {
    range.textContent = lengthPassowrd.value
    lengthPassowrd.value = lengthPassowrd.value;
});

buttonGeneratorPassword.addEventListener("click", () => {
    const password = new Generator(lengthPassowrd.value);
    password.generator();
});

