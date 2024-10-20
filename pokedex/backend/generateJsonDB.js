const fs = require("fs");
const { type } = require("os");
const { config } = require("process");

async function generateJsonDB() {
  // TODO: fetch data pokemon api dan buatlah JSON data sesuai dengan requirement.
  // json file bernama db.json. pastikan ketika kalian menjalankan npm run start
  // dan ketika akses url http://localhost:3000/pokemon akan muncul seluruh data
  // pokemon yang telah kalian parsing dari public api pokemon
  try {
    const pokemonApiURL = "https://pokeapi.co/api/v2/pokemon/?limit=100";
    const pokemonList = await fetch(pokemonApiURL).then((res)=> res.json())
    const payload = [];
    for (let index = 0; index < pokemonList.results.length; index++) {
      const pokemon = pokemonList.results[index];
      const detail = await fetch (pokemon.url).then((res) => res.json());
      const species = await fetch (detail.species.url).then((res)=>res.json());
      const evo = await fetch (species.evolution_chain.url).then((res)=> res.json())
      
      const evolutionList = [evo.chain.species.name];
      let evolveTo = evo.chain.evolves_to[0];
      while (evolveTo) {
        evolutionList.push(evolveTo.species.name);
        evolveTo = evolveTo.evolves_to[0]
      }
      const PokeDB = {
        id: detail.id,
        name: pokemon.name,
        types: detail.types.map((typ)=> typ.type.name),
        abilities: detail.abilities.map((abi) => abi.ability.name),
        height: detail.height,
        weight: detail.weight,
        cries: detail.cries,
        evolutionChains: evolutionList,
      }
      payload.push(PokeDB)
    }
    fs.writeFileSync("./db.json", JSON.stringify({pokemon: payload}, null, 2), "utf-8");
    console.log(payload);
  } catch (error) {
    console.error(error)
  }
}

generateJsonDB();
