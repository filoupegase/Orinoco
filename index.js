const god = document.getElementById('teddysCard'); //récupération id=main
const apiURL = "http://localhost:3000/api/teddies";
const jsonURL = "./teddy.json";

fetch(apiURL)
    .then(response => {
        return response.json()
    })
    .then(data => {
        data.forEach(data => {

            let priceProd = data.price / 100;

            god.innerHTML +=`
  <a href="detail.html?id=${data._id}">
    <div class="transform hover:-rotate-2 flex p-6 h-auto parent shadow-lg overflow-hidden bg-white cursor-pointer rounded">
        <div class="flex-none relative parent child w-40">
            <img src="${data.imageUrl}" alt="${data.name}" class="absolute inset-0 w-full h-full object-cover rounded-lg" />
        </div>
        <form class="flex-auto pl-6">
            <div class=" text-lg flex flex-wrap items-baseline mb-4">
                <h1 style="font-family: 'Nunito', sans-serif;" class="w-full flex-none font-semibold mb-2.5">
                   ${data.name}
                </h1>
                <div class="text-3xl leading-7 font-bold text-purple-600">
                    ${priceProd.toFixed(2)} €
                </div>
                <div class="text-xs font-medium text-gray-400 ml-3">
                    In stock
                </div>
            </div>
            <div class="flex space-x-3 mb-4 text-sm font-semibold">
                <div class="flex-auto flex space-x-3">
                    <button class="w-1/2 flex items-center justify-center rounded-full bg-purple-700 text-white" href="detail.html?id=${data._id}" type="button">Buy now</button>
                    <button class="w-1/2 flex items-center justify-center rounded-full bg-purple-50 text-purple-700" href="detail.html?id=${data._id}" type="button">Add to bag</button>
                </div>
                <button class="flex-none flex items-center justify-center w-9 h-9 rounded-full bg-purple-50 text-purple-700 hover:text-purple-500" type="button" aria-label="like">
                    <svg width="20" height="20" fill="currentColor">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                </button>
            </div>
            <p class="text-sm text-gray-500">
                ${data.description}
            </p>
        </form>
    </div>`
            //console.log(data);
        })
    }).catch(error => {
    return alert("Erreur : " + error)
    console.log(error);
});