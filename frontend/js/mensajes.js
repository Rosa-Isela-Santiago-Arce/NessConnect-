
const API =
    "http://127.0.0.1:8000";

async function cargarConversaciones() {

    const usuario =
    JSON.parse(
        localStorage.getItem("usuario")
    );

if (!usuario) return;

const idUsuario =
    usuario.id_usuario;

    try {

        const respuesta =
            await fetch(
                `${API}/conversaciones/${idUsuario}`
            );
            console.log(respuesta.status);

const conversaciones = await respuesta.json();

console.log(conversaciones);



        const contenedor =
            document.getElementById(
                "listaConversaciones"
            );
console.log(contenedor);
        contenedor.innerHTML = "";

        for (
            const conversacion
            of conversaciones
        ) {

            contenedor.innerHTML += `

                <div
                    class="post"
                    onclick="
                        abrirChat(
                            ${conversacion.id_usuario},
                            ${conversacion.id_conversacion}
                        )
                    "
                >

                    <h4>

                        ${conversacion.nombre_usuario}

                    </h4>

                    <p>

                        Abrir conversación

                    </p>

                </div>

            `;

        }

    }

    catch(error) {

        console.error(error);

    }

}

function abrirChat(idUsuario, idConversacion) {

    window.location.href =
        "chat.html?id=" +
        idConversacion +
        "&receptor=" +
        idUsuario;

    }

    cargarConversaciones();