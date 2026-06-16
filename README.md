### Introduction

[Live Demo](https://anaid-ariwany.github.io/Memory-Card/)

Here we go again with a new project! Let's make sure you understand the concepts so far. The main goal of this project is to implement the concepts learned so far by using hooks to manage and utilize state while fetching and using data from an external API.

### How the game works

Go play around with this [student's solution](https://heldersrvio.github.io/memory-card-game/) to find out for yourself how the Memory game works. Although this example uses cartoon characters, you can use anything you like for your game.

### Assignment

<div class="lesson-content__panel" markdown="1">

1. Create a new React Project.
1. Take some time to think about the features you want to implement, which components you need, how to structure your application, and how to get the images from an API. Your application should include a scoreboard, which counts the current score, and a "Best Score", which shows the highest score you've achieved thus far. There should be a function that displays the cards in a random order anytime a user clicks one. Be sure to invoke that function when the component mounts.
1. You also need a handful of cards that display images and possibly informational text. These images and texts need to be fetched from an external API. You can use anything from [Giphy](https://giphy.com/) to a [Pokemon API](https://pokeapi.co/).
1. Now that you've thought about the structure of your application, set up the folder structure and start creating the components.
1. Style your application so you can show it off!
1. As always, push the project to GitHub, and don't forget to deploy it.

</div>

## Project Scaffold

I scaffolded a production-ready React app (Vite) in this workspace. Key files:

- [package.json](package.json)
- [index.html](index.html)
- [src/App.jsx](src/App.jsx)
- [src/components/Board.jsx](src/components/Board.jsx)
- [src/components/Card.jsx](src/components/Card.jsx)
- [src/components/Scoreboard.jsx](src/components/Scoreboard.jsx)
- [src/components/Leaderboard.jsx](src/components/Leaderboard.jsx)
- [src/utils/pokemon.js](src/utils/pokemon.js)
- [src/styles.css](src/styles.css)

How to run locally:

```bash
npm install
npm run dev
```

Notes:
- The game uses the PokeAPI to fetch images. If requests fail, placeholders are used.
- Best scores and a simple local leaderboard are persisted to localStorage.

