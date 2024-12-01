"use strict"
var AlertaModal = document.getElementById("AlertaModal")
document.querySelector("#BotonInicio").addEventListener("click", (event) => {
    var nombre = document.querySelector("#EntradaNombre").value
    var nombreValido = validarNombre(nombre)
    if(nombreValido === false){
        AlertaModal.style.display = "flex"
        return
    }
    sessionStorage.setItem("Jugador", nombre)
    window.open("/html/juego.html", "_self",)//En el primer parametro debe ir a la pagina del juego
})
document.querySelector("#AlertaModalBoton").addEventListener("click", event => {
    AlertaModal.style.display = "none"
})
function validarNombre(nombre){
    var regexNombre = /^.{3,}$/
    return regexNombre.test(nombre)
}