"use strict"
var AlertaModal = document.getElementById("AlertaModal")
function ValidarNombre(Nombre){
    var RegexNombre = /^.{3,}$/
    return RegexNombre.test(Nombre)
}
document.querySelector("#BotonInicio").addEventListener("click", function() {
    var Nombre = document.querySelector("#EntradaNombre").value
    var NombreValido = ValidarNombre(Nombre)
    if(NombreValido === false){
        AlertaModal.style.display = "flex"
        return
    }
    sessionStorage.setItem("Jugador", Nombre)
    window.open("./Html/Juego.html", "_self")
})
document.querySelector(".AlertaModalBoton").addEventListener("click", function() {
    AlertaModal.style.display = "none"
})
