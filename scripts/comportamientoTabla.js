"use strict"
var celdas = document.getElementsByClassName("CeldaPalabra")
localStorage.setItem("Palabra", "")
localStorage.setItem("Ultima celda", "")

async function comportamientoCeldas(){
    var letras
    var letrasRestantes
    var celdasSeleccionadas
    var celdaValida
    var mismaCelda
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].addEventListener("click", (event)=>{
            letras = localStorage.getItem("Palabra")
            celdasSeleccionadas = localStorage.getItem("Ultima celda")
            debugger
            mismaCelda = deseleccionarCelda(event.target)
            if(mismaCelda){
                event.currentTarget.style.background="#FFFFFF"
                letrasRestantes = letras.slice(0,-1)
                celdasRestantes = celdasSeleccionadas.slice(0,-14)
                localStorage.setItem("Palabra", letrasRestantes)                
                return
            }
            if(letras.length >= 1){
                celdaValida = validarCeldasContiguas(event.target,celdasSeleccionadas)
                if(celdaValida === false){
                    return
                }
                localStorage.setItem("Palabra", letras + event.currentTarget.innerHTML)
            }else{
                localStorage.setItem("Palabra", event.currentTarget.innerHTML)
            }
            localStorage.setItem("Ultima celda", `${celdasSeleccionadas}/fila:${event.target.parentElement.rowIndex+1}-col:${event.target.cellIndex+1}`)
            event.currentTarget.style.background="#FF0000"
            formarPalabra(localStorage.getItem("Palabra"))
        })
    }
}
function deseleccionarCelda(celda){
    debugger
    var filaActual = celda.parentElement.rowIndex + 1
    var columnaActual = celda.cellIndex + 1
    var celdasSeleccionadas = localStorage.getItem("Ultima celda")
    var celdasSinActual = celdasSeleccionadas.slice(0,-13)
    var filaAnterior = parseInt(celdasSeleccionadas.substring(5,6))
    var columnaAnterior = parseInt(celdasSeleccionadas.substring(11,12))
    //Hacer un slice de todo en 'Ultima celda'
    //Hacer un substring sin la celda actual. En teoria se puede hacer para atras.
    if(filaActual === filaAnterior && columnaActual === columnaAnterior){
        return true
    }else{
        return false
    }
}
function validarCeldasContiguas(celda, celdaAnterior){
    var celdaA = celdaAnterior.substring(celdaAnterior.length - 13)
    var filaAnterior = parseInt(celdaA.substring(6,7))
    var columnaAnterior = parseInt(celdaA.substring(12,13))
    var filaActual = celda.parentElement.rowIndex + 1
    var columnaActual = celda.cellIndex + 1    
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


