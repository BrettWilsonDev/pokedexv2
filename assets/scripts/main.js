// made by Brett Wilson 
// https://github.com/BrettWilsonBDW
// main script for the pokedex dom display

var pokemonCards = document.querySelector('#cards-container')
var stringSearch = document.querySelector('#search-input')
var sortButtons = document.querySelector('#sort-input')


var globalPokedex = []
var limit = 151

function printf(obj ="empty: nothing being printed") {
    console.log(obj);
}


async function fetchPokemon() {
    let response = await fetch(`assets/jsons/pokedexGenerated.json`);
    let data = await response.json()

    return data
}


function cardMaker(pokemon , limit = 151) {

    // if (limit == 151) {
    //     pokemon = pokemon.slice(0, 151)
    // }
        
    // using the standard map function with arrow notation
    const cardElements = pokemon.map(({ id, name, img, desc, types, height, weight}) => `
    <article class="card">
    <img src="${img}" alt="${name}">
    <small class="id">ID: ${id}</small>
    <p class="name">${name[0].toUpperCase() + name.substring(1)}</p>
    <span class="types">Types: ${types.join(' ').toUpperCase()}</span>
    <span class="Height">Height: ${height + " cm"}</span>
    <span class="Weight">Weight: ${weight + " kg"}</span>
    <p class="desc">${desc}</p>
    </article>
    `)

    pokemonCards.innerHTML = cardElements.join('')

}

// search by name string 
stringSearch.addEventListener('input', (event) => {
    
    let searchString = event.target.value

    
  
    let filteredPokedex = globalPokedex.filter((pokemon) => {
        pokeID = pokemon.id.toString()
        return (pokemon.name.includes(searchString) || (pokemon.types.includes(searchString)) || (pokeID.includes(searchString)) );
    })

    cardMaker(filteredPokedex)
})


// sort function
sortButtons.addEventListener('change', (event) => {
    const sortBy = event.target.value;
  
    switch (sortBy) {
            case 'idAsc':
            globalPokedex.sort((pokemonA, pokemonB) => pokemonA.id - pokemonB.id)
            break
            case 'idDesc':
            globalPokedex.sort((pokemonA, pokemonB) => pokemonB.id - pokemonA.id)
            break
            case 'nameAsc':
            globalPokedex.sort((pokemonA, pokemonB) => {
                if (pokemonA.name < pokemonB.name) return -1
                if (pokemonA.name > pokemonB.name) return 1
                return 0
            })
            break
            case 'nameDesc':
            globalPokedex.sort((pokemonA, pokemonB) => {
                if (pokemonA.name > pokemonB.name) return -1
                if (pokemonA.name < pokemonB.name) return 1
                return 0
            })
            break
            case 'list151':
                limit = 151

                break
            case 'list905':
                limit = 905
                break
        
        }

    cardMaker(globalPokedex ,limit)
})


async function main() {
    
    // printf(limit)

    let pokemon = await fetchPokemon()
    
    // turn the obj into an arr of values
    pokemon = Object.values(pokemon);
    globalPokedex = pokemon
    
    // printf(globalPokedex)
    cardMaker(pokemon)

}


// _____________________main function call_____________________

main()




