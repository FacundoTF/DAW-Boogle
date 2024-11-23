"use strict"
var celdas = document.getElementsByClassName("CeldaPalabra")
localStorage.setItem("Palabra", "")
localStorage.setItem("Ultima celda", "")

async function comportamientoCeldas(){
    var letras
    var nuevasLetras
    var ultimaCeldaSeleccionada
    var celdaValida
    var mismaCelda
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].addEventListener("click", (event)=>{
            letras = localStorage.getItem("Palabra")
            ultimaCeldaSeleccionada = localStorage.getItem("Ultima celda")
            debugger
            mismaCelda = deseleccionarCelda(event.target)
            if(mismaCelda){
                event.currentTarget.style.background="#FFFFFF"
                nuevasLetras = letras.slice(0,-1)
                localStorage.setItem("Palabra", nuevasLetras)                
                return
            }
            if(letras.length >= 1){
                celdaValida = validarCeldasContiguas(event.target,ultimaCeldaSeleccionada)
                if(celdaValida === false){
                    return
                }
                localStorage.setItem("Palabra", letras + event.currentTarget.innerHTML)
            }else{
                localStorage.setItem("Palabra", event.currentTarget.innerHTML)
            }
            localStorage.setItem("Ultima celda", `fila:${event.target.parentElement.rowIndex+1}/col:${event.target.cellIndex+1}`)
            event.currentTarget.style.background="#FF0000"
            formarPalabra(localStorage.getItem("Palabra"))
        })
    }
}
function deseleccionarCelda(celda){
    var filaActual = celda.parentElement.rowIndex + 1
    var columnaActual = celda.cellIndex + 1
    var ultimaCeldaSeleccionada = localStorage.getItem("Ultima celda")
    var filaAnterior = parseInt(ultimaCeldaSeleccionada.substring(5,6))
    var columnaAnterior = parseInt(ultimaCeldaSeleccionada.substring(11,12))
    if(filaActual === filaAnterior && columnaActual === columnaAnterior){
        return true
    }else{
        return false
    }
}
function validarCeldasContiguas(celda, celdaAnterior){
    var filaActual = celda.parentElement.rowIndex + 1
    var columnaActual = celda.cellIndex + 1
    var filaAnterior = parseInt(celdaAnterior.substring(5,6))
    var columnaAnterior = parseInt(celdaAnterior.substring(11,12))
    if(Math.abs(filaActual - filaAnterior) <= 1 && Math.abs(columnaActual - columnaAnterior) <= 1){
        return true
    }else{
        return false
    }
}
function resetarEstiloCelda(){
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].style.background = "#FFFFFF"
        localStorage.setItem("Palabra", "")
    }
}
comportamientoCeldas()


