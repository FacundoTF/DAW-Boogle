"use strict"
localStorage.setItem("Palabras formadas", "")
//Función principal para formar la palabra
async function formarPalabra(palabra) {
    var palabrasFormadas
    var palabraFormada
    var tablaPalabras
    var elementoP
    var palabraValida
    var palabraRepetida
    if(typeof(palabra) != "string"){
        return
    }
    if(palabra.length < 3){
        return
    }
    palabraValida = await verificarPalabra(palabra)
    if(palabraValida === true){
        palabrasFormadas = localStorage.getItem("Palabras formadas")
        palabraFormada = localStorage.getItem("Palabra")
        tablaPalabras = document.getElementById("ListaPalabras")
        palabraRepetida = buscarPalabraRepetida(palabraFormada)
        if(palabraRepetida >= 0){
            return
        }
        elementoP = document.createElement("p")
        elementoP.append(palabraFormada)
        elementoP.className = "PalabraFormada"
        sumarPuntos()
        resetarEstiloCelda()
        palabraFormada = palabraFormada + "-"
        palabrasFormadas = palabrasFormadas + palabraFormada
        tablaPalabras.append(elementoP)
        localStorage.setItem("Ultima celda", "")
        localStorage.setItem("Palabras formadas", palabrasFormadas)
    }else{
        restarPuntos()
    }
}
//Verifica si la palabra formada existe en la API o no
async function verificarPalabra(palabra) {
    var resultado = false
    try{
        var respuesta = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + palabra)

        if(respuesta.status == "404"){
            throw new Error("No se encontro la palabra");
        }
        else{
            resultado = true

            return resultado
        }
    }
    catch(Error){
        return resultado
    }
}
//Verifica si la palabra formada es repetida o no
function buscarPalabraRepetida(palabraFormada){
    var palabrasFormadas
    var resultado
    palabrasFormadas = localStorage.getItem("Palabras formadas")
    resultado = palabrasFormadas.search(palabraFormada)
    return resultado
}
//Coloca las letras en las celdas de la tabla
function iniciarTabla() {
    var abecedario = "abcdefghijklmnopqrstuvxyz"
    var celdas = document.getElementsByClassName("CeldaPalabra")
    var celda
    var palabraNumero
    var letraElegida
    for (var i = 0; i < celdas.length; i++) {
        var celda = celdas.item(i)
        palabraNumero = Math.floor(Math.random() * abecedario.length) + 1
        letraElegida = abecedario.slice(palabraNumero - 1, palabraNumero)
        celda.innerHTML = letraElegida
    }
}
iniciarTabla()
