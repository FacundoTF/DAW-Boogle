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
    //El parámetro de la función "verificarPalabra" debería estar la palabra que formó el jugador
    if(typeof(palabra) != "string"){
        return
    }
    if(palabra.length < 3){
        return
    }
    var palabraValida = await verificarPalabra(palabra)
    if(palabraValida === true){
        //La palabrá se encontró y deben sumarse puntos
        sumarPuntos()
        resetarEstiloCelda()
        localStorage.setItem("Ultima celda", "")
    }else{
        //La palabrá no se encontró
        restarPuntos()
    }
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
