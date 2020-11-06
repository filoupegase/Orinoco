const inHtml = document.getElementById('main');
//const prixInHtml = document.getElementById('finalPrice');

//--Boucle de création du HTML--
for (let i = 0; i < localStorage.length; i++) {
    let elmPanier = localStorage.key(i);
    let data = JSON.parse(localStorage.getItem(elmPanier));

    inHtml.innerHTML += `
<div class="flex bg-white rounded-lg mx-4 md:mx-auto max-w-md md:max-w-2xl rounded border border-red">
   <div class="flex items-start px-4 py-6">
      <img class="w-12 h-12 rounded-full object-cover mr-4 shadow" src="${data.image}" alt="${data.name}">
      <div class="">
         <div class="flex items-center justify-between">
           <h2 class="text-lg font-semibold text-gray-900 mt-1">${data.name}</h2>
         </div>
         <p class="text-gray-700"><strong class="text-lg font-semibold text-gray-900 -mt-1">Quantité</strong> : ${data.quantite}</p>
         <p class="text-gray-700"><strong class="text-lg font-semibold text-gray-900 -mt-1">Colors</strong> : ${data.colors}</p>
          <p><strong>Prix : <span class="text-gray-700">${data.totalPrice.toFixed(2)} €</span></strong></p>   
         <p class="mt-3 text-gray-700 text-sm">
            Lorem ipsum, dolor sit amet conse. Saepe optio minus rem dolor sit amet!
         </p>
              <i onclick="supprimerItem('${data.idProd}')" class="far fa-times-circle mt-3 cursor-pointer"></i>
         </div>
      </div>
   </div>
`;
}

if (localStorage.length === 0) {
    inHtml.innerHTML = `<div class="container-fluid mb-7 items-center">
                            <img class="items-center" style="width: 40%;" alt="empty box gif" src="https://media.giphy.com/media/3ohhwsjzpejaSWoTkI/source.gif" />
                            <p class="lead">Votre panier est vide</p>
                        </div>`;}


function totaPrice() {

    //on enregistre les valeurs du prix total dans une variable
    var total = localStorage.getItem('prixTotal');
    var prixPanier = document.getElementById('total');

    // affichage du prix total du panier si le panier contient quelque chose...Sinon on affiche "votre panier est vide"
    if (total != null) {
        prixPanier.textContent = 'Le montant de votre commande est de : ' + total +  ' €';
        prixPanier.id = 'prixTotal';
    } else  {
        prixPanier.textContent = 'Le montant de votre commande est de : 0 €';
    }
}

function supprimerItem(_id) {
    console.log(_id);
    localStorage.removeItem(_id);
    document.location.href = 'panier.html';
}
