var formulario = document.getElementById("FormularioContacto");
var inputs = document.querySelectorAll("#FormularioContacto input, #FormularioContacto textarea");
var expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Formato de email.
    mensaje: /^.{1,500}$/ // Mensaje hasta 500 caracteres.
};
var campos = {
    nombre: false,
    correo: false,
    mensaje: false
};
var validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "nombre");
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "correo");
            break;
        case "mensaje":
            validarCampo(expresiones.mensaje, e.target, "mensaje");
            break;
    }
};
var validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        campos[campo] = true;
    } else {
        campos[campo] = false;
    }
};
// Eventos para validar cada input/textarea
inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});
// Evento al enviar el formulario
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    if (campos.nombre && campos.correo && campos.mensaje) {
        var nombre = document.getElementById("nombre").value;
        var correo = document.getElementById("correo").value;
        var mensaje = document.getElementById("mensaje").value;
        var asunto = `Consulta de ${nombre}`;
        var body = `Nombre: ${nombre}%0AEmail: ${correo}%0AMensaje: ${mensaje}`;
        var mailtoLink = `mailto:tuemail@ejemplo.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    } else {
        alert("Por favor, completa todos los campos correctamente.");
    }
});
