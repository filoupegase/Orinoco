const apiURL = "http://localhost:3000/api/teddies";

fetch(apiURL)
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
    });
console.log(apiURL);