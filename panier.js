const inHtml = document.getElementById('main');
const totalPrice = document.getElementById('toto');
const emptybasket = document.getElementById('empty')
//const { v4: uuidv4 } = require('uuid');

let data = JSON.parse(localStorage.getItem('basket'));
if (localStorage.length > 0) {
    let total = 0;
    data.forEach(data => {
            total += data.price * data.quantite;
            inHtml.innerHTML +=
                `<div class="flex bg-white shadow-lg rounded-lg mx-4 md:mx-auto max-w-md md:max-w-2xl mb-7">
            <div class="flex w-auto items-start px-4 py-6">
                <img class="w-24 h-24 rounded-full object-cover mr-4 shadow" src="${data.image}" alt="${data.name} alt="teddies">
                <div class="">
                    <div class="flex items-center">
                        <h2 class="text-3xl font-bold text-gray-600 -mt-1">${data.name}</h2>
                        <div class="w-7 h-7 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700 ml-auto">
                                <svg onclick="deleteItem('${data.idProd}')" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 ">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                            </div>
                    </div>
                    <strong><p class="text-xl mb-1 text-gray-600">Quantité</strong> : ${data.quantite}</p>
                    <strong><p class="text-xl mb-1 text-gray-600">Colors</strong> : ${data.colors}</p>
                    <p class="text-gray-500 mb-1 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste, officia sint. Autem conse amet, conse ipsum dolor sit amet, consipisicing </p>
                    <p class="ml-auto text-gray-600 text-2xl font-bold">${(data.price * data.quantite).toFixed(2)} €</p>
                </div>
            </div>
        </div>`;
        }
    );
    totalPrice.innerHTML += total === 0 ? "" : `
<p class="mb-20 text-center mt-20 text-gray-600 text-4xl font-bold">Total panier : ${total}.00 €</p>`;

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

        let mailRegExp = new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$");
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


        const donnees = {products: ids, contact: user};
        //console.log(donnees);

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
            })
            .then(function (order) {
            window.location.href = `contact.html?ncomm=${order.orderId}`;
        }).catch(error => {
            return alert("Erreur : " + error)
        });
    })
} else {
    emptybasket.innerHTML += `
<p class="mb-20 text-center mt-20 text-gray-600 text-4xl font-bold">Votre panier est vide :'(</p>
`;
}
