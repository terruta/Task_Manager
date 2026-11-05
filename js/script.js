// Registo
async function signUp() {
    await supabase.auth.signUp({
        email, password
});
}
// Login
let loginBtn = document.querySelector("#login");

function logIn() {
    if (localStorage.getItem("")) {
        alert("olá " + localStorage.getItem("user"));
    } 
    else {
        let myUser = prompt("qual é o seu nome?");
        //armazenar no local storage
        localStorage.setItem("user", myUser);
        }
}

// Utilizador atual
async function getUser() {
    const { data } = await supabase.auth.getUser();
}
// Logout   
async function signOut(){
    await supabase.auth.signOut();
}


user