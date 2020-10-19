const god = document.getElementById('productDetail');

//const apiURL = "http://localhost:3000/api/teddies/";

const params = new URLSearchParams(window.location.search);

console.log(params);

fetch(`http://localhost:3000/api/teddies/${params.get('id')}`) //je met l'id du produit clické dans le fetch
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            Promise.reject(response.status);
        }
    })
    .then(data => {
        //--suppression de la boucle
        //--variable prix pour le diviser par 100
        let priceProdUnit = data.price / 100;
        //--variable vide + boucle pour créer le select qui accueil
        let color = "";
        data.colors.forEach(couleur => {
            color += `<option value="${couleur}">${couleur}</option>`;
        });

        //--Ecriture du HTML en dynamique
        god.innerHTML += `
               <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="${data.name}" class="lg:w-1/2 w-full object-cover cursor-pointer object-center rounded border border-gray-200" src="${data.imageUrl}">
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 class="text-sm title-font text-gray-500 tracking-widest">TEDDY</h2>
                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">${data.name}</h1>
                <div class="flex mb-4">
          <span class="flex items-center">
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span class="text-gray-600 ml-3">4 Reviews</span>
          </span>
                    <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
            <a class="text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a class="ml-2 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a class="ml-2 text-gray-500">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
              </svg>
            </a>
          </span>
                </div>
                <p class="leading-relaxed">${data.description}</p>
                <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">         
                 <div class="flex items-center">
                 <label class="mr-3" for="QuantiteProduit">Quantité</label>
                   <input id="inputQuantite" class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-3" type="number" min="1" value="1"/>
                    </div>
          <div class="flex ml-6 items-center">
                        <span class="mr-3">Colors</span>
                        <div class="relative">
                            <select id="inlineFormCustomSelect" class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                                ${color}
                            </select>
                            <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6"></path>
                </svg>
              </span>
                        </div>
                    </div>
                </div>
                <div class="flex">
                    <p class="title-font font-medium text-2xl text-gray-900"><span id="totalPrice" class="title-font font-medium text-2xl text-gray-900">${priceProdUnit.toFixed(2)}</span> €</p>
                    <button id="btnAjoutId" type="button" class="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Ajouter au panier</button>
                    <button class="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>`;

        //--variables qui récupère les fonctions d'écoute pour le prix total
        let functionPrice = calculePrice(priceProdUnit);

        //--On écoute le petit bouton, mais tu ne sais pas cliquer !
        const btnAjout = document.getElementById('btnAjoutId');

        btnAjout.addEventListener('click', function () {
            ajoutLocalStor()
        });


        //---on catch les données voulues et on stocke dans un objet
        function ajoutLocalStor() {

            let lensElm = document.getElementById('inlineFormCustomSelect');
            let quantityElm = document.getElementById('inputQuantite');

            let toAddTab = {
                idProd: data._id,
                image: data.imageUrl,
                name: data.name,
                lens: lensElm.value,
                quantite: quantityElm.value,
                totalPrice: (data.price * parseInt(quantityElm.value)) / 100,
                price: data.price / 100
            };

            let key = data._id;

            localStorage[key] = JSON.stringify(toAddTab);

            window.location.href = 'panier.html';
        }

    });


//---Fonction qui calcule le prix total sur la page Produit
function calculePrice(priceProdUnit) {
    let quantites = document.getElementById('inputQuantite');
    quantites.addEventListener('change', (event) => {
        const result = document.getElementById('totalPrice');
        result.textContent = `${priceProdUnit}` * `${event.target.value}`;
    });
}


// if (localStorage.pushTabb) {
//     const tab = JSON.parse(localStorage.pushTabb);
//     tab.push(toAddTabb);
//     localStorage.setItem('pushTabb', JSON.stringify(tab));
// } else {
//     tabbLs.push(toAddTabb);
//     localStorage.setItem('pushTabb', JSON.stringify(tabbLs));
// };