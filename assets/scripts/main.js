// made by Brett Wilson 
// https://github.com/BrettWilsonBDW
// main script for the pokedex dom display


function printf(obj ="empty: nothing being printed") {
    console.log(obj);
}


async function fetchPokemon() {
    let response = await fetch(`assests/jsons/pokedex.json`);
    let data = await response.json()

    return data
}

function addPokemonCardsToDOM(pokemon) {
    
}

async function main() {
    
    let pokemon = await fetchPokemon()

    printf(pokemon[1]["id"])
    printf(pokemon[1]["name"])
    printf(pokemon[1]["height"])
    printf(pokemon[1]["weight"])
    printf(pokemon[1]["img"])
    printf(pokemon[1]["desc"])
    printf(pokemon[1]["types"])

}


// _____________________main function call_____________________

main()