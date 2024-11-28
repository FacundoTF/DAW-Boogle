"use strict"
var celdas = document.getElementsByClassName("CeldaPalabra")
localStorage.setItem("Palabra", "")
localStorage.setItem("Ultima celda", "")
//Funcion principal que controla el comportamiento de las celdas
async function comportamientoCeldas(){
    var letras
    var letrasRestantes
    var celdasSeleccionadas
    var celdaValida
    var mismaCelda
    var celdasRestantes
    var removerTodasPalabras
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].addEventListener("click", (event)=>{
            letras = localStorage.getItem("Palabra")
            celdasSeleccionadas = localStorage.getItem("Ultima celda")
            mismaCelda = deseleccionarCelda(event.target)
            if(mismaCelda){
                event.currentTarget.style.background = "#FFFFFF"
                removerTodasPalabras = false
                letrasRestantes = letras.slice(0,-1)
                celdasRestantes = celdasSeleccionadas.slice(0,-13)
                localStorage.setItem("Palabra", letrasRestantes)
                localStorage.setItem("Ultima celda", celdasRestantes)
                removerLetra(removerTodasPalabras)
                return
            }
            if(letras.length >= 1){
                celdaValida = validarCeldasContiguas(event.target,celdasSeleccionadas)
                if(celdaValida === false){
                    removerTodasPalabras = true
                    removerLetra(removerTodasPalabras)
                    return
                }
                localStorage.setItem("Palabra", letras + event.currentTarget.innerHTML)
                visualizarLetra(event.currentTarget.innerText)
            }else{
                localStorage.setItem("Palabra", event.currentTarget.innerHTML)
                visualizarLetra(event.currentTarget.innerText)
            }
            localStorage.setItem("Ultima celda", `${celdasSeleccionadas}/fila:${event.target.parentElement.rowIndex+1}-col:${event.target.cellIndex+1}`)
            event.currentTarget.style.background = "#FF0000"
            formarPalabra(localStorage.getItem("Palabra"))
        })
    }
}
function deseleccionarCelda(celda){
    var filaActual = celda.parentElement.rowIndex + 1
    var columnaActual = celda.cellIndex + 1
    var celdasAlmacenadas = localStorage.getItem("Ultima celda")
    var celdaSeleccionada = celdasAlmacenadas.substring(celdasAlmacenadas.length - 13)
    var filaSeleccionada = parseInt(celdaSeleccionada.substring(6,7))
    var columnaSeleccionada = parseInt(celdaSeleccionada.substring(12,13))
    if(filaActual === filaSeleccionada && columnaActual === columnaSeleccionada){
        return true
    }else{
        return false
    }
}
function resetarEstiloCelda(){
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].style.background = "#FFFFFF"
    }
    localStorage.setItem("Palabra", "")
}
function validarCeldasContiguas(celda, celdaAnterior){
    var celdaA = celdaAnterior.substring(celdaAnterior.length - 13)
    var filaAnterior = parseInt(celdaA.substring(6,7))
    var columnaAnterior = parseInt(celdaA.substring(12,13))
    var filaActual = celda.parentElement.rowIndex + 1
    var columnaActual = celda.cellIndex + 1    
    if(Math.abs(filaActual - filaAnterior) <= 1 && Math.abs(columnaActual - columnaAnterior) <= 1 && celda.style.background !== "rgb(255, 0, 0)"){
        return true
    }else{
        resetarEstiloCelda()
        localStorage.setItem("Ultima celda", "")
        return false
    }
}
//Permite mostrar y agregar las letras que se van seleccionando arriba de las celdas
function visualizarLetra(letra){
    debugger
    var palabraActual
    var contenedorPalabra
    var letrasActuales
    palabraActual = localStorage.getItem("Palabra")
    contenedorPalabra = document.getElementById("PalabraFormandose")
    letrasActuales = document.querySelector("#PalabraFormandose>p")
    contenedorPalabra.style.visibility = "visible"
    if(palabraActual.length === 1){
        letrasActuales.innerHTML = letra
    }else{
        letrasActuales.innerHTML = letrasActuales.innerHTML + letra
    }
}
//Permite remover la última o todas las letras arriba de la tabla con las celdas
function removerLetra(removerTodo){
    debugger
    var contenedorPalabra
    var letrasActuales
    var letrasNuevas
    contenedorPalabra = document.getElementById("PalabraFormandose")
    letrasActuales = document.querySelector("#PalabraFormandose>p")
    letrasNuevas = letrasActuales.innerHTML.slice(0,-1)
    if(letrasNuevas.length === 0){
        contenedorPalabra.style.visibility = "hidden"
    }else if(removerTodo === true){
        letrasActuales.innerHTML = ""
        contenedorPalabra.style.visibility = "hidden"
    }else{
        letrasActuales.innerHTML = letrasNuevas
    }
}
comportamientoCeldas()


