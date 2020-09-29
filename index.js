const god = document.getElementById('teddysCard'); //récupération id=main
const apiURL = "http://localhost:3000/api/teddies/";
const jsonURL = "./teddy.json";

fetch(jsonURL)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            Promise.reject(response.status);
        }
    })
    .then(data => {
        data.forEach(objet => {

            let priceProd = objet.price / 100; //variable prix pour le diviser par 100

            god.innerHTML += `
            <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white cursor-pointer">
            <img class="w-full" src="${objet.imageUrl}" alt="${objet.name}">
            <div class="px-6 py-4">
                <div class="font-bold text-2xl mb-2">${objet.name}</div>
                <div class="text-lg mb-2">${priceProd.toFixed(2)} €</div>
                <p class="text-gray-700 text-base">${objet.description}</p>
            </div>
            <div class="px-6 pt-4 pb-2">
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
            </div>
        </div>`; //j'injecte mon HTML avec les bonnes variables directement dans le DOM
            console.log(objet);
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
console.log(apiURL);*/