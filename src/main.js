import "./style.scss";
import { FavoriteJokes } from "./FavoriteJokes.js";

const JOKE_URL = "https://witzapi.de/api/joke?language=de";
let newJoke;

const jokeTextDisplay = document.querySelector(".current-joke__text");
const buttonNewJoke = document.querySelector("#new-joke");
const buttonSaveJoke = document.querySelector("#save-joke");
const buttonTheme = document.querySelector("#button-theme");
const buttonDeleteStorage = document.querySelector("#delete-storage");

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
  // restart css animation hack
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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5" />
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

if (localStorage.getItem("theme") == "light") {
  document.body.classList.add("light-mode");
}

buttonTheme.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

buttonDeleteStorage.addEventListener("click", () => {
  if (confirm("Möchtest du alle Witze und Einstellungen löschen?")) {
    localStorage.clear();
    displayFavoriteJokes();
    document.body.classList.remove("light-mode");
  }
});

buttonNewJoke.addEventListener("click", handleNewJokeClick);
buttonSaveJoke.addEventListener("click", handleSaveJokeClick);

handleNewJokeClick();
displayFavoriteJokes();
