
const search = document.querySelector(".search-bar");
const submitBTN = document.querySelector(".submit");
const pokemonSprite = document.getElementById("image");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonHeight = document.getElementById("pokemon-heigth");
const pokemonWeight = document.getElementById("pokemon-weight");
const pokemonType1 = document.getElementById("pokemon-type-1");
const pokemonType2 = document.getElementById("pokemon-type-2");
const pokemonWeakness1 = document.getElementById("pokemon-weakness-1");
const pokemonWeakness2 = document.getElementById("pokemon-weakness-2");
const pokemonWeakness3 = document.getElementById("pokemon-weakness-3");

let inputValue = "1";

let pokemonInfo = 
{
    image: "",

    name: "",
    id: "",
    height: "",
    weight: "",

    type1: "",
    type2: "",
    weakness1: "",
    weakness2: "",
    weakness3: "",
}

const pokemon = async () => {
    let requestPokemonInfo = `https://pokeapi.co/api/v2/pokemon/${inputValue}`;
    let data1 = await fetch(requestPokemonInfo); // pokémon datas recovery
    let dataResponse1 = await data1.json(); // datas transformation to json
    

    function dataAttribution() {
        pokemonInfo.image = dataResponse1.sprites.front_default;
        pokemonInfo.name =  dataResponse1.name;
        pokemonInfo.id =  dataResponse1.id;
        pokemonInfo.height = (dataResponse1.height * 10) / 100;
        pokemonInfo.weight =  (dataResponse1.weight* 10) / 100;
        if (dataResponse1.types.length > 1) {
            pokemonInfo.type1 = dataResponse1.types[0].type.name;
            pokemonInfo.type2 = dataResponse1.types[1].type.name;
        } else {
            pokemonInfo.type1 = dataResponse1.types[0].type.name;
        }
    }

    await dataAttribution();

    let requestWeakness1 = `https://pokeapi.co/api/v2/type/${pokemonInfo.type1}`;
    let dataWeakness1 =  await fetch(requestWeakness1);
    let weaknessResponse1 = await dataWeakness1.json();

    let weaknessResponse2 = "";
    if (pokemonInfo.type2 != "") {
        let requestWeakness2 = `https://pokeapi.co/api/v2/type/${pokemonInfo.type2}`;
        let dataWeakness2 =  await fetch(requestWeakness2);
        weaknessResponse2 = await dataWeakness2.json();
    }
    
    function weaknessAttribution() {
        if (weaknessResponse1.damage_relations.double_damage_from.length > 1) {
            pokemonInfo.weakness1 = weaknessResponse1.damage_relations.double_damage_from[0].name;
            pokemonInfo.weakness2 = weaknessResponse1.damage_relations.double_damage_from[1].name;
        } else {
            pokemonInfo.weakness1 = weaknessResponse1.damage_relations.double_damage_from[0].name;
            pokemonInfo.weakness2 = "";
        }

        if (pokemonInfo.type2 != "") {
            pokemonInfo.weakness3 = weaknessResponse2.damage_relations.double_damage_from[0].name;
        } else {
            pokemonInfo.weakness3 = "";
        }
    }

    await weaknessAttribution();

    pokemonSprite.src = pokemonInfo.image;

    pokemonName.textContent = pokemonInfo.name;
    pokemonId.textContent = pokemonInfo.id;
    pokemonHeight.textContent = pokemonInfo.height;
    pokemonWeight.textContent = pokemonInfo.weight; 

    pokemonType1.textContent = pokemonInfo.type1;
    pokemonType2.textContent = pokemonInfo.type2;
    pokemonWeakness1.textContent = pokemonInfo.weakness1;
    pokemonWeakness2.textContent = pokemonInfo.weakness2;
    pokemonWeakness3.textContent = pokemonInfo.weakness3;
}

pokemon();

search.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        const valueSearch = document.querySelector(".search-bar").value;
        inputValue = valueSearch;
        pokemonInfo.type1 = "";
        pokemonInfo.type2 = "";
        pokemonInfo.weakness1 = "";
        pokemonInfo.weakness2 = "";
        pokemonInfo.weakness3 = "";
        pokemon();
    }
})

submitBTN.addEventListener("click", () => {
    const valueSearch = document.querySelector(".search-bar").value;
    inputValue = valueSearch;
    pokemonInfo.type.splice(0, pokemonInfo.type.length);
    pokemonInfo.type1 = "";
    pokemonInfo.type2 = "";
    pokemonInfo.weakness1 = "";
    pokemonInfo.weakness2 = "";
    pokemonInfo.weakness3 = "";
    pokemon();
})
