# Homework (Дз) — Lesson 3

This repository contains my Lesson 3 homework. The project implements two tasks described below:

**1. Design Pattern — Factory**

-   Implemented a simple Factory that creates `Transport` objects of different types (`Car`, `Bike`).
-   Each concrete transport implements `ride()` and `stop()` methods. The shared base class is named `Transport`.
-   The factory exposes a creation method (for example `TransportFactory.create(type)`) that returns the appropriate `Transport` instance.

**2. DOM & API — Rick & Morty characters with pagination**

-   The app fetches characters from the Rick & Morty API endpoint:
    https://rickandmortyapi.com/api/character
-   Characters are rendered as a list in the page. Pagination is implemented with two buttons: `Next` and `Prev`.
-   While loading data the UI displays `Loading…`.
-   If the current page is the first or last page, the corresponding button is disabled using `button.disabled = true;`.
-   The displayed current page number is derived from `data.info.next`: if `data.info.next` is `undefined` (we are on the last page) the app shows `data.info.pages` instead.
-   List of characters `<div id="characters-list"></div>`

## Project structure

-   `index.html` — main HTML and app layout.
-   `style.css` — styles for the UI.
-   `main.js` — application code: Factory implementation, API fetch, rendering and pagination logic.
