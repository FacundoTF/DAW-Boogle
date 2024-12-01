"use strict"
var tiempoElegido = 180
localStorage.setItem("Palabras formadas", "")
//Función principal para formar la palabra
async function formarPalabra(palabra) {
    var palabrasFormadas
    var palabraFormada
    var tablaPalabras
    var elementoP
    var palabraValida
    var palabraRepetida
    var removerTodasPalabras
    if(typeof(palabra) != "string"){
        return
    }
    if(palabra.length < 3){
        return
    }
    palabraValida = await verificarPalabra(palabra)
    if(palabraValida === true){
        removerTodasPalabras = true
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
        removerLetra(removerTodasPalabras)
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
        if(respuesta.status === 404){
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
function mostrarEstadisticas(){
    var puntajeTotal = localStorage.getItem("Puntaje")
    var palabrasEncontradas = localStorage.getItem("Palabras formadas").split("-")
    var palabraMasLarga
    palabrasEncontradas.pop()
    for (var i = 0; i < palabrasEncontradas.length; i++) {
        if(palabraMasLarga === undefined){
            palabraMasLarga = palabrasEncontradas[i]
            continue
        }
        if(palabraMasLarga.length < palabrasEncontradas[i].length){
            palabraMasLarga = palabrasEncontradas[i]
        }
    }
    document.getElementById("PuntosTotales").textContent = `Puntaje total: ${puntajeTotal}`
    document.getElementById("PalabraLarga").textContent = `Palabra más larga: ${palabraMasLarga} (${palabraMasLarga.length} letras)`
    document.getElementById("PalabrasFormadas").textContent = `Palabras encontradas: ${palabrasEncontradas.join(", ")}`

}
function tiempoTerminado(){
    var alertaModal = document.getElementById("AlertaModal")
    var botones = document.querySelectorAll(".AlertaModalBoton")
    alertaModal.style.display = "flex"
    for (var i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", event => {
            if(event.currentTarget.innerHTML === "Volver a jugar"){
                alertaModal.style.display = "none"
                location.reload()
            }
            if(event.currentTarget.innerHTML === "Registrar puntaje"){
                alertaModal.style.display = "none"
                window.open("", "_self")//Iria a la página de contacto
            }
            if(event.currentTarget.innerHTML === "Salir"){
                alertaModal.style.display = "none"
                window.open("/html/registro.html", "_self")
            }
        })
    }
}
function comenzarTemporizador() {
    var minutos = Math.floor(tiempoElegido / 60)
    var segundos = tiempoElegido % 60
    var temporizador = document.querySelector("#Temporizador>p")
    temporizador.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`
    if (tiempoElegido > 0) {
        tiempoElegido--
    } else {
        mostrarEstadisticas()
        tiempoTerminado()
        clearInterval(intervaloTiempo)
    }
}
var intervaloTiempo = setInterval(comenzarTemporizador, 1000)
iniciarTabla()
comenzarTemporizador(tiempoElegido)
