import "./style.scss";

const jokeTextDisplay = document.querySelector(".current-joke__text");
const buttonNewJoke = document.querySelector("#new-joke");
const buttonSaveJoke = document.querySelector("#save-joke");
const savedJokesList = document.querySelector("saved-jokes__list");

let savedJokes = JSON.parse(localStorage.getItem("myJokes")) || [];
