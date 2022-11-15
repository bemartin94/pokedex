
const pokemonContainer = document.querySelector(".pokemon-container");
const spinner= document.querySelector("#spinner");
const previous = document.querySelector(".previous");
const next = document.querySelector(".next");


let limit = 11;
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


function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => { createPokemon(data);
        console.log(data);
    spinner.style.display = "none";
});
}

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
    name.textContent = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon-block-back');
    cardBack.textContent = "back"

    cardContainer.appendChild(card);
    cardContainer.append(cardBack)
    pokemonContainer.appendChild(flipCard);

}

function progressBars(stats) {
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('stats-container');
    for (let i=0; i>3; i++){
        const stats= stats[i];

        const statPercent= stat.base_state / 2 + "%"
    }
}
  function removeChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }





fetchPokemons(offset, limit);


const colorThief = new ColorThief();
const img = document.querySelector(".pokemon-image");
const pokemonBlock = document.querySelector(".pokemon-block");

if (img.complete) {
  let color= colorThief.getColor(img);
} else {
  img.addEventListener('load', function() {
 
  });
}
pokemonBlock.setAttribute("style", `background: rgb(${color})`)