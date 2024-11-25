"use strict"
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
async function formarPalabra(palabra) {
    var palabrasFormadas
    var palabraFormada
    var tablaPalabras
    var elementoP
    //El parámetro de la función "verificarPalabra" debería estar la palabra que formó el jugador
    if(typeof(palabra) != "string"){
        return
    }
    if(palabra.length < 3){
        return
    }
    var palabraValida = await verificarPalabra(palabra)
    if(palabraValida === true){
        debugger
        palabrasFormadas = localStorage.getItem("Palabras formadas")
        palabraFormada = localStorage.getItem("Palabra")
        tablaPalabras = document.getElementById("ListaPalabras")
        elementoP = document.createElement("p")
        elementoP.append(palabraFormada)
        elementoP.className = "PalabraFormada"
        //La palabrá se encontró y deben sumarse puntos
        sumarPuntos()
        resetarEstiloCelda()
        palabraFormada = palabraFormada + "-"
        palabrasFormadas = palabrasFormadas + palabraFormada
        tablaPalabras.append(elementoP)
        localStorage.setItem("Ultima celda", "")
        localStorage.setItem("Palabras formadas", palabrasFormadas)
    }else{
        //La palabrá no se encontró
        restarPuntos()
    }
}
function actualizarPalabrasHechas(){

}
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
