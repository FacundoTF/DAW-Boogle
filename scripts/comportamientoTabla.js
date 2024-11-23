"use strict"
var celdas = document.getElementsByClassName("CeldaPalabra")
localStorage.setItem("Palabra", "")
localStorage.setItem("Ultima celda", "")
function validarCeldasContiguas(celda, celdaAnterior){
    var filaActual = celda.parentElement.rowIndex + 1
    var columnaActual = celda.cellIndex + 1
    var filaAnterior = parseInt(celdaAnterior.substring(5,6))
    var columnaAnterior = parseInt(celdaAnterior.substring(11,12))

    if(Math.abs(filaActual - filaAnterior) === 1 || Math.abs(columnaActual - columnaAnterior) === 1){
        return true
    }else{
        return false
    }
}
async function comportamientoCeldas(){
    var letras
    var ultimaCeldaSeleccionada
    var celdaValida
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].addEventListener("click", (event)=>{
            letras = localStorage.getItem("Palabra")
            if(letras.length >= 1){
                ultimaCeldaSeleccionada = localStorage.getItem("Ultima celda")
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
function resetarEstiloCelda(){
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].style.background = "#FFFFFF"
        localStorage.setItem("Palabra", "")
    }
}
comportamientoCeldas()


