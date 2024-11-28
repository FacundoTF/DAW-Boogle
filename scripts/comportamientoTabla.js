"use strict"
var celdas = document.getElementsByClassName("CeldaPalabra")
function resetarEstiloCelda(){
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].style.background = "#FFFFFF"
    }
}
for (var i = 0; i < celdas.length; i++) {
    celdas[i].addEventListener("click", (event)=>{
        event.currentTarget.style.background = "#ff7979";
    })
}
