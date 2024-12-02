"use strict"
localStorage.setItem("Puntaje", "0")
function SumarPuntos() {
    var PuntajeSumar = parseInt(localStorage.getItem("Puntaje"))
    PuntajeSumar += 10
    localStorage.setItem("Puntaje", `${PuntajeSumar}`)
}
function RestarPuntos(){
    var PuntajeRestar = parseInt(localStorage.getItem("Puntaje"))
    PuntajeRestar -= 10
    if(PuntajeRestar < 0){
        PuntajeRestar = 0
    }
    localStorage.setItem("Puntaje", `${PuntajeRestar}`)
}
function ResetarPuntos(){
    localStorage.setItem("Puntaje", 0)
}
