const inHtml = document.getElementById('main');
const totalPrice = document.getElementById('toto');
//const { v4: uuidv4 } = require('uuid');

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

totalPrice.innerHTML = total == 0 ? "" : total;

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
document.forms["form"].addEventListener("submit", function (e) {
    e.preventDefault(); // <- (e) gérer le comportement du formulaire
    var erreur;
    var allInputs = this;

    // Traitement générique pour le cas ou la totalité des champs serait vide
    for (var i = 0; i < allInputs.length; i++) {
        if (!allInputs[i].value) {
            erreur = "Veuillez renseigner tous les champs";
            break;
        }
        if (!allInputs[i].checkValidity()) {
            erreur += "champs" + i + "incorrect";
        }
    }

    let nomRegExp = new RegExp("^[a-zA-ZÀ-ú-s]+$");
    let erreurNom;
    document.getElementById("aideNom").textContent = "";
    if (!nomRegExp.test(allInputs["nom"].value)) {
        erreurNom = "erreur sur le nom";
        document.getElementById("aideNom").textContent = erreurNom;
        return false;
    }

    let preRegExp = new RegExp("^[a-zA-ZÀ-ú-s]+$");
    let erreurPre;
    document.getElementById("aidePrenom").textContent = "";
    if (!preRegExp.test(allInputs["prenom"].value)) {
        erreurPre = "erreur sur le prénom";
        document.getElementById("aidePrenom").textContent = erreurPre;
        return false;
    }

    let adrRegExp = new RegExp("^[a-zA-ZÀ-ú-s0-9_ ]+$");
    let erreurAdr;
    document.getElementById("aideAdresse").textContent = "";
    if (!adrRegExp.test(allInputs["adresse"].value)) {
        erreurAdr = "erreur sur l'adresse";
        document.getElementById("aideAdresse").textContent = erreurAdr;
        return false;
    }

    let codRegExp = new RegExp("^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$");
    let erreurCod;
    document.getElementById("aidePostCode").textContent = "";
    if (!codRegExp.test(allInputs["postCode"].value)) {
        erreurCod = "erreur sur le code postal";
        document.getElementById("aidePostCode").textContent = erreurCod;
        return false;
    }

    let mailRegExp = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$");
    let erreurMail;
    document.getElementById("aideCourriel").textContent = "";
    if (!mailRegExp.test(allInputs["email"].value)) {
        erreurMail = "erreur sur le mail";
        document.getElementById("aideCourriel").textContent = erreurMail;
        return false;
    }

    const ids = [];
    for (const product of data) {
        ids.push(product.idProd)
    }
    //console.log(ids);
    const user = {
        lastName: allInputs["nom"].value,
        firstName: allInputs["prenom"].value,
        address: allInputs["adresse"].value,
        city: allInputs["postCode"].value,
        email: allInputs["email"].value
    };
    //console.log(user);


    const donnees = {products: ids, contact:user};
    console.log(donnees);

    const options = {
        method: "POST",
        body: JSON.stringify(donnees),
        headers: {
            "Content-Type": "application/json",
        },
    };
    //console.log(options);

    fetch("http://localhost:3000/api/teddies/order", options)
        .then((response) => {
            return response.json();
        }).then(function (order) {
        window.location.href = `contact.html?ncomm=${order.orderId}`;
    }).catch(error => {
        return alert("Erreur : " + error)
    });
});