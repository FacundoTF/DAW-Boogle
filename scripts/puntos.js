"use strict"
localStorage.setItem("Puntaje", "0")
function sumarPuntos() {
    var puntajeSumar = parseInt(localStorage.getItem("Puntaje"))

    puntajeSumar += 10

    localStorage.setItem("Puntaje", `${puntajeSumar}`)
}
function restarPuntos(){
    var puntajeRestar = parseInt(localStorage.getItem("Puntaje"))

    puntajeRestar -= 10

    if(puntajeRestar < 0){
        puntajeRestar = 0
    }

    localStorage.setItem("Puntaje", `${puntajeRestar}`)
}
function resetarPuntos(){
    localStorage.setItem("Puntaje", 0)
}
