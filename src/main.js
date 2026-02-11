import "./style.scss";
import { FavoriteJokes } from "./FavoriteJokes.js";

const jokeUrl = "https://witzapi.de/api/joke?language=de";
const jokeTextDisplay = document.querySelector(".current-joke__text");
const buttonNewJoke = document.querySelector("#new-joke");
const buttonSaveJoke = document.querySelector("#save-joke");
let newJoke;

async function getJoke(jokeUrl) {
  console.log("Hole Joke von: " + jokeUrl);

  try {
    const response = await fetch(jokeUrl);

    if (!response.ok) {
      throw new Error(`Server-Fehler: ${response.status}`);
    }

    const body = await response.json();
    return body[0].text;
  } catch (error) {
    console.log(error.message);
    return "Ups! Kein Witz verfügbar. Prüfe deine Verbindung.";
  }
}

function appendJoke(newJoke) {
  jokeTextDisplay.textContent = newJoke;
}

async function handleNewJokeClick() {
  newJoke = await getJoke(jokeUrl);
  appendJoke(newJoke);
}

function handleSaveJokeClick() {
  const success = FavoriteJokes.save(newJoke);

  if (success) {
    console.log("Witz gespeichert: ", newJoke);
  } else {
    console.log("Witz ist schon gespeichert!");
  }
}

buttonNewJoke.addEventListener("click", handleNewJokeClick);
handleNewJokeClick();

buttonSaveJoke.addEventListener("click", handleSaveJokeClick);

console.log("Gespeicherte Witze beim Start:", FavoriteJokes.getAll());
