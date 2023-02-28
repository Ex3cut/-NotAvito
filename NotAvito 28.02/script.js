"use strict";

let users = {
    "admin": {
        "name": "Admin1",
        "login": "admin",
        "password": "admin1",
    },
    "user": {
        "name": "User1",
        "login": "user",
        "password": "user1",
    },
    "user": {
        "name": "1",
        "login": "1",
        "password": "1"
    }
}

let wrapper = document.querySelector(".wrapper")
let content = document.querySelector(".content")

//LOG IN
let login_login = document.querySelector("#login_login")
let login_password = document.querySelector("#login_password")
//LOG IN BUTTON
let login_submit = document.querySelector("#login_submit")
login_submit.addEventListener("click", login_clicked)
//LOG IN POPUP
let login_popup = document.querySelector("#login_popup")

//LOG OUT BUTTON
let logout = document.querySelector("#logout")
logout.addEventListener("click", logout_clicked)

//REGISTER
let register_name = document.querySelector("#register_name")
let register_login = document.querySelector("#register_login")
let register_password = document.querySelector("#register_password")
//REGISTER BUTTON
let register_submit = document.querySelector("#register_submit")
register_submit.addEventListener("click", register_clicked)
//REGISTER POPUP
let register_popup = document.querySelector("#register_popup")

//SHORTCUT
wrapper.style.display = "none"
content.style.display = "block"

//CLICKED TO LOG IN
function login_clicked(){

    let login = login_login.value
    let password = login_password.value
    let message = document.querySelector("#message")
    
    for (const key in users) 
    {

        if(users[key]["login"] == login && users[key]["password"] == password)
        {
            localStorage.setItem("role", key)
        }

        let role = localStorage.getItem("role")

        if (role) 
        {
            wrapper.style.display = "none"
            content.style.display = "block"
            message.innerHTML = `Loged in as ${role}`
        }
    }
}

//CLICKED TO LOG OUT
function logout_clicked() {
    content.style.display = "none"
    localStorage.clear()
    wrapper.style.display = "block"
    login_login.value = ""
    login_password.value = ""
    register_name = ""
    register_login = ""
    register_password = ""
}

//CLICKED TO REGISTER
function register_clicked(){

    let name = register_name.value
    let login = register_login.value
    let password = register_password.value
    let already_taken = false

    for (const key in users) {
        if (users[key]["login"] == login)
        {
            already_taken = true
            alert("Current login is taken")
            return
        }
    }
    if (name == "" || login == "" || password == "") {
        alert("Fill out all fields first")
    }

    if (already_taken != true && name != "" && login != "" && password != "") 
    {

        localStorage.setItem("role", login)

        users[login] = {
            "name": name,
            "login": login,
            "password": password
        }

        let role = localStorage.getItem("role")

        if (role) 
        {
            wrapper.style.display = "none"
            content.style.display = "block"
            message.innerHTML = `Loged in as ${role}`
        }

    }
}
//


fetch('https://dummyjson.com/products')
.then(res => res.json())
.then(json=>showProduct(json));

function showProduct(json) {
    console.log(json);
    let allProducts = json.products;
    for (const product of allProducts) {
        cars.innerHTML += `
        <div price=${product.price} rating=${product.rating} stock=${product.stock}>
            <p><img src=${product["images"][0]}></p>
            <p>${product.title}</p>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <p>${product.rating}</p>
            <p>${product.stock}</p>
        </div>
        `
    }
}


let listCar = {
    "firstCar": {
        "name": "firstCar",
        "typecar": "whithmileage",        
        "typeengine": "petrol",
        "price": 16000,
        "rating": 3,
        "discount": 60
    },
    "secondCar": {
        "name": "secondCar",
        "typecar": "newcar",        
        "typeengine": "gas",
        "price": 32000,
        "rating": 5,
        "discount": 15
    },
    "thirdCar": {
        "name": "thirdCar",
        "typecar": "newcar",        
        "typeengine": "gas", 
        "price": 24000,
        "rating": 2,
        "discount": 30
    }
};

//FILTER
let filter_apply = document.querySelector("#filter_apply")
filter_apply.addEventListener("click", filter_cars)

function filter_cars() {

    let typecar = document.querySelector("input[name=typecar]:checked")

    let params = {}
    params.typecar = typecar.value;

    let typeengine = document.querySelectorAll("input[name=typeengine]:checked")
    params.typeengine = [];
    typeengine.forEach(function(elem) {
        params.typeengine.push(elem.value);
    })

    selectCar(params)
}

function selectCar(params) {
    for (const car of listCar) {
        if(car.typecar == params.typecar && car.typeengine == params.typeengine) {
            console.log("Car with chosen filters exists")
        }
    }
}
//

//SORT
let cars = document.querySelector('.cars')
//PRICE BUTTON
let price_button = document.querySelector('.price_button')
price_button.addEventListener("click", sortByPrice)
//RATING BUTTON
let rating_button = document.querySelector('.rating_button')
rating_button.addEventListener("click", sortByRate)
//DISCOUNT BUTTON
let stock_button = document.querySelector('.stock_button')
stock_button.addEventListener("click", sortByStock)

let price_check = true
let rating_check = true
let stock_check = true

// for (const key in listCar) {
//     cars.innerHTML += `<div class="window" price="${listCar[key]["price"]}" rating="${listCar[key]["rating"]}" discount="${listCar[key]["discount"]}">NAME: ${listCar[key]["name"]}<br><div>PRICE: ${listCar[key]["price"]}</div><div>RATING: ${listCar[key]["rating"]}</div><div>DISCOUNT: ${listCar[key]["discount"]}</div></div>`
// }

function sortByPrice(){
    if(price_check){
        for(let i = 0; i < cars.children.length; i++){
            for(let j = i; j < cars.children.length; j++){
                if(+cars.children[i].getAttribute('price') > +cars.children[j].getAttribute('price')){
                    let replaceNode = cars.replaceChild(cars.children[j], cars.children[i])
                    insertAfter(replaceNode, cars.children[i])
                }
            }
        }
    }
    else{
        for(let i = 0; i < cars.children.length; i++){
            for(let j = i; j < cars.children.length; j++){
                if(+cars.children[i].getAttribute('price') < +cars.children[j].getAttribute('price')){
                    let replaceNode = cars.replaceChild(cars.children[j], cars.children[i])
                    insertAfter(replaceNode, cars.children[i])
                }
            }
        }
    }
    price_check = !price_check
    rating_check = false
    stock_check = false
}

function sortByRate(){
    if(rating_check){
        for(let i = 0; i < cars.children.length; i++){
            for(let j = i; j < cars.children.length; j++){
                if(+cars.children[i].getAttribute('rating') > +cars.children[j].getAttribute('rating')){
                    let replaceNode = cars.replaceChild(cars.children[j], cars.children[i])
                    insertAfter(replaceNode, cars.children[i])
                }
            }
        }
    }
    else{
        for(let i = 0; i < cars.children.length; i++){
            for(let j = i; j < cars.children.length; j++){
                if(+cars.children[i].getAttribute('rating') < +cars.children[j].getAttribute('rating')){
                    let replaceNode = cars.replaceChild(cars.children[j], cars.children[i])
                    insertAfter(replaceNode, cars.children[i])
                }
            }
        }
    }
    price_check = false
    rating_check = !rating_check
    stock_check = false
}

function sortByStock(){
    if(stock_check){
        for(let i = 0; i < cars.children.length; i++){
            for(let j = i; j < cars.children.length; j++){
                if(+cars.children[i].getAttribute('stock') > +cars.children[j].getAttribute('stock')){
                    let replaceNode = cars.replaceChild(cars.children[j], cars.children[i])
                    insertAfter(replaceNode, cars.children[i])
                }
            }
        }
    }
    else{
        for(let i = 0; i < cars.children.length; i++){
            for(let j = i; j < cars.children.length; j++){
                if(+cars.children[i].getAttribute('stock') < +cars.children[j].getAttribute('stock')){
                    let replaceNode = cars.replaceChild(cars.children[j], cars.children[i])
                    insertAfter(replaceNode, cars.children[i])
                }
            }
        }
    }
    price_check = false
    rating_check = false
    stock_check = !stock_check
}


function insertAfter(elem, refElem){
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling)
}
//