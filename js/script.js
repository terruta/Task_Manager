/* 
[ ]  Simulação login com dados de sessão (a partir do momento em que se autentica, aparece na app Olá Nome do User)
[ ]  Adicionar tarefas via formulário
[ ]  Marcar tarefas como concluídas
[ ]  Editar e remover tarefas
[ ]  Contar tarefas ativas/concluídas
[ ]  Filtros (Todas / Ativas / Concluídas)
[ ]  Personalização de tema (claro/escuro) com armazenamento em local storage
[ ]  Mostra hora/data atual
[ ]  Conectar com uma API à vossa escolha e mostrar dados (por exemplo tempo)
    
   */

// DOM - recolha *********************************************
let loginBtn = document.querySelector("#login-button");
let loggedInMessage = document.querySelector("#hi-user");
let logoutBtn = document.querySelector("#logout-btn");
let loginSection = document.querySelector("#login-section");
let myTasks = document.querySelector("#tasks");


function checkLoginStatus() {
    let storedUser = localStorage.getItem("user");
    if (storedUser) {
        loggedInMessage.textContent = `Hi ${storedUser}!`;
        logoutBtn.classList.remove("hidden");
        loginSection.classList.add("hidden")
        myTasks.classList.remove(".hidden");
    } else {
        logoutBtn.classList.add("hidden"); 
        // if there is no user logged, logoutBtn stays hidden.
        
    }
}

checkLoginStatus(); // runs as soon as page is opened.


// eventos **************************************************

if (loginBtn) {
    loginBtn.addEventListener("click", () => login());
}


// funções ***************************************************

    // to get localStorage's value inside "login()"
    let storedUser = localStorage.getItem("user");


function login() {
    // is there a user stored already?
    if (storedUser) {
        alert("Hi " + storedUser);
        loggedInMessage.textContent = `Hi ${storedUser}!`;
        logoutBtn.classList.remove("hidden");
        myMain.classList.remove("hidden");

    } else {
        let myUser = prompt("Qual é o seu nome?");

        // to avoid storing "users" when
        //   a) user cancels prompt
        //   b) user leaves prompt empty
        // :
        if(myUser){
            // store in local storage
            localStorage.setItem("user", myUser);
            loggedInMessage.textContent = `Hi ${myUser}`;
            logoutBtn.classList.remove("hidden");
        } // end 2nd if
    } // end if-else
} //end login()





//////////////////////////////////////////////////// Switch mode /////////////
let myMode = document.getElementById("mode_switch");
let myBody = document.body; // explicit

myMode.addEventListener(
    "click", () => {
        darkMode = !darkMode; // this way the btn myMode can function as a toggler
        applyMode(darkMode);
    }
)
// let storedMode/storedTheme =
function applyMode(isDark) {
    if (isDark) {
        myBody.style.backgroundColor = "black";
        myBody.style.color = "white";
        myMode.style.backgroundColor = "white";
        myMode.style.color = "black";
        myMode.textContent = "☀️";
    } else {
        // light mode styles:
        myBody.style.backgroundColor = "white";
        myBody.style.color = "black";
        myMode.style.backgroundColor = "black";
        myMode.style.color = "white";
        myMode.textContent = "🌙";
    }
}

function applyMode(isDark) {
    if (isDark) {
        myBody.style.backgroundColor = "black";
        myBody.style.color = "white";
        myMode.style.backgroundColor = "white";
        myMode.style.color = "black";
        myMode.textContent = "☀️";
    } else {
        // light mode styles:
        myBody.style.backgroundColor = "white";
        myBody.style.color = "black";
        myMode.style.backgroundColor = "black";
        myMode.style.color = "white";
        myMode.textContent = "🌙";
    }
}