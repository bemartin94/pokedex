
const pokemonContainer = document.querySelector(".pokemon-container");
const spinner= document.querySelector("#spinner");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");
const name = document.querySelector(".name");



let limit = 8;
let offset = 1;

previous.addEventListener("click", () => {
    if (offset != 1) {
      offset -= 9;
      removeChildNodes(pokemonContainer);
      fetchPokemons(offset, limit);
    }
  });
  
  next.addEventListener("click", () => {
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  });

  function Transition() {
    const cardContainer = document.querySelector(".card-container");
    const pokemonBlock = document.querySelector(".pokemon-block");
    const pokemonBlockBack = document.querySelector(".pokemon-block-back");

    cardContainer.setAttribute("class", "card-container-click")
    pokemonBlock.setAttribute("class", "pokemon-block-click")
    pokemonBlockBack.setAttribute("class", "pokemon-block-back-click")

}

async function fetchPokemon(id) {
  spinner.style.display = "none";
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemon = await response.json();
    return createPokemon(pokemon);

};


function fetchPokemons(offset, limit) {
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
      fetchPokemon(i);
    }
  }
  
function createPokemon(pokemon) {

    const flipCard= document.createElement('div');
    flipCard.classList.add("flip-card")

    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container")

    flipCard.appendChild(cardContainer); 

    const card = document.createElement('div');
    card.classList.add('pokemon-block');


    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.classList.add('pokemon-image');
    sprite.src= pokemon.sprites.front_default;
   


    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`

    const name = document.createElement('p');
    name.classList.add('name')
    name.setAttribute("onclick", "Transition()")
    name.textContent = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');

    cardBack.appendChild(progressBars(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.append(cardBack);
    pokemonContainer.appendChild(flipCard);
    

    const colorThief = new ColorThief();
    const img = document.querySelector(".pokemon-image");
    img.setAttribute("onclick", "Transition()")
    const pokemonBlock = document.querySelector(".pokemon-block");
    img.crossOrigin = 'anonymous';
    if (img.complete) {
    let color= colorThief.getColor(img);
    } else {
    img.addEventListener('load', function() {

    });
    }  pokemonBlock.setAttribute("style", `background: rgba(${colorThief.getColor(img)},0.6)`)
}
  


function progressBars(stats) {
  const statsContainer = document.createElement("div");
  statsContainer.classList.add("stats-container");

  for (let i = 0; i < 3; i++) {
    const stat = stats[i];

    const statPercent = stat.base_stat / 2 + "%";
    const statContainer = document.createElement("stat-container");
    statContainer.classList.add("stat-container");

    const statName = document.createElement("p");
    statName.textContent = stat.stat.name;

    const progress = document.createElement("div");
    progress.classList.add("progress");

    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.setAttribute("aria-valuenow", stat.base_stat);
    progressBar.setAttribute("aria-valuemin", 0);
    progressBar.setAttribute("aria-valuemax", 200);
    progressBar.style.width = statPercent;

    progressBar.textContent = stat.base_stat;

    progress.appendChild(progressBar);
    statContainer.appendChild(statName);
    statContainer.appendChild(progress);

    statsContainer.appendChild(statContainer);
  }

  return statsContainer;
}
  function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }





fetchPokemons(offset, limit);
