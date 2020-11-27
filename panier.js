const inHtml = document.getElementById('main');
const totalPrice = document.getElementById('toto');

let data = JSON.parse(localStorage.getItem('basket'));
let total = 0;
data.forEach(data => {
        total += data.price * data.quantite;
        inHtml.innerHTML +=
            `<div class="flex bg-white rounded-lg mx-4 md:mx-auto max-w-md md:max-w-2xl rounded border border-red">
   <div class="flex items-start px-4 py-6">
      <img class="w-12 h-12 rounded-full object-cover mr-4 shadow" src="${data.image}" alt="${data.name}">
      <div class="">
         <div class="flex items-center justify-between">
           <h2 class="text-lg font-semibold text-gray-900 mt-1">${data.name}</h2>
         </div>
         <p class="text-gray-700"><strong class="text-lg font-semibold text-gray-900 -mt-1">Quantité</strong> : ${data.quantite}</p>
         <p class="text-gray-700"><strong class="text-lg font-semibold text-gray-900 -mt-1">Colors</strong> : ${data.colors}</p>
          <p><strong>Prix : <span class="text-gray-700">${(data.price * data.quantite).toFixed(2)} €</span></strong></p>   
              <i onclick="deleteItem('${data.idProd}')" class="far fa-times-circle mt-3 cursor-pointer"> </i>
         </div>
      </div>
    </div>`;
    }
);

totalPrice.innerHTML = `<p>${total}</p>`;

if (localStorage.length === 0) {
    inHtml.innerHTML =
        `<div class="container-fluid mb-7 items-center">
                            <img class="items-center" style="width: 40%;" alt="empty box gif" src="https://media.giphy.com/media/3ohhwsjzpejaSWoTkI/source.gif" />
                            <p class="lead">Votre panier est vide</p>
                        </div>`;
}

//-- fonction de suppression d'un produit
function deleteItem(_id) {
    let supprItem = JSON.parse(localStorage.getItem("basket"));
    const item = supprItem.find(item => item.idProd == _id)
    const index = supprItem.indexOf(item);
    supprItem.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(supprItem));
    alert('Vous avez supprimé ' + item.name + ' de votre panier ! ')
    document.location.href = 'panier.html';
}

// ------------FORMULAIRE--------------

let firstName = document.getElementById('nom').value;
let lastName = document.getElementById('prenom').value;
let courriel = document.getElementById('courriel').value;

//--- met les valeurs dans un objet pour la requete POST
let contact = {
    "nom": firstName,
    "prenom": lastName,
    "courriel": courriel,
};

// création de l'objet obligatoire pour la requete à envoyer au serveur
let objt = {
    contact,
};

let achat = JSON.stringify(objt);
console.log(achat);

var pseudoElt = document.getElementById("nom");
//pseudoElt.value = "MonPseudo";
// Auto focus
pseudoElt.focus();

// Contrôle du courriel
document.getElementById("nom")
    .addEventListener("blur", function (e) {
        var regexCourriel = /^[a-zA-Z ,.'-]+$/;
        nom = e.target.value;
        if (!regexCourriel.test(e.target.value) || nom.length >= 2) {
            var validiteCourriel = "erreur : minimum 2 carractère";
        }
        document.getElementById("aideNom").textContent = validiteCourriel;
    });


// Contrôle du courriel
document.getElementById("courriel")
    .addEventListener("blur", function (e) {
        var regexCourriel = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regexCourriel.test(e.target.value)) {
            var validiteCourriel = "Adresse mail invalide";
        }
        document.getElementById("aideCourriel").textContent = validiteCourriel;
    });


///^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/ <- classic regex input

