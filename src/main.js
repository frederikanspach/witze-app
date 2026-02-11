import "./style.scss";
import { FavoriteJokes } from "./FavoriteJokes.js";

const JOKE_URL = "https://witzapi.de/api/joke?language=de";
const jokeTextDisplay = document.querySelector(".current-joke__text");
const buttonNewJoke = document.querySelector("#new-joke");
const buttonSaveJoke = document.querySelector("#save-joke");
let newJoke;

async function fetchJoke(jokeUrl) {
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

function displayJoke(newJoke) {
  jokeTextDisplay.textContent = newJoke;

  jokeTextDisplay.classList.remove("is-animating");
  void jokeTextDisplay.offsetWidth;
  jokeTextDisplay.classList.add("is-animating");
}

async function handleNewJokeClick() {
  newJoke = await fetchJoke(JOKE_URL);
  displayJoke(newJoke);
}

function displayFavoriteJokes() {
  const favoriteJokes = FavoriteJokes.getAll();
  const savedJokesList = document.querySelector(".saved-jokes__list");

  savedJokesList.innerHTML = "";

  if (favoriteJokes.length === 0) {
    savedJokesList.innerHTML = `<p class="saved-jokes__empty">Noch keine Witze gespeichert.</p>`;
    return;
  }

  favoriteJokes.forEach((joke) => {
    const listItem = document.createElement("div");
    listItem.classList.add("saved-jokes__list-item");

    listItem.innerHTML = `
      <p class="saved-jokes__item-text">${joke}</p>
      <button class="saved-jokes__delete-icon" aria-label="Witz löschen">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    `;

    const deleteBtn = listItem.querySelector(".saved-jokes__delete-icon");
    deleteBtn.addEventListener("click", () => {
      FavoriteJokes.delete(joke);
      displayFavoriteJokes();
    });

    savedJokesList.appendChild(listItem);
  });
}

function handleSaveJokeClick() {
  const success = FavoriteJokes.save(newJoke);

  if (!success) {
    console.log("Witz ist schon gespeichert!");
    return;
  }

  displayFavoriteJokes();
}

buttonNewJoke.addEventListener("click", handleNewJokeClick);
buttonSaveJoke.addEventListener("click", handleSaveJokeClick);

handleNewJokeClick();
displayFavoriteJokes();
