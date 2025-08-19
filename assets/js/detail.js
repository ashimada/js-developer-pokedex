const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"), 10);
const stats = ["hp", "attack", "defense", "special-defense", "speed"];

function applyInfo(data) {
  document.getElementById("type").classList.add(data.type);

  const items = ["number", "name", "species", "height", "weight", "abilities"];
  items.map((item) => (document.getElementById(item).innerHTML = data[item]));
  stats.map((item) => (document.getElementById(item).innerHTML = data[item]));

  document.getElementById("types").innerHTML = data.types
    .map((type) => `<li class="type ${type}">${type}</li>`)
    .join("");

  document.getElementById("photo").src = data.photo;
}

function convertData(pokeDetail) {
  const pokemon = new Pokemon();
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;
  console.log(pokeDetail.abilities);
  pokemon.abilities = pokeDetail.abilities
    .map((item) => item.ability.name)
    .join(", ");
  pokemon.species = pokeDetail.species.name;
  pokemon.height = pokeDetail.height;
  pokemon.weight = pokeDetail.weight;

  stats.map(
    (item) =>
      (pokemon[item] = pokeDetail.stats.find(
        (element) => element.stat.name === item
      ).base_stat)
  );

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
async function getData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const pokemon = convertData(data);
    applyInfo(pokemon);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

getData();
