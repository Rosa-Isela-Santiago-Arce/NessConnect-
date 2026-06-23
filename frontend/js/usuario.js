const API = "http://127.0.0.1:8000";

async function cargarPerfilUsuario() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const idUsuario =
        params.get("id");

    if (!idUsuario) {

        console.error(
            "No se recibió ID de usuario"
        );

        return;
    }

    try {

        const respuestaUsuario =
            await fetch(
                `${API}/usuarios/${idUsuario}`
            );

        if (!respuestaUsuario.ok) {

            throw new Error(
                "No se pudo obtener el usuario"
            );

        }

        const usuario =
            await respuestaUsuario.json();

        const nombre =
            document.getElementById(
                "nombreUsuario"
            );

        const carrera =
            document.getElementById(
                "carreraUsuario"
            );

        const semestre =
            document.getElementById(
                "semestreUsuario"
            );

        const materias =
            document.getElementById(
                "materiasUsuario"
            );

        const foto =
            document.getElementById(
                "fotoUsuario"
            );

        if (nombre)
            nombre.innerText =
                usuario.nombre_usuario;

        if (carrera)
            carrera.innerText =
                "🎓 Carrera: " +
                (
                    usuario.carrera ||
                    "No especificada"
                );

        if (semestre)
            semestre.innerText =
                "📚 Semestre: " +
                (
                    usuario.semestre ||
                    "No especificado"
                );

        if (materias)
            materias.innerHTML =
                usuario.materias ||
                "Sin materias";

        if (
            foto &&
            usuario.foto_perfil
        ) {

            foto.src =
                `${API}/${usuario.foto_perfil}`;

        }

        const respuestaPublicaciones =
            await fetch(
                `${API}/publicaciones/usuario/${idUsuario}`
            );

        if (!respuestaPublicaciones.ok) {

            throw new Error(
                "No se pudieron cargar las publicaciones"
            );

        }

        const publicaciones =
            await respuestaPublicaciones.json();

        const contenedor =
            document.getElementById(
                "publicacionesUsuario"
            );

        if (!contenedor) return;

        contenedor.innerHTML = "";

        if (
            publicaciones.length === 0
        ) {

            contenedor.innerHTML = `

                <div class="post">

                    <p>
                        Este usuario aún no tiene publicaciones.
                    </p>

                </div>

            `;

            return;

        }

        publicaciones.forEach(pub => {

            contenedor.innerHTML += `

                <div class="post">

                    <h4>
                        ${pub.titulo}
                    </h4>

                    <p>
                        ${pub.contenido}
                    </p>

                    <button
                        onclick="
                            location.href=
                            'publicacion.html?id=${pub.id_publicacion}'
                        "
                    >
                        Ver publicación
                    </button>

                </div>

            `;

        });

    }

    catch(error) {

        console.error(
            "Error:",
            error
        );

    }

}

const btnMensaje =
    document.getElementById(
        "btnMensaje"
    );

if (btnMensaje) {

    btnMensaje.addEventListener(
        "click",
        enviarSolicitudChat
    );

}

const btnAgregarAmigo =
    document.getElementById(
        "btnAgregarAmigo"
    );

if (btnAgregarAmigo) {

    btnAgregarAmigo.addEventListener(
        "click",
        agregarAmigo
    );

}
async function enviarSolicitudChat() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const idReceptor =
        params.get("id");

    const idEmisor =
        localStorage.getItem(
            "id_usuario"
        );

    try {

        const respuesta =
            await fetch(
                `${API}/solicitudes-chat`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        id_emisor:
                            Number(idEmisor),

                        id_receptor:
                            Number(idReceptor)

                    })

                }
            );

        const datos =
            await respuesta.json();

        alert(
            datos.mensaje
        );

    }

    catch(error) {

        console.error(error);

        alert(
            "Error al enviar solicitud"
        );

    }

}
async function enviarSolicitudChat() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const idReceptor =
        params.get("id");

    const idEmisor =
        localStorage.getItem(
            "id_usuario"
        );

    try {

        const respuesta =
            await fetch(
                `${API}/solicitudes-chat`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        id_emisor:
                        Number(idEmisor),

                        id_receptor:
                        Number(idReceptor)

                    })

                }
            );

        const datos =
            await respuesta.json();

        alert(
            datos.mensaje
        );

    }

    catch(error) {

        console.error(error);

        alert(
            "Error al enviar solicitud"
        );

    }

}










if (
    window.location.pathname
    .includes("usuario.html")
) {

    cargarPerfilUsuario();

}