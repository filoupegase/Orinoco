const god = document.getElementById('teddysCard'); //récupération id=main
const apiURL = "http://localhost:3000/api/teddies/";
const jsonURL = "./teddy.json";

fetch(apiURL)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            Promise.reject(response.status);
        }
    })
    .then(data => {
        data.forEach(data => {

            let priceProd = data.price / 100;

            god.innerHTML += `
             <a href="detail.html?id=${data._id}">
            <div class="max-w-sm parent rounded overflow-hidden shadow-lg bg-white cursor-pointer">
            <img class="w-full parent child" src="${data.imageUrl}" alt="${data.name}">
            <div class="px-6 py-4">
                <div class="font-bold text-2xl mb-2">${data.name}</div>
                <div class="text-lg mb-2">${priceProd.toFixed(2)} €</div>
                <p class="text-gray-700 text-base">${data.description}</p>
            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Teddies</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Pink</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Orinoco</span>
            </div>
        </div>
        </a>`; //j'injecte mon HTML avec les bonnes variables directement dans le DOM
            console.log(data);
        })
    }).catch(error => alert("Erreur : " + error));
/*
fetch("http://localhost:3000/api/teddies/")
    .then(response => response.json())
    .then(response => alert(JSON.stringify(response)))
    .catch(error => alert("Erreur : " + error));
*/
/*
fetch(apiURL)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
    });
console.log(apiURL);
*/