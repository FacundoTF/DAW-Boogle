const formulario = document.getElementById('FormularioContacto');
const inputs = document.querySelectorAll('#FormularioContacto input, #FormularioContacto textarea');

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Formato de email.
    mensaje: /^.{1,500}$/ // Mensaje hasta 500 caracteres.
};

const campos = {
    nombre: false,
    correo: false,
    mensaje: false
};

const validarFormulario = (e) => {
    switch (e.target.name) {
        case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case 'correo':
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case 'mensaje':
            validarCampo(expresiones.mensaje, e.target, 'mensaje');
            break;
    }
};

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        campos[campo] = true;
        console.log(`${campo} válido`);
    } else {
        campos[campo] = false;
        console.log(`${campo} inválido`);
    }
};

// Eventos para validar cada input/textarea
inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

// Evento al enviar el formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log('Estado de campos antes del envío:', campos);

    if (campos.nombre && campos.correo && campos.mensaje) {
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;

        const asunto = `Consulta de ${nombre}`;
        const body = `Nombre: ${nombre}%0AEmail: ${correo}%0AMensaje: ${mensaje}`;
        const mailtoLink = `mailto:tuemail@ejemplo.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoLink;
    } else {
        alert('Por favor, completa todos los campos correctamente.');
    }
});
