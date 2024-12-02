"use strict"
var AlertaModal = document.getElementById("AlertaModal")
function ValidarNombre(Nombre){
    var RegexNombre = /^.{3,}$/
    return RegexNombre.test(Nombre)
}
document.querySelector("#BotonInicio").addEventListener("click", (event) => {
    var Nombre = document.querySelector("#EntradaNombre").value
    var NombreValido = ValidarNombre(Nombre)
    if(NombreValido === false){
        AlertaModal.style.display = "flex"
        return
    }
    sessionStorage.setItem("Jugador", Nombre)
    window.open("/html/juego.html", "_self")//En el primer parametro debe ir a la pagina del juego
})
document.querySelector(".AlertaModalBoton").addEventListener("click", event => {
    AlertaModal.style.display = "none"
})
