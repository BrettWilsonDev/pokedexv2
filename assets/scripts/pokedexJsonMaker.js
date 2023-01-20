// made by Brett Wilson 
// https://github.com/BrettWilsonBDW
// script to generate one json with pokedex information 


var mainPokemonArr = {}

// function to skip typing out console.log(obj) the whole time
function printf(obj ="empty: nothing being printed") {
    console.log(obj)
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
        let response = await fetch(`${url}${i}`)
        let data = await response.json()

        // fetch description
        res = await fetch(`${urlSpec}${i}`)
        let pokemonDesc = await res.json()

        // for some reason there be gremlins in the descriptions from pokeapi: U+000c, U+00ad, U+2019, \n, 
        pokemonDesc = (flavourTextLangSort(pokemonDesc).replaceAll('', ' ').replaceAll('­' , '').replaceAll("’", ',').replaceAll("\n", ' '))

        // make holders for each pokedex part
        pokemonName = data["name"]
        pokemonID = i
        pokemonType = data["types"] // types are needed for the arr len 
        pokemonImg = data["sprites"]["other"]["official-artwork"]["front_default"]
        // pokemonImg = data["sprites"]["other"]["dream_world"]["front_default"]
        pokemonHight = data["height"]
        pokemonWeight = data["weight"]

        mainPokemonArr[i] = {
            "id"     : pokemonID,
            "name"   : pokemonName,
            "height" : pokemonHight,
            "weight" : pokemonWeight,
            "types"  : pokemonType, 
            "desc"   : pokemonDesc, 
            // "desc"   : null, 
            "img"    : pokemonImg, 
        }


        document.getElementById("progresscnt").innerHTML = `Progress: ${i} out of ${PokemonTotal}` 
        // printf(`Progress: ${i} out of ${PokemonTotal}`)
        i++
    }

    return mainPokemonArr
}


// function to loop through types and add them to the object
function typeArrMaker(mainPokemonArr, limit) {
    
    let i = 1
    j = 0

    let pokemonTypeArr = []

    while (i <= limit){

        let pokemonType = mainPokemonArr[i]["types"]

        arrLen = pokemonType.length

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


// function to clean up main by moving its console mesgs here
function consoleMessages(mainPokemonArr) {
    
    pokemon = Object.values(mainPokemonArr)

    printf(`Type main(limit, choice) with number of pokemon in place of limit and replace choice with 1 or 2 to use the pokeapi url or a backup. Default is limit: ${limit = 3}, choice: ${choice = 1}`)    

    printf("Right click and copy object: ")
    printf(mainPokemonArr)
    printf("or the get the array")
    printf(pokemon)

    if (pokemon.length == 0) {
        document.getElementById("status").innerHTML = `Status: failed please make sure the input is a number`
        document.getElementById("progresscnt").innerHTML = `Progress: failed to run` 
    } else {
        document.getElementById("status").innerHTML = `Status: Done`
    }

}


// function to turn the object arr into a string
function jsonStringer() {
    
    pokemonArrStringed = (JSON.stringify(mainPokemonArr, null, 2))

    printf("Output: \n\n" + pokemonArrStringed)
    document.getElementById("output").innerHTML = "Output: <br><br>" + pokemonArrStringed

    return pokemonArrStringed
}


// function to download the arr as a json
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
    }


// part of the download function
document.getElementById("downloadButton").addEventListener("click", function(){
        
        var text = jsonStringer();
        var filename = "pokedex.json";
        
        
        testString = jsonStringer().toString()
        compareString = "{}"
        compareString.toString()

        
        // make sure the arr is not empty 
        if (testString === compareString) {
            document.getElementById("status").innerHTML = `Status: Please click run first`
        } else {
            download(filename, text);
        }
    
    }, false);


// function to call main through a dom button part of main
let btn = document.getElementById("btn")
btn.addEventListener('click', event => {


    let limit = document.getElementById("limit").value
    
    Number(limit)
    limit = Math.abs(limit) 

    if (limit > 905) {
        document.getElementById("status").innerHTML = `Status: please use numbers below 905`
    } else {
        main(limit)
    }

})


// _____________________main function call_____________________



async function main(limit = 3, choice = 1) {

    document.getElementById("status").innerHTML = `Status: waiting`

    mainPokemonArr = await buildNewPokemonArr(limit, choice)

    typeMaker = await typeArrMaker(mainPokemonArr, limit)

    // printf(jsonStringer())
    jsonStringer()

    consoleMessages(mainPokemonArr)

}

