// made by Brett Wilson 
// https://github.com/BrettWilsonBDW
// script to generate one json with pokedex information 


var mainPokemonArr = {}


function printf(obj ="empty: nothing being printed") {
    console.log(obj);
}


// function to make sure flavour Text is english
function flavourTextLangSort(pokemonDesc) {

    let desc
    let i = 0
    while (i < 10) {
        
        if (pokemonDesc["flavor_text_entries"][i]['language']['name'] == 'en') {
            desc = (pokemonDesc["flavor_text_entries"][i]["flavor_text"])
            break
        }

        i++
    }

    return desc
}


// function to build a new arr from all the separate json's fetched
async function buildNewPokemonArr(PokemonTotal, choice) {

    let urlMain = 'https://pokeapi.co/api/v2/pokemon/'
    let urlMain2 = 'https://www.atbdw.com/pokedex/api/v2/pokemon/'
    let urlMainSpec = 'https://pokeapi.co/api/v2/pokemon-species/'
    let urlMainSpec2 = 'https://www.atbdw.com/pokedex/api/v2/pokemon-species/'

    if (choice == 1) {
        url = urlMain
        urlSpec = urlMainSpec
    } else if (choice == 2) {
        url = urlMain2
        urlSpec = urlMainSpec2
    } else {
        printf("please choose 1 or 2")
    }
    
    printf(`URL being used: ${url}`)

    let i = 1
    while (i <= PokemonTotal) {
        
        // fetch separate pokemon
        let response = await fetch(`${url}${i}`);
        let data = await response.json()

        // fetch description
        res = await fetch(`${urlSpec}${i}`);
        let pokemonDesc = await res.json();

        // for some reason there be gremlins in the descriptions from pokeapi: U+000c, U+00ad, U+2019, \n, 
        pokemonDesc = (flavourTextLangSort(pokemonDesc).replaceAll('', ' ').replaceAll('­' , '').replaceAll("’", ',').replaceAll("\n", ' '))

        // make holders for each pokedex part
        pokemonName = data["name"];
        pokemonID = i;
        pokemonType = data["types"]; // types are needed for the arr len 
        pokemonImg = data["sprites"]["other"]["official-artwork"]["front_default"];
        // pokemonImg = data["sprites"]["other"]["dream_world"]["front_default"];
        pokemonHight = data["height"];
        pokemonWeight = data["weight"];

        mainPokemonArr[i] = {
            "id"     : pokemonID,
            "name"   : pokemonName,
            "height" : pokemonHight,
            "weight" : pokemonWeight,
            "types"  : pokemonType, 
            "desc"   : pokemonDesc, 
            // "desc"   : null, 
            "img"    : pokemonImg, 
        };

        printf(`Progress: ${i} out of ${PokemonTotal}`)
        i++
    }

    return mainPokemonArr
}


function typeArrMaker(mainPokemonArr, limit) {
    
    let i = 1
    j = 0

    let pokemonTypeArr = []

    while (i <= limit){

        let pokemonType = mainPokemonArr[i]["types"]

        arrLen = pokemonType.length;

        var j = 0
        pokemonTypeArr = []

        while (j < arrLen) {

            pokemonSingleType = pokemonType[j]["type"]["name"]

            pokemonTypeArr[j] = pokemonSingleType

            mainPokemonArr[i][`type${j}`] = pokemonSingleType

            j++
        }

        // types are replaced by this new simple arr
        mainPokemonArr[i]["types"] = pokemonTypeArr

        i++ 
        
    }

}


async function main(limit = 3, choice = 1) {

    mainPokemonArr = await buildNewPokemonArr(limit, choice)

    typeMaker = await typeArrMaker(mainPokemonArr, limit)

    pokemon = Object.values(mainPokemonArr);

    printf(`Type main(limit, choice) with number of pokemon in place of limit and replace choice with 1 or 2 to use the pokeapi url or a backup. Default is limit: ${limit}, choice: ${choice}`)    

    printf("Right click and copy object: ")
    printf(mainPokemonArr)
    printf("or the get the array")
    printf(pokemon)
}


// _____________________main function call_____________________

main()
