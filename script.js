"use strict";

//-------------Creating Elements --------------------------------

let body = document.body;
let header = document.createElement('header');
let h3 = document.createElement('h3');
let icon = document.createElement('icon');
let container = document.createElement('div');
let maindiv = document.createElement('div');
let buttondiv = document.createElement('div');
let arrow1 = document.createElement('button');
arrow1.innerHTML = `<i class="fa-solid fa-backward"></i>`;
let arrow2 = document.createElement('button');
arrow2.innerHTML = `<i class="fa-solid fa-forward"></i>`;


let buttons = [];
for (let i = 1; i <= 6; i++) {
    let button = document.createElement('button');
    button.textContent = i.toString();
    buttons.push(button);
}

//-------------Set attributes 

h3.setAttribute('id', "headtag");

container.setAttribute('id', "container");
maindiv.setAttribute('id', "maindiv");
buttondiv.setAttribute('id', 'buttondiv');
arrow1.setAttribute('class', 'arrow');
arrow2.setAttribute('class', 'arrow');

buttons[0].classList.add('active');

//------------- API Functions --------------------------------
let products = [];
let currentPage = 1;
let productsPage = 3;

fetch('https://fakestoreapi.com/products?limit=21')

    .then(res => res.json())
    .then(json => {
        products = json;
        showProducts(currentPage);
    })
    .catch(error => console.error('Error fetching products:', error));

function showProducts(page) {
    maindiv.innerHTML = '';

    let start = (page - 1) * productsPage;
    let end = start + productsPage;
    for (let i = start; i < end; i++) {
        if (products[i]) {
            let div = document.createElement('div');
            div.setAttribute('class', "childdiv");
            createProduct(products[i], div);
        }
    }
}


function createProduct(product, div) {
    let img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;

    let name = document.createElement('p');
    name.textContent = product.title;

    let price = document.createElement('p');
    price.textContent = `$${product.price}`;

    div.appendChild(img);
    div.appendChild(name);

    div.appendChild(price);
    maindiv.appendChild(div);
    container.appendChild(maindiv);
    body.appendChild(container);
    body.appendChild(buttondiv)
  
}

//-------------Append element -----------

h3.textContent = "Pagination";
header.appendChild(h3);
buttondiv.appendChild(arrow1);
for (let button of buttons) {
    buttondiv.appendChild(button);
}
buttondiv.appendChild(arrow2);
container.appendChild(buttondiv);
body.appendChild(header);
body.appendChild(container);

//-------------Event Listener for Buttons 
function updateActiveButton() {
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
        if (currentPage === i + 1) {
            buttons[i].classList.add('active');
        }
    }
}
// --------------------button disable------------------
function updateArrowStyles() {
    arrow1.classList.remove('disable');
    arrow2.classList.remove('disable');

    if (currentPage === 1) {
        arrow1.classList.add('disable');
        
    }
    if (currentPage === 6) {
        arrow2.classList.add('disable');
    }
}

// --------------------------button click event -------
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        currentPage = i + 1;
        showProducts(currentPage);
        updateActiveButton();
        updateArrowStyles();
    });
}
arrow1.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showProducts(currentPage);
        updateActiveButton();
        updateArrowStyles();
    }
});
arrow2.addEventListener('click', () => {
    if (currentPage < 6) { 
        currentPage++;
        showProducts(currentPage);
        updateActiveButton();
        updateArrowStyles();
    }
});




