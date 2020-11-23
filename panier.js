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
    //console.log(supprItem);
    const item = supprItem.find(item => item.idProd == _id)
    const index = supprItem.indexOf(item);
    supprItem.splice(index, 1);
    //supprItem.filter(_id, "basket");
    localStorage.setItem("basket", JSON.stringify(supprItem));
    document.location.href = 'panier.html';
}