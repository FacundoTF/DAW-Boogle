"use strict"
function sumarPuntos() {
    // if(localStorage.getItem("Puntaje") === 0){

    // }
    var puntajeSumar = localStorage.getItem("Puntaje")

    puntajeSumar += 10

    localStorage.getItem("Puntaje") = puntajeSumar
}
function restarPuntos(){
    var puntajeRestar = localStorage.getItem("Puntaje")

    puntajeRestar -= 10

    if(puntajeRestar < 0){
        puntajeRestar = 0
    }

    localStorage.getItem("Puntaje") = puntajeRestar
}
function resetarPuntos(){
    localStorage.getItem("Puntaje") = 0
}
