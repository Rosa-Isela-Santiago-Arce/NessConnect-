const API = "http://127.0.0.1:8000";

const usuario = JSON.parse(localStorage.getItem("usuario"));

const params = new URLSearchParams(window.location.search);
const idReceptor = Number(params.get("receptor"));

if (!idReceptor) {
    console.error("No hay receptor en la URL");
}

async function cargarMensajes() {

    try {

        const res = await fetch(
            `${API}/chat/${usuario.id_usuario}/${idReceptor}`
        );

        const mensajes = await res.json();
        console.log(mensajes);

        const contenedor = document.getElementById("mensajes");

        contenedor.innerHTML = "";

        const miId = Number(usuario.id_usuario);

        mensajes.forEach(m => {

            const esMio = Number(m.id_emisor) === miId;

            const div = document.createElement("div");
            div.className = esMio ? "mensaje-propio" : "mensaje-ajeno";

            const burbuja = document.createElement("div");
            burbuja.className = esMio ? "burbuja-propia" : "burbuja-ajena";

            burbuja.textContent = m.contenido;

            div.appendChild(burbuja);
            contenedor.appendChild(div);

        });

        contenedor.scrollTop = contenedor.scrollHeight;

    } catch (e) {
        console.error(e);
    }
}
async function enviarMensaje() {

    const texto = document.getElementById("mensajeTexto").value;

    if (!texto.trim()) return;

    try {

        const res = await fetch(`${API}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                id_emisor: usuario.id_usuario,
                id_receptor: idReceptor,
                contenido: texto

                // ❌ quitamos id_conversacion porque lo maneja backend
            })
        });

        const datos = await res.json();

console.log(datos);

if (datos.mensaje === "OK") {

            document.getElementById("mensajeTexto").value = "";
            cargarMensajes();

        } else {
            alert(datos.mensaje);
        }

    } catch (error) {
        console.error(error);
    }
}

async function cargarNombreUsuario() {

    try {

        const res = await fetch(
            `${API}/usuarios/${idReceptor}`
        );

        const usuarioReceptor = await res.json();

document.getElementById("nombreUsuario").textContent =
    usuarioReceptor.nombre_usuario;
    }

    catch (error) {

        console.error(error);

    }

}
console.log("USUARIO LOCALSTORAGE:", usuario);
console.log("MI ID:", usuario?.id_usuario);

cargarNombreUsuario();

cargarMensajes();

setInterval(cargarMensajes, 1000);