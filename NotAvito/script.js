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

//CLICKED TO LOG IN
function login_clicked(){

    let login = login_login.value
    let password = login_password.value
    let message = document.querySelector("#message");
    
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
