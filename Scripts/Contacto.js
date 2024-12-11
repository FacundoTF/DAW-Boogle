"use strict"
var Formulario = document.getElementById("FormularioContacto")
var Inputs = document.querySelectorAll("#FormularioContacto Input, #FormularioContacto textarea")
var Expresiones = {
    Nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    Correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Formato de email.
    Mensaje: /^.{1,500}$/ // Limita a 500 caracteres.
}
var Campos = {
    Nombre: false,
    Correo: false,
    Mensaje: false
}
function ValidarCampo(Expresion, Input, Campo) {
    var Grupo = document.getElementById("grupo__" + Campo.toLowerCase())
    var ErrorMensaje = Grupo.querySelector(".formulario__input-error")
    if (Expresion.test(Input.value)) {
        Campos[Campo] = true
        Grupo.classList.remove("formulario__grupo-incorrecto")
        Grupo.classList.add("formulario__grupo-correcto")
        ErrorMensaje.classList.remove("formulario__input-error-activo")
    } else {
        Campos[Campo] = false
        Grupo.classList.add("formulario__grupo-incorrecto")
        Grupo.classList.remove("formulario__grupo-correcto")
        ErrorMensaje.classList.add("formulario__input-error-activo")
    }
}
function ValidarFormulario(E) {
    switch (E.target.name) {
        case "Nombre":
            ValidarCampo(Expresiones.Nombre, E.target, "Nombre")
            break
        case "Correo":
            ValidarCampo(Expresiones.Correo, E.target, "Correo")
            break
        case "Mensaje":
            ValidarCampo(Expresiones.Mensaje, E.target, "Mensaje")
            break
    }
}
// Eventos para validar cada input/textarea
for (var I = 0; I < Inputs.length; I++) {
    Inputs[I].addEventListener("keyup", ValidarFormulario)
    Inputs[I].addEventListener("blur", ValidarFormulario)
}
// Evento al enviar el formulario
Formulario.addEventListener("submit", function (E) {
    E.preventDefault()
    if (Campos.Nombre && Campos.Correo && Campos.Mensaje) {
        var Nombre = document.getElementById("nombre").value
        var Correo = document.getElementById("correo").value
        var Mensaje = document.getElementById("mensaje").value
        var Asunto = "Consulta de " + Nombre;
        var Body = "Nombre: " + Nombre + " Email: " + Correo + " Mensaje: " + Mensaje
        var MailtoLink = "mailto:tuemail@ejemplo.com?subject=" + encodeURIComponent(Asunto) + "&body=" + encodeURIComponent(Body)
        window.location.href = MailtoLink
        document.getElementById("formulario__mensaje-exito").style.display = "block"
        Formulario.reset()
    } else {
        var Grupos = document.querySelectorAll(".formulario__grupo")
        for (var J = 0; J < Grupos.length; J++) {
            if (!Campos[Grupos[J].id.split("__")[1]]) {
                Grupos[J].classList.add("formulario__grupo-incorrecto")
                Grupos[J].querySelector(".formulario__input-error").classList.add("formulario__input-error-activo")
            }
        }
    }
})
