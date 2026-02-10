import "./style.scss";

// const buttonSaveJoke = document.querySelector("#save-joke");
// const savedJokesList = document.querySelector("saved-jokes__list");
// let savedJokes = JSON.parse(localStorage.getItem("myJokes")) || [];

const jokeUrl = "https://witzapi.de/api/joke?language=de";
const jokeTextDisplay = document.querySelector(".current-joke__text");
const buttonNewJoke = document.querySelector("#new-joke");
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

buttonNewJoke.addEventListener("click", handleNewJokeClick);
handleNewJokeClick();
