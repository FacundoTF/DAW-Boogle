"use strict"
var Celdas = document.getElementsByClassName("CeldaPalabra")
localStorage.setItem("Palabra", "")
localStorage.setItem("Ultima Celda", "")
//Funcion principal que controla el comportamiento de las celdas
async function ComportamientoCeldas(){
    var Letras
    var LetrasRestantes
    var CeldasSeleccionadas
    var CeldaValida
    var MismaCelda
    var CeldasRestantes
    var RemoverTodasPalabras
    for (var i = 0; i < Celdas.length; i++) {
        Celdas[i].addEventListener("click", (event)=>{
            Letras = localStorage.getItem("Palabra")
            CeldasSeleccionadas = localStorage.getItem("Ultima Celda")
            MismaCelda = DeseleccionarCelda(event.target)
            if(MismaCelda){
                event.currentTarget.style.background = "#FFFFFF"
                RemoverTodasPalabras = false
                LetrasRestantes = Letras.slice(0,-1)
                CeldasRestantes = CeldasSeleccionadas.slice(0,-13)
                localStorage.setItem("Palabra", LetrasRestantes)
                localStorage.setItem("Ultima Celda", CeldasRestantes)
                RemoverLetra(RemoverTodasPalabras)
                return
            }
            if(Letras.length >= 1){
                CeldaValida = ValidarCeldasContiguas(event.target,CeldasSeleccionadas)
                if(CeldaValida === false){
                    RemoverTodasPalabras = true
                    RemoverLetra(RemoverTodasPalabras)
                    return
                }
                localStorage.setItem("Palabra", Letras + event.currentTarget.innerHTML)
                VisualizarLetra(event.currentTarget.innerText)
            }else{
                localStorage.setItem("Palabra", event.currentTarget.innerHTML)
                VisualizarLetra(event.currentTarget.innerText)
            }
            localStorage.setItem("Ultima Celda", `${CeldasSeleccionadas}/fila:${event.target.parentElement.rowIndex+1}-col:${event.target.cellIndex+1}`)
            event.currentTarget.style.background = "#FF0000"
            FormarPalabra(localStorage.getItem("Palabra"))
        })
    }
}
function DeseleccionarCelda(Celda){
    var FilaActual = Celda.parentElement.rowIndex + 1
    var ColumnaActual = Celda.cellIndex + 1
    var CeldasAlmacenadas = localStorage.getItem("Ultima Celda")
    var CeldaSeleccionada = CeldasAlmacenadas.substring(CeldasAlmacenadas.length - 13)
    var FilaSeleccionada = parseInt(CeldaSeleccionada.substring(6,7))
    var ColumnaSeleccionada = parseInt(CeldaSeleccionada.substring(12,13))
    if(FilaActual === FilaSeleccionada && ColumnaActual === ColumnaSeleccionada){
        return true
    }else{
        return false
    }
}
function ResetarEstiloCelda(){
    for (var i = 0; i < Celdas.length; i++) {
        Celdas[i].style.background = "#FFFFFF"
    }
    localStorage.setItem("Palabra", "")
}
function ValidarCeldasContiguas(Celda, CeldaAnterior){
    var CeldaA = CeldaAnterior.substring(CeldaAnterior.length - 13)
    var FilaAnterior = parseInt(CeldaA.substring(6,7))
    var ColumnaAnterior = parseInt(CeldaA.substring(12,13))
    var FilaActual = Celda.parentElement.rowIndex + 1
    var ColumnaActual = Celda.cellIndex + 1    
    if(Math.abs(FilaActual - FilaAnterior) <= 1 && Math.abs(ColumnaActual - ColumnaAnterior) <= 1 && Celda.style.background !== "rgb(255, 0, 0)"){
        return true
    }else{
        ResetarEstiloCelda()
        localStorage.setItem("Ultima Celda", "")
        return false
    }
}
//Permite mostrar y agregar las letras que se van seleccionando arriba de las celdas
function VisualizarLetra(Letra){
    var PalabraActual
    var ContenedorPalabra
    var LetrasActuales
    PalabraActual = localStorage.getItem("Palabra")
    ContenedorPalabra = document.getElementById("PalabraFormandose")
    LetrasActuales = document.querySelector("#PalabraFormandose>p")
    ContenedorPalabra.style.visibility = "visible"
    if(PalabraActual.length === 1){
        LetrasActuales.innerHTML = Letra
    }else{
        LetrasActuales.innerHTML = LetrasActuales.innerHTML + Letra
    }
}
//Permite remover la última o todas las letras arriba de la tabla con las celdas
function RemoverLetra(RemoverTodo){
    var ContenedorPalabra
    var LetrasActuales
    var LetrasNuevas
    ContenedorPalabra = document.getElementById("PalabraFormandose")
    LetrasActuales = document.querySelector("#PalabraFormandose>p")
    LetrasNuevas = LetrasActuales.innerHTML.slice(0,-1)
    if(LetrasNuevas.length === 0){
        ContenedorPalabra.style.visibility = "hidden"
    }else if(RemoverTodo === true){
        LetrasActuales.innerHTML = ""
        ContenedorPalabra.style.visibility = "hidden"
    }else{
        LetrasActuales.innerHTML = LetrasNuevas
    }
}
ComportamientoCeldas()


