let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

const getBackgroundColor = (type) => {
  switch (type) {
    case 'fire':
      return 'bg-red-500 text-white';
    case 'water':
      return 'bg-blue-500 text-white';
    case 'grass':
      return 'bg-lime-500 text-white';
    case 'bug':
      return 'bg-lime-900 text-white';
    case 'poison':
      return 'bg-purple-950 text-white';
    case 'flying':
      return 'bg-cyan-600 text-white';
    case 'normal':
      return 'bg-slate-600 text-white';
    case 'electric':
        return 'bg-yellow-500 text-white'
    case 'ground':
        return 'bg-yellow-900 text-white'
    case 'fairy':
        return 'bg-pink-500 text-white'
    case 'fighting':
        return 'bg-amber-600 text-white'
    case 'psychic':
        return 'bg-rose-700 text-white'
    case 'rock':
        return 'bg-stone-500 text-white'
    case 'steel':
        return 'bg-cyan-700 text-white'
    case 'ice':
        return 'bg-sky-500 text-white'
    case 'ghost':
        return 'bg-purple-900 text-white'
    default:
      return 'bg-gray-200 text-black';
  }
};

// Card component
function PokemonCard(props) {
  return React.createElement(
    "div",
    { className: "relative md:z-10 md:hover:z-50 md:hover:scale-125 transition-transform duration-300 bg-white m-2 grow bg-opacity-25 p-1 rounded border-2 shadow-lg hover:border-amber-500  "},
    React.createElement("h2", {className: "font-bold text-center capitalize"}, props.name),
    React.createElement("img", { src: props.image, alt: props.name, className: "m-auto bg-blue-50 rounded" }),

    props.types.map((typ)=> {
        return React.createElement("p", {key:typ, className: `${getBackgroundColor(typ)} my-2 text-center rounded font-normal capitalize`}, typ)
    }),
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "grid grid-cols-3 justify-center m-2 md:grid-cols-9" },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}

// Komponen Header
const Header = () => {
    return <nav className="flex justify-between bg-blue-950">
        <h1 className="text-2xl md:text-3xl md:text-center my-auto ml-2 text-left font-light p-1">Pokedex.</h1>
        <ul className="flex my-auto mr-1">
            <li className="mr-4 font-bold"><a>Home</a></li>
            <li className="mr-4 font-bold"><a>About</a></li>
            <li className="mr-4 font-bold"><a>List</a></li>
            <li className="mr-4 font-bold"><a>Contact</a></li>
        </ul>
    </nav> 
}

const Footer = ()=>{
    return <h1 className="text-1xl text-center font-bold bg-blue-950 p-2">&copy; RzzzL &copy; 2024 The Pokémon Company</h1>;
}

// Komponen App yang membungkus Header
function App() {
    return (
        <div className = "text-white bg-sky-950 scroll-smooth">
            <Header />
            <PokemonList/>
            <Footer/>
        </div>
    );
}

// Fungsi untuk merender aplikasi
function renderApp() {
    ReactDOM.render(<App />, document.getElementById("root"));
}

// Panggil fungsi renderApp untuk merender aplikasi
renderApp();


// Fetch and display the Pokemon data
fetchPokemon();