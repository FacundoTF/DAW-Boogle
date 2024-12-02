"use strict"
var TiempoElegido = 180
localStorage.setItem("Palabras formadas", "")
localStorage.setItem("FechaPartida", "")
//Función principal para formar la Palabra
async function FormarPalabra(Palabra) {
    var PalabrasFormadas
    var PalabraFormada
    var TablaPalabras
    var ElementoP
    var PalabraValida
    var PalabraRepetida
    var RemoverTodasPalabras
    if(typeof(Palabra) != "string"){
        return
    }
    if(Palabra.length < 3){
        return
    }
    PalabraValida = await VerificarPalabra(Palabra)
    if(PalabraValida === true){
        RemoverTodasPalabras = true
        PalabrasFormadas = localStorage.getItem("Palabras formadas")
        PalabraFormada = localStorage.getItem("Palabra")
        TablaPalabras = document.getElementById("ListaPalabras")
        PalabraRepetida = BuscarPalabraRepetida(PalabraFormada)
        if(PalabraRepetida >= 0){
            return
        }
        ElementoP = document.createElement("p")
        ElementoP.append(PalabraFormada)
        ElementoP.className = "PalabraFormada"
        SumarPuntos()
        ResetarEstiloCelda()
        RemoverLetra(RemoverTodasPalabras)
        PalabraFormada = PalabraFormada + "-"
        PalabrasFormadas = PalabrasFormadas + PalabraFormada
        TablaPalabras.append(ElementoP)
        localStorage.setItem("Ultima Celda", "")
        localStorage.setItem("Palabras formadas", PalabrasFormadas)
    }else{
        RestarPuntos()
    }
}
//Verifica si la Palabra formada existe en la API o no
async function VerificarPalabra(Palabra) {
    var Resultado = false
    try{
        var respuesta = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + Palabra)
        if(respuesta.status === 404){
            throw new Error("No se encontro la Palabra");
        }
        else{
            Resultado = true

            return Resultado
        }
    }
    catch(Error){
        return Resultado
    }
}
//Verifica si la Palabra formada es repetida o no
function BuscarPalabraRepetida(PalabraFormada){
    var PalabrasFormadas
    var Resultado
    PalabrasFormadas = localStorage.getItem("Palabras formadas")
    Resultado = PalabrasFormadas.search(PalabraFormada)
    return Resultado
}
//Coloca las letras en las Celdas de la tabla
function IniciarTabla() {
    var Abecedario = "abcdefghijklmnopqrstuvxyz"
    var Celdas = document.getElementsByClassName("CeldaPalabra")
    var Celda
    var PalabraNumero
    var LetraElegida
    for (var i = 0; i < Celdas.length; i++) {
        var Celda = Celdas.item(i)
        PalabraNumero = Math.floor(Math.random() * Abecedario.length) + 1
        LetraElegida = Abecedario.slice(PalabraNumero - 1, PalabraNumero)
        Celda.innerHTML = LetraElegida
    }
}
function MostrarEstadisticas(){
    var PuntajeTotal = localStorage.getItem("Puntaje")
    var PalabrasEncontradas = localStorage.getItem("Palabras formadas").split("-")
    var PalabraMasLarga = ""
    PalabrasEncontradas.pop()
    for (var i = 0; i < PalabrasEncontradas.length; i++) {
        if(PalabraMasLarga === ""){
            PalabraMasLarga = PalabrasEncontradas[i]
            continue
        }
        if(PalabraMasLarga.length < PalabrasEncontradas[i].length){
            PalabraMasLarga = PalabrasEncontradas[i]
        }
    }
    document.getElementById("PuntosTotales").textContent = `Puntaje total: ${PuntajeTotal}`
    document.getElementById("PalabraLarga").textContent = `Palabra más larga: ${PalabraMasLarga} (${PalabraMasLarga.length} letras)`
    document.getElementById("PalabrasFormadas").textContent = `Palabras encontradas: ${PalabrasEncontradas.join(", ")}`

}
function TiempoTerminado(){
    var AlertaModal = document.getElementById("AlertaModal")
    var Botones = document.querySelectorAll(".AlertaModalBoton")
    AlertaModal.style.display = "flex"
    for (var i = 0; i < Botones.length; i++) {
        Botones[i].addEventListener("click", event => {
            if(event.currentTarget.innerHTML === "Volver a jugar"){
                AlertaModal.style.display = "none"
                location.reload()
            }
            if(event.currentTarget.innerHTML === "Registrar puntaje"){
                AlertaModal.style.display = "none"
                window.open("", "_self")//Iria a la página de contacto
            }
            if(event.currentTarget.innerHTML === "Salir"){
                AlertaModal.style.display = "none"
                window.open("/html/registro.html", "_self")
            }
        })
    }
}
function ComenzarTemporizador() {
    var Minutos = Math.floor(TiempoElegido / 60)
    var Segundos = TiempoElegido % 60
    var Temporizador = document.querySelector("#Temporizador>p")
    Temporizador.textContent = `${Minutos.toString().padStart(2, '0')}:${Segundos.toString().padStart(2, '0')}`
    if (TiempoElegido > 0) {
        TiempoElegido--
    } else {
        MostrarEstadisticas()
        TiempoTerminado()
        clearInterval(IntervaloTiempo)
    }
}
function GuardarMomentoPartida(){
    var FechaActual = new Date()
    var Dia = FechaActual.getDate()
    var Mes = FechaActual.getMonth() + 1
    var Año = FechaActual.getFullYear()
    var Horas = FechaActual.getHours();
    var Minutos = FechaActual.getMinutes();
    var Segundos = FechaActual.getSeconds();
    var DiaFormateado = Dia.toString().padStart(2, '0');
    var MesFormateado = Mes.toString().padStart(2, '0');
    var HorasFormateadas = Horas.toString().padStart(2, '0');
    var MinutosFormateados = Minutos.toString().padStart(2, '0');
    var SegundosFormateados = Segundos.toString().padStart(2, '0');
    localStorage.setItem("FechaPartida", `${DiaFormateado}/${MesFormateado}/${Año} ${HorasFormateadas}:${MinutosFormateados}:${SegundosFormateados}`)
}
var IntervaloTiempo = setInterval(ComenzarTemporizador, 1000)
IniciarTabla()
GuardarMomentoPartida()
ComenzarTemporizador(TiempoElegido)
