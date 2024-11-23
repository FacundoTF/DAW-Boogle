"use strict"
var celdas = document.getElementsByClassName("CeldaPalabra")
localStorage.setItem("Palabra", "")
async function comportamientoCeldas(){
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].addEventListener("click", (event)=>{
            event.currentTarget.style.background="#FF0000"
            var letras = localStorage.getItem("Palabra")
            if(letras.length >= 1){
                localStorage.setItem("Palabra", letras + event.currentTarget.innerHTML)
            }else{
                localStorage.setItem("Palabra", event.currentTarget.innerHTML)
            }
            formarPalabra(localStorage.getItem("Palabra"))
        })
    }
}
function resetarEstiloCelda(){
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].style.background = "#FFFFFF"
        localStorage.setItem("Palabra", "")
    }
}
comportamientoCeldas()


