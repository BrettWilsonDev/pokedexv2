# python script used to download all pokemon images

import requests

img_url = ""

limit = 2
limit = int(input("enter number of pokemon imgs to fetch: "))

if limit > 905:
    limit = int(input("enter number of pokemon imgs to fetch up to 905 please: "))

i = 1
while i <= limit:

    # if i <= 10:

    #     num = i
    #     stri = str(num).zfill(3)

    #     img_url = f"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/{stri}.png"

    # elif i > 10:

    #     num = i
    #     stri = str(num).zfill(3)

    #     img_url = f"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/{stri}.png"

    # elif i > 100:

    #     num = i
    #     stri = str(num).zfill(3)

    #     img_url = f"https://assets.pokemon.com/assets/cms2/img/pokedex/detail/{stri}.png"
    
    # else:
    #     print("error")



    img_url = f"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{i}.png"
    response = requests.get(img_url)

    if response.status_code:
        file = open(f"assets\\img\\{i}.png", 'wb')
        file.write(response.content)
        file.close()

    i += 1

    print(f"{i - 1}.png Downloaded")
