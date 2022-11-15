

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

