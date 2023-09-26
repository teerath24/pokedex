// - When page first loads, get and display data for Bulbasaur

// - When user clicks on the Left or Right D-pad buttons, show the previous or next pokemon (by id #)

// - When user types a pokemon name and presses 'Enter', get and
//   display data for that pokemon

// - If the name the user typed
//   is not a real pokemon, show
//   an error message
let currentPokemon = 1;

function getPokemonName() {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${currentPokemon}`);

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      const response = JSON.parse(xhr.response);
      console.log(response);

      pokemonName.textContent = response.name;
      height.textContent = response.height / 10;
      weight.textContent = response.weight / 10;
      sprite.src =
        response.sprites.versions["generation-v"]["black-white"][
          "animated"
        ].front_default;
    }
  });

  xhr.send(null);
}

function getPokemonGenus() {
  sprite.src =
    "https://cdn.discordapp.com/attachments/1128965963170197504/1146331003456069692/transferring.gif";
  const xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `https://pokeapi.co/api/v2/pokemon-species/${currentPokemon}`
  );

  xhr.addEventListener("readystatechange", () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const response = JSON.parse(xhr.response);
      const genusName = response.genera[7].genus.replace("Pokémon", "");
      genus.textContent = genusName;
      description.textContent = response.flavor_text_entries[1].flavor_text;
      id.textContent = response.id;

      if (response.id < 10) {
        id.textContent = `00` + response.id;
      } else if (response.id >= 10 && response.id < 100) {
        id.textContent = `0` + response.id;
      }
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      description.innerHTML = "Error <br> Pokemon not found!";
      pokemonName.innerHTML = "";
      height.innerHTML = "";
      weight.innerHTML = "";
      id.innerHTML = "";
      genus.innerHTML = "";
      sprite.src =
        "https://cdn.discordapp.com/attachments/1128965963170197504/1146331003456069692/transferring.gif";
      console.log(currentPokemon);
    }
  });

  xhr.send(null);
}

getPokemonName();
getPokemonGenus();

const rightBtn = document.querySelector(".middle-row .right");
const leftBtn = document.querySelector(".middle-row .left");

rightBtn.addEventListener("click", () => {
  if (currentPokemon < 151) {
    currentPokemon++;
    getPokemonName();
    getPokemonGenus();
  }
});
document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "ArrowRight") {
    if (currentPokemon < 151) {
      currentPokemon++;
      getPokemonName();
      getPokemonGenus();
    }
  }
});

leftBtn.addEventListener("click", () => {
  currentPokemon--;
  getPokemonName();
  getPokemonGenus();
});

document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "ArrowLeft") {
    currentPokemon--;
    getPokemonName();
    getPokemonGenus();
  }
});

nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    currentPokemon = nameInput.value;
    console.log("currentPokemon", currentPokemon);
    getPokemonName();
    getPokemonGenus();
  }
});

