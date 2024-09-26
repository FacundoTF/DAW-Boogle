

async function verificarPalabra(palabra) {
    resultado = false
    try{
        var conexion = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + palabra)

        if(conexion.status == "404"){
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
    }else{
        //La palabrá no se encontró
    }
}

formarPalabra("He")
