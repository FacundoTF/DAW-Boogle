var formulario = document.getElementById("FormularioContacto")
var inputs = document.querySelectorAll("#FormularioContacto input, #FormularioContacto textarea")
var expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Formato de email.
    mensaje: /^.{1,500}$/ // Limita a 500 caracteres.
}
var campos = {
    nombre: false,
    correo: false,
    mensaje: false
}
function validarCampo(expresion, input, campo) {
    var grupo = document.getElementById("grupo__" + campo)
    var errorMensaje = grupo.querySelector(".formulario__input-error")

    if (expresion.test(input.value)) {
        campos[campo] = true
        grupo.classList.remove("formulario__grupo-incorrecto")
        grupo.classList.add("formulario__grupo-correcto")
        errorMensaje.classList.remove("formulario__input-error-activo")
    } else {
        campos[campo] = false
        grupo.classList.add("formulario__grupo-incorrecto")
        grupo.classList.remove("formulario__grupo-correcto")
        errorMensaje.classList.add("formulario__input-error-activo")
    }
}
function validarFormulario(e) {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre")
            break
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo")
            break
        case "mensaje":
            validarCampo(expresiones.mensaje, e.target, "mensaje")
            break
    }
}
// Eventos para validar cada input/textarea
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keyup", validarFormulario)
    inputs[i].addEventListener("blur", validarFormulario)
}
// Evento al enviar el formulario
formulario.addEventListener("submit", function (e) {
    e.preventDefault()
    if (campos.nombre && campos.correo && campos.mensaje) {
        var nombre = document.getElementById("nombre").value
        var correo = document.getElementById("correo").value
        var mensaje = document.getElementById("mensaje").value
        var asunto = "Consulta de " + nombre;
        var body = "Nombre: " + nombre + "%0AEmail: " + correo + "%0AMensaje: " + mensaje
        var mailtoLink = "mailto:tuemail@ejemplo.com?subject=" + encodeURIComponent(asunto) + "&body=" + encodeURIComponent(body)
        window.location.href = mailtoLink
        document.getElementById("formulario__mensaje-exito").style.display = "block"
        formulario.reset()
    } else {
        var grupos = document.querySelectorAll(".formulario__grupo")
        for (var j = 0; j < grupos.length; j++) {
            if (!campos[grupos[j].id.split("__")[1]]) {
                grupos[j].classList.add("formulario__grupo-incorrecto")
                grupos[j].querySelector(".formulario__input-error").classList.add("formulario__input-error-activo")
            }
        }
    }
})
