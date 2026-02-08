import "./style.scss";

const jokeTextDisplay = document.querySelector(".current-joke__text");
const buttonNewJoke = document.querySelector("#new-joke");
const buttonSaveJoke = document.querySelector("#save-joke");
const savedJokesList = document.querySelector("saved-jokes__list");

let savedJokes = JSON.parse(localStorage.getItem("myJokes")) || [];

//@@WFA: Vorlage für gespeicherte Jokes-Liste-Item
// Nächster Schritt für dich im JS: Wenn du einen Witz speicherst, erstelle das Element so:
// const div = document.createElement('div'); div.classList.add('saved-jokes__item');

//@@WFA Vorlage gespeicherte Jokes-Liste
// <div class="saved-jokes__item">
//   <div class="button button-delete">
//     <svg
//     class="saved-joke__icon"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke-width="1.5"
//     stroke="currentColor"
//     class="size-6"
//   >
//     <path
//       stroke-linecap="round"
//       stroke-linejoin="round"
//       d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
//     />
//   </svg>
//   </div>
// </div>
