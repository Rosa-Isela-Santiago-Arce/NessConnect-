const API = "http://127.0.0.1:8000";
console.log("FUNCIONES DISPONIBLES OK");

setInterval(() => {
    cargarPublicaciones();
}, 5000);


/* ===================== */
/* REGISTRO */
/* ===================== */

const btnRegistro =
    document.getElementById(
        "btnRegistro"
    );
if (btnRegistro) {
    btnRegistro.addEventListener(
        "click",
        registrarUsuario
    );
}
async function registrarUsuario() {
    const nombre =
        document.getElementById(
            "usuario"
        ).value;
    const correo =
        document.getElementById(
            "correo"
        ).value;
    const telefono =
        document.getElementById(
            "telefono"
        ).value;
    const password =
        document.getElementById(
            "password"
        ).value;
    try {
        const respuesta =
            await fetch(
                `${API}/usuarios`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        nombre_usuario:
                            nombre,
                        correo:
                            correo,
                        telefono:
                            telefono,
                        password:
                            password
                    })
                }
            );

        const datos =
            await respuesta.json();
        alert(
            "Usuario registrado 🎮"
        );

        console.log(
            datos
        );

    } catch (error) {

        console.log(error);

    }

}

/* ===================== */
/* LOGIN */
/* ===================== */

const btnLogin =
    document.getElementById(
        "btnLogin"
    );

if (btnLogin) {

    btnLogin.addEventListener(
        "click",
        iniciarSesion
    );

}
async function iniciarSesion() {

    const correo =
        document.getElementById(
            "correo"
        ).value;

    const password =
        document.getElementById(
            "password"
        ).value;

    try {

        const respuesta =
            await fetch(
                `${API}/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        correo: correo,
                        password: password
                    })
                }
            );

        const datos =
            await respuesta.json();

    if (
    datos.mensaje ===
    "Login correcto"
) {

    localStorage.setItem(
        "usuario",
        JSON.stringify({
            id_usuario: datos.id_usuario,
            nombre_usuario: datos.usuario
        })
    );
    localStorage.setItem(
    "id_usuario",
    datos.id_usuario
);

    

    alert(
        "Bienvenido " +
        datos.usuario
    );

    window.location.href =
        "inicio.html";

} else {

            alert(
                datos.mensaje
            );

        }

    } catch (error) {

        console.log(error);

    }

}

/* ===================== */
/* PUBLICACIONES */
/* ===================== */

const btnPublicar =
    document.getElementById(
        "btnPublicar"
    );

if (btnPublicar) {

    btnPublicar.addEventListener(
        "click",
        publicar
    );

}
async function publicar() {

    const titulo =
        document.getElementById(
            "tituloPublicacion"
        ).value;

    const contenido =
        document.getElementById(
            "contenidoPublicacion"
        ).value;

    const archivo =
        document.getElementById(
            "archivoPublicacion"
        ).files[0];

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    const formData =
        new FormData();

    formData.append(
        "id_usuario",
        usuario.id_usuario
    );

    formData.append(
        "titulo",
        titulo
    );

    formData.append(
        "contenido",
        contenido
    );

    if (archivo) {

        formData.append(
            "archivo",
            archivo
        );

    }

    try {

        const respuesta =
            await fetch(
                `${API}/publicaciones`,
                {
                    method: "POST",

                    body:
                        formData
                }
            );

        const datos =
            await respuesta.json();

        alert(
            datos.mensaje
        );

        document.getElementById(
            "tituloPublicacion"
        ).value = "";

        document.getElementById(
            "contenidoPublicacion"
        ).value = "";

        document.getElementById(
            "archivoPublicacion"
        ).value = "";

        cargarPublicaciones();

    }

    catch (error) {

        console.log(
            error
        );

    }

}
/* ===================== */
/* CARGAR PUBLICACIONES */
/* ===================== */
async function cargarPublicaciones() {

    const feed =
        document.getElementById(
            "feed"
        );

    if (!feed) return;

    try {

        const respuestaPublicaciones =
            await fetch(
                `${API}/publicaciones`
            );

        const publicaciones =
            await respuestaPublicaciones.json();

        const respuestaUsuarios =
            await fetch(
                `${API}/usuarios`
            );

        const usuarios =
            await respuestaUsuarios.json();

        feed.innerHTML = "";

        publicaciones.reverse();

        publicaciones.forEach(
            publicacion => {

                const usuario =
                    usuarios.find(
                        u =>
                        u.id_usuario ===
                        publicacion.id_usuario
                    );

                const nombre =
                    usuario
                    ? usuario.nombre_usuario
                    : "Usuario";

                const carrera =
                    usuario?.carrera
                    || "";

                const semestre =
                    usuario?.semestre
                    || "";

                const usuarioActual =
                    JSON.parse(
                        localStorage.getItem(
                            "usuario"
                        )
                    );

                feed.innerHTML += `

<div
    class="post"
    onclick="
        abrirPublicacion(
            ${publicacion.id_publicacion}
        )
    "
    style="
        cursor:pointer;
    "
>
                    <div
                        style="
                            display:flex;
                            align-items:center;
                            gap:10px;
                        "
                    >

                     <img
                     src="${
                      usuario?.foto_perfil
                      ?
                       `${API}/${usuario.foto_perfil}`
                      :
                     "img/default.png"
                      }"
    onclick="
        event.stopPropagation();
        verPerfil(${publicacion.id_usuario});
    "
    style="
        width:45px;
        height:45px;
        border-radius:50%;
        object-fit:cover;
        cursor:pointer;
    "
>

                        <div>

<h4
    onclick="
        event.stopPropagation();
        verPerfil(${publicacion.id_usuario});
    "
    style="
        cursor:pointer;
        margin:0;
    "
>

                                ${nombre}

                            </h4>

                            <small>

                                ${carrera}
                                ${
                                    semestre
                                    ?
                                    " · " + semestre + "° semestre"
                                    :
                                    ""
                                }

                            </small>

                        </div>

                    </div>

                    <br>

                    <h3>

                        📌 ${publicacion.titulo}

                    </h3>


                    <p>
                    ${publicacion.contenido.length > 80
                    ? publicacion.contenido.substring(0, 80) + "..."
                    : publicacion.contenido}
                    </p>

                    ${
                    publicacion.archivo
                    ?

                    (
                        ["jpg", "jpeg", "png", "gif", "webp"]
                        .includes(
                            publicacion.tipo_archivo
                        )

                        ?

                        `
<img
    src="${API}/${publicacion.archivo}"
    style="
        width:100%;
        height:150px;
        object-fit:cover;
        border-radius:10px;
        margin-top:10px;
    "
>
                        `

                        :
                        ["mp4"]
                        .includes(
                            publicacion.tipo_archivo
                        )

                        ?

                        `
                        <video
                            controls
                            style="
                                width:100%;
                                margin-top:10px;
                            "
                        >

                            <source
                                src="http://127.0.0.1:8000/${publicacion.archivo}"
                            >

                        </video>
                        `

                        :

                        `
                        <a
                            href="http://127.0.0.1:8000/${publicacion.archivo}"
                            target="_blank"
                        >
                            📎 Descargar archivo
                        </a>
                        `
                    )

                    :

                    ""
                    }

                   ${
usuarioActual &&
usuarioActual.id_usuario ==
publicacion.id_usuario &&
window.location.pathname.includes("publicacion.html")

?

`
<br><br>

<button onclick="editarPublicacion(${publicacion.id_publicacion})">
    ✏️ Editar
</button>

<button onclick="eliminarPublicacion(${publicacion.id_publicacion})">
    🗑 Eliminar
</button>
`

:

""
}

                    <br><br>

<button
    onclick="
        event.stopPropagation();
        darLike(${publicacion.id_publicacion});
    "
>
                        ❤️ ${publicacion.likes}
                    </button>

                    <br><br>

                  <input
    type="text"
    id="comentario-${publicacion.id_publicacion}"
    placeholder="Escribe un comentario..."
    onclick="event.stopPropagation();"
>

<button
    onclick="
        event.stopPropagation();
        crearComentario(${publicacion.id_publicacion});
    "
>
                        Comentar
                    </button>

                    <div
                        id="comentarios-${publicacion.id_publicacion}"
                    >
                    </div>

                </div>

                `;

            }
        );

    } catch (error) {

        console.log(
            error
        );

    }

}
/* ===================== */
/* PERFIL */
/* ===================== */

async function cargarPerfil() {

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    if (!usuario) return;

    const nombre =
        document.getElementById(
            "nombrePerfil"
        );

    if (!nombre) return;

    try {

        const respuesta =
            await fetch(
                `${API}/usuarios/${usuario.id_usuario}`
            );

        const datos =
            await respuesta.json();

        document.getElementById(
            "nombrePerfil"
        ).textContent =
            datos.nombre_usuario;

        document.getElementById(
            "correoPerfil"
        ).textContent =
            datos.correo;

        document.getElementById(
            "telefonoPerfil"
        ).textContent =
            datos.telefono;

        document.getElementById(
            "monedasPerfil"
        ).textContent =
            datos.monedas;

        document.getElementById(
           "carreraPerfil"
           ).textContent =
           "Carrera: " +
        (
           datos.carrera
          || "No especificada"
        );

        document.getElementById(
            "semestrePerfil"
            ).textContent =
            "Semestre: " +
            (
            datos.semestre
        || "No especificado"
            );

        document.getElementById(
            "materiasPerfil"
            ).textContent =
            "Materias: " +
            (
            datos.materias
            || "No especificadas"
            );

            document.getElementById(
        "fotoPerfil"
           ).src =
           datos.foto_perfil
           ? `${API}/${datos.foto_perfil}`
           : "img/default.png";

    } catch (error) {

        console.log(error);

    }

}
async function cargarMisPublicaciones() {

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    if (!usuario) return;

    const contenedor =
        document.getElementById(
            "misPublicaciones"
        );

    if (!contenedor) return;

    try {

        const respuesta =
            await fetch(
                `${API}/publicaciones`
            );

        const publicaciones =
            await respuesta.json();

        contenedor.innerHTML = "";

        publicaciones.forEach(
            publicacion => {

                if (
                    publicacion.id_usuario ===
                    usuario.id_usuario
                ) {

                    contenedor.innerHTML += `
                        <div class="post">

                            <p>
                                ${publicacion.contenido}
                            </p>

                        </div>
                    `;

                }

            }
        );

    } catch (error) {

        console.log(error);

    }

}
async function cargarMensajes(idReceptor) {

    if (!idReceptor) {
        console.log("idReceptor no definido");
        return;
    }

    const contenedor = document.getElementById("mensajes");
    if (!contenedor) return;

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const res = await fetch(
        `${API}/chat/${usuario.id_usuario}/${idReceptor}`
    );
    const mensajes = await res.json();
    if (!Array.isArray(mensajes)) {
        console.log(mensajes);
        return;
    }
    contenedor.innerHTML = "";

    mensajes.forEach(m => {

        const esMio = m.id_emisor === usuario.id_usuario;

        contenedor.innerHTML += `
            <div style="text-align:${esMio ? 'right' : 'left'}">
                <div style="
                    display:inline-block;
                    padding:10px;
                    margin:5px;
                    border-radius:10px;
                    background:${esMio ? '#4CAF50' : '#ddd'};
                    color:${esMio ? 'white' : 'black'};
                ">
                    ${m.contenido}
                </div>
            </div>
        `;
    });
}
async function enviarMensaje() {

    const texto =
        document.getElementById(
            "mensajeTexto"
        ).value;

    const usuario =
        JSON.parse(
            localStorage.getItem("usuario")
        );



        
    await fetch(`${API}/chat`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            id_emisor:
                usuario.id_usuario,

            id_receptor:
                receptorActivo,

            id_conversacion:
                chatActivo,

            contenido:
                texto

        })

    });

    document.getElementById(
        "mensajeTexto"
    ).value = "";

    cargarMensajes(
        receptorActivo
    );
}

/* ===================== */
/* LIKES */
/* ===================== */
async function darLike(idPublicacion) {

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    await fetch(`${API}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id_usuario: usuario.id_usuario,
            id_publicacion: idPublicacion
        })
    });

    // 🔥 RECARGAR SOLO EL DETALLE
    await cargarDetallePublicacion();
}
/* ===================== */
/* COMENTARIOS */
/* ===================== */

async function crearComentario(
    idPublicacion
) {

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    const contenido =
        document.getElementById(
            `comentario-${idPublicacion}`
        ).value;

    try {

        await fetch(
            `${API}/comentarios`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    id_usuario:
                        usuario.id_usuario,

                    id_publicacion:
                        idPublicacion,

                    contenido:
                        contenido
                })
            }
        );

        cargarPublicaciones();

    } catch (error) {

        console.log(error);

    }

}

async function cargarComentarios(idPublicacion) {

const contenedor = document.getElementById(`comentarios-${idPublicacion}`);    if (!contenedor) return;

    const res = await fetch(`${API}/comentarios`);
    const comentarios = await res.json();

    const resU = await fetch(`${API}/usuarios`);
    const usuarios = await resU.json();

    contenedor.innerHTML = "";

    comentarios.forEach(c => {

        if (c.id_publicacion == idPublicacion) {

            const u = usuarios.find(x => x.id_usuario == c.id_usuario);

            contenedor.innerHTML += `
                <div class="post">
                    <b>${u?.nombre_usuario || "Usuario"}</b>
                    <p>${c.contenido}</p>
                </div>
            `;
        }
    });
}
/* ===================== */
/* AMIGOS */
/* ===================== */

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

async function agregarAmigo() {

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    const idAmigo =
        document.getElementById(
            "idAmigo"
        ).value;

    try {

        const respuesta =
            await fetch(
                `${API}/amigos`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        id_usuario:
                            usuario.id_usuario,

                        id_amigo_usuario:
                            idAmigo
                    })
                }
            );

        const datos =
            await respuesta.json();

        alert(
            datos.mensaje
        );

    } catch (error) {

        console.log(error);

    }

}
/* ===================== */
/* BUSCAR USUARIOS */
/* ===================== */

const btnBuscarUsuario =
    document.getElementById(
        "btnBuscarUsuario"
    );

if (btnBuscarUsuario) {

    btnBuscarUsuario.addEventListener(
        "click",
        buscarUsuarios
    );

}
async function buscarUsuarios() {

    const texto =
        document.getElementById(
            "buscarUsuario"
        ).value
        .toLowerCase();

    const resultado =
        document.getElementById(
            "resultadoBusqueda"
        );

    resultado.innerHTML = "";

    const usuarioActual =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    try {

        const respuesta =
            await fetch(
                `${API}/usuarios`
            );

        const usuarios =
            await respuesta.json();

        usuarios.forEach(
            usuario => {

                if (

                    usuario.id_usuario !=
                    usuarioActual.id_usuario

                    &&

                    usuario.nombre_usuario
                    .toLowerCase()
                    .includes(texto)

                ) {

                    resultado.innerHTML += `
                        <div class="post">


                        <h4
                        onclick="
                        window.location=
                       'usuario.html?id=${usuario.id_usuario}'
                       "
                       style="
                       cursor:pointer;
                       "
                       >

                      👤 ${usuario.nombre_usuario}

                       </h4>

                            <p>
                                ID: ${usuario.id_usuario}
                            </p>

                            <button
                                onclick="enviarSolicitud(${usuario.id_usuario})"
                            >
                                ➕ Agregar amigo
                            </button>

                        </div>
                    `;

                }

            }
        );

    } catch (error) {

        console.log(error);

    }

}
async function enviarSolicitud(
    idAmigo
) {

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    try {

        const respuesta =
            await fetch(
                `${API}/amigos`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        id_usuario:
                            usuario.id_usuario,

                        id_amigo_usuario:
                            idAmigo
                    })
                }
            );

        const datos =
            await respuesta.json();

        alert(
            datos.mensaje
        );

    } catch (error) {

        console.log(error);

    }

}
/* ===================== */
/* NOTIFICACIONES */
/* ===================== */

async function cargarNotificaciones() {

    const lista =
        document.getElementById(
            "listaNotificaciones"
        );

    if (!lista) return;

    try {

        const respuesta =
            await fetch(
                `${API}/notificaciones`
            );

        const notificaciones =
            await respuesta.json();

        lista.innerHTML = "";

        notificaciones.reverse();

        notificaciones.forEach(
            notificacion => {

                lista.innerHTML += `
                    <div class="post">

                        <h4>
                            🔔 ${notificacion.tipo}
                        </h4>

                        <p>
                            ${notificacion.mensaje}
                        </p>

                    </div>
                `;

            }
        );

    } catch (error) {

        console.log(error);

    }

}
/* ===================== */
/* CARGAR AMIGOS */
/* ===================== */
async function cargarAmigos() {

    const lista =
        document.getElementById(
            "listaAmigos"
        );

    if (!lista) return;

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    try {

        const respuestaAmigos =
            await fetch(
                `${API}/amigos`
            );

        const amigos =
    await respuestaAmigos.json();

const respuestaUsuarios =
    await fetch(`${API}/usuarios`);

const usuarios =
    await respuestaUsuarios.json();

console.log("USUARIOS:", usuarios);

        lista.innerHTML = "";

        amigos.forEach(
            amigo => {

                if (
                    amigo.estado === "aceptado" &&
                    (
                        amigo.id_usuario ==
                        usuario.id_usuario
                        ||
                        amigo.id_amigo_usuario ==
                        usuario.id_usuario
                    )
                ) {

                    let idOtroUsuario;

                    if (
                        amigo.id_usuario ==
                        usuario.id_usuario
                    ) {

                        idOtroUsuario =
                            amigo.id_amigo_usuario;

                    } else {

                        idOtroUsuario =
                            amigo.id_usuario;

                    }

                    const usuarioAmigo =
                        usuarios.find(
                            u =>
                            u.id_usuario ==
                            idOtroUsuario
                        );

                    const nombre =
                        usuarioAmigo
                        ? usuarioAmigo.nombre_usuario
                        : "Usuario";

                    const foto =
                        usuarioAmigo?.foto_perfil
                        ?
                       `${API}/${usuarioAmigo.foto_perfil}`
                        :
                       "img/default.png";


lista.innerHTML += `
    <div class="post">

        <img
            src="${foto}"
            style="
                width:60px;
                height:60px;
                border-radius:50%;
                object-fit:cover;
                cursor:pointer;
            "
            onclick="verPerfil(${idOtroUsuario})"
        >

        <br><br>

        <b
            onclick="verPerfil(${idOtroUsuario})"
            style="
                cursor:pointer;
            "
        >
            ${nombre}
        </b>

        <br><br>



        <button
            onclick="eliminarAmigo(${amigo.id_amigo})"
        >
            Eliminar amigo
        </button>

        <button
            onclick="bloquearUsuario(${idOtroUsuario})"
        >
            Bloquear
        </button>

    </div>
`;

                }

            }
        );

    } catch (error) {

        console.log(error);

    }

}
function verPerfil(idUsuario) {

    window.location.href =
        `perfil_usuario.html?id=${idUsuario}`;

}

async function eliminarAmigo(idAmigo) {

    const confirmar =
        confirm(
            "¿Eliminar este amigo?"
        );

    if (!confirmar) return;

    try {

        const respuesta =
            await fetch(
                `${API}/amigos/${idAmigo}`,
                {
                    method: "DELETE"
                }
            );

        const datos =
            await respuesta.json();

        alert(
            datos.mensaje
        );

        cargarAmigos();

    } catch (error) {

        console.log(error);

    }

}
/* ===================== */
/* SOLICITUDES */
/* ===================== */

async function cargarSolicitudes() {

    const lista =
        document.getElementById(
            "solicitudesPendientes"
        );

    if (!lista) return;

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    try {

const respuesta =
    await fetch(
        `${API}/amigos`
    );

const solicitudes =
    await respuesta.json();

const respuestaUsuarios =
    await fetch(
        `${API}/usuarios`
    );

const usuarios =
    await respuestaUsuarios.json();

        lista.innerHTML = "";

        solicitudes.forEach(
            solicitud => {

                if (
                    solicitud.estado === "pendiente" &&
                    solicitud.id_amigo_usuario ==
                    usuario.id_usuario
                ) {

const usuarioSolicitud =
    usuarios.find(
        u =>
        u.id_usuario ==
        solicitud.id_usuario
    );

const nombre =
    usuarioSolicitud
    ? usuarioSolicitud.nombre_usuario
    : "Usuario";

lista.innerHTML += `
    <div class="post">

        📩 ${nombre}
        te envió una solicitud
        de amistad

        <br><br>

        <button
            onclick="aceptarSolicitud(${solicitud.id_amigo})"
        >
            Aceptar
        </button>

    </div>
`;

                }

            }
        );

    } catch (error) {

        console.log(error);

    }

}
async function aceptarSolicitud(
    idAmigo
) {

    try {

        await fetch(
            `${API}/amigos/${idAmigo}`,
            {
                method: "PUT"
            }
        );

        cargarAmigos();

        cargarSolicitudes();

    } catch (error) {

        console.log(error);

    }

}

async function cargarPerfilUsuario() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const idUsuario =
        parametros.get("id");

    if (!idUsuario) return;

    try {

        const respuestaUsuarios =
            await fetch(
                `${API}/usuarios`
            );

        const usuarios =
            await respuestaUsuarios.json();

        const usuario =
            usuarios.find(
                u =>
                u.id_usuario == idUsuario
            );

        if (!usuario) return;

        const usuarioActual =
            JSON.parse(
                localStorage.getItem(
                    "usuario"
                )
            );

        document.getElementById(
            "nombreUsuario"
        ).textContent =
            usuario.nombre_usuario;

        document.getElementById(
            "carreraUsuario"
        ).textContent =
            usuario.carrera ||
            "No especificada";

        document.getElementById(
            "materiasUsuario"
        ).textContent =
            usuario.materias ||
            "Ninguna";

        document.getElementById(
            "semestreUsuario"
        ).textContent =
            usuario.semestre ||
            "No especificado";

        document.getElementById(
            "fotoUsuario"
        ).src =
            usuario.foto_perfil
            ?
            `${API}/${usuario.foto_perfil}`
            :
            "img/default.png";

        const btnAmigo =
            document.getElementById(
                "btnAgregarAmigo"
            );

        const btnMensaje =
            document.getElementById(
                "btnMensaje"
            );

        // Si estoy viendo mi propio perfil
        if (
            usuarioActual &&
            usuarioActual.id_usuario ==
            usuario.id_usuario
        ) {

            if (btnAmigo) {
                btnAmigo.style.display =
                    "none";
            }

            if (btnMensaje) {
                btnMensaje.style.display =
                    "none";
            }

        } else {

            if (btnAmigo) {

                btnAmigo.onclick =
                    () =>
                    enviarSolicitud(
                        usuario.id_usuario
                    );

            }

            if (btnMensaje) {

                btnMensaje.onclick =
                    () =>
                    enviarSolicitudChat(
                        usuario.id_usuario
                    );

            }

        }

        cargarPublicacionesUsuario(
            idUsuario
        );

    } catch (error) {

        console.log(
            "Error cargando perfil:",
            error
        );

    }

}
async function cargarPublicacionesUsuario(
    idUsuario
) {

    const contenedor =
        document.getElementById(
            "publicacionesUsuario"
        );

    if (!contenedor) return;

    try {

        const respuesta =
            await fetch(
                `${API}/publicaciones`
            );

        const publicaciones =
            await respuesta.json();

        contenedor.innerHTML = "";

        publicaciones
            .reverse();

        publicaciones.forEach(
            publicacion => {

                if (
                    publicacion.id_usuario !=
                    idUsuario
                ) {
                    return;
                }

                contenedor.innerHTML += `

<div
    class="post"
    onclick="
        abrirPublicacion(
            ${publicacion.id_publicacion}
        )
    "
    style="
        cursor:pointer;
        margin-bottom:20px;
    "
>

    <h3>
        📌 ${publicacion.titulo}
    </h3>

    <p>
        ${
            publicacion.contenido.length > 120
            ?
            publicacion.contenido.substring(0,120)
            + "..."
            :
            publicacion.contenido
        }
    </p>

    ${
        publicacion.archivo
        ?

        (
            ["jpg","jpeg","png","gif","webp"]
            .includes(
                publicacion.tipo_archivo
            )

            ?

            `
<img
    src="${API}/${publicacion.archivo}"
    style="
        width:100%;
        border-radius:10px;
        margin-top:10px;
        max-height:350px;
        object-fit:cover;
    "
>
            `

            :

            ["mp4"]
            .includes(
                publicacion.tipo_archivo
            )

            ?

            `
<video
    controls
    onclick="
        event.stopPropagation();
    "
    style="
        width:100%;
        margin-top:10px;
        border-radius:10px;
    "
>
    <source
        src="${API}/${publicacion.archivo}"
    >
</video>
            `

            :

            `
<a
    href="${API}/${publicacion.archivo}"
    target="_blank"
    onclick="
        event.stopPropagation();
    "
>
    📎 Descargar archivo
</a>
            `
        )

        :

        ""
    }

    <br><br>

    <button
        onclick="
            event.stopPropagation();
            darLike(
                ${publicacion.id_publicacion}
            );
        "
    >
        ❤️ ${publicacion.likes}
    </button>

</div>

                `;

            }
        );

    } catch (error) {

        console.log(error);

    }

}
async function bloquearUsuario(
    idBloqueado
) {

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    if (!usuario) return;

    const confirmar =
        confirm(
            "¿Bloquear usuario?"
        );

    if (!confirmar) return;

    try {

        const respuesta =
            await fetch(
                `${API}/bloqueados`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        id_usuario:
                            usuario.id_usuario,

                        id_bloqueado:
                            idBloqueado
                    })
                }
            );

        const datos =
            await respuesta.json();

        alert(
            datos.mensaje
        );

    } catch (error) {

        console.log(error);

    }

}
async function eliminarPublicacion(idPublicacion) {

    const confirmar = confirm("¿Eliminar publicación?");
    if (!confirmar) return;

    try {

        const res = await fetch(`${API}/publicaciones/${idPublicacion}`, {
            method: "DELETE"
        });

        const data = await res.json();

        alert(data.mensaje);

        // 🔥 Detectar en qué página estás

        const enDetalle = window.location.pathname.includes("publicacion.html");

        if (enDetalle) {
            // si estás en detalle → regresar al feed
            window.location.href = "inicio.html";
        } else {
            // si estás en feed → recargar feed
            await cargarPublicaciones();
        }

    } catch (error) {
        console.log("Error eliminar:", error);
        alert("Error al eliminar publicación");
    }
}

async function editarPublicacion(idPublicacion) {

    const nuevoTitulo = prompt("Nuevo título:");
    const nuevoContenido = prompt("Nuevo contenido:");

    if (!nuevoTitulo || !nuevoContenido) return;

    try {

        const respuesta = await fetch(
            `${API}/publicaciones/${idPublicacion}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    titulo: nuevoTitulo,
                    contenido: nuevoContenido
                })
            }
        );

        const datos = await respuesta.json();

        alert(datos.mensaje);

        // 🔥 Detectar página actual
        const enDetalle = window.location.pathname.includes("publicacion.html");

        if (enDetalle) {
            await cargarDetallePublicacion(); // detalle
        } else {
            await cargarPublicaciones(); // feed
        }

    } catch (error) {
        console.log(error);
    }
}

function activarBuscador() {

    const buscador =
        document.getElementById(
            "buscador"
        );

    if (!buscador) return;

    buscador.addEventListener(
        "input",
        function () {

            const texto =
                this.value
                .toLowerCase();

            const publicaciones =
                document.querySelectorAll(
                    ".post"
                );

            publicaciones.forEach(
                publicacion => {

                    const contenido =
                        publicacion.textContent
                        .toLowerCase();

                    if (
                        contenido.includes(
                            texto
                        )
                    ) {

                        publicacion.style.display =
                            "block";

                    } else {

                        publicacion.style.display =
                            "none";

                    }

                }
            );

        }
    );

}

const btnFotoPerfil =
    document.getElementById(
        "btnFotoPerfil"
    );

if (btnFotoPerfil) {

    btnFotoPerfil.addEventListener(
        "click",
        subirFotoPerfil
    );

}


async function subirFotoPerfil() {

    const archivo =
        document.getElementById(
            "archivoPerfil"
        ).files[0];

    if (!archivo) {

        alert(
            "Selecciona una imagen"
        );

        return;
    }

    const usuario =
        JSON.parse(
            localStorage.getItem(
                "usuario"
            )
        );

    const formData =
        new FormData();

    formData.append(
        "archivo",
        archivo
    );

    try {

        const respuesta =
            await fetch(
                `${API}/usuarios/foto/${usuario.id_usuario}`,
                {
                    method: "PUT",
                    body: formData
                }
            );

        const datos =
            await respuesta.json();

        alert(
            datos.mensaje
        );

        cargarPerfil();

    } catch (error) {

        console.log(
            error
        );

    }

}
window.abrirPublicacion = function (idPublicacion) {
    window.location.href =
        `publicacion.html?id=${idPublicacion}`;
};

async function cargarDetallePublicacion() {

    console.log("ENTRÓ A DETALLE");

    const id = new URLSearchParams(window.location.search).get("id");

    const contenedor = document.getElementById("detallePublicacion");

    if (!id || !contenedor) {
        console.log("FALTA ID O CONTENEDOR");
        return;
    }

    try {

        const res = await fetch(`${API}/publicaciones/${id}`);
        const pub = await res.json();

        const usuario = JSON.parse(localStorage.getItem("usuario"));

       contenedor.innerHTML = `
    <div class="post">

        <h2>${pub.titulo}</h2>

        <p>${pub.contenido}</p>

        ${
            pub.archivo
            ? (
                ["jpg","jpeg","png","gif","webp"].includes(pub.tipo_archivo)
                ? `
                    <img
                        src="${API}/${pub.archivo}"
                        style="width:100%;border-radius:15px;margin-top:10px;"
                    >
                `
                : ["mp4"].includes(pub.tipo_archivo)
                ? `
                    <video controls style="width:100%;margin-top:10px;">
                        <source src="${API}/${pub.archivo}">
                    </video>
                `
                : `
                    <a href="${API}/${pub.archivo}" target="_blank">
                        📎 Descargar archivo
                    </a>
                `
            )
            : ""
        }

        <br>

        <button onclick="darLike(${pub.id_publicacion})">
            ❤️ ${pub.likes}
        </button>

        ${
            usuario && usuario.id_usuario == pub.id_usuario
            ? `
                <button onclick="editarPublicacion(${pub.id_publicacion})">✏️ Editar</button>
                <button onclick="eliminarPublicacion(${pub.id_publicacion})">🗑 Eliminar</button>
            `
            : ""
        }

    </div>
`;

        cargarComentarios(id);

    } catch (err) {
        console.log("ERROR DETALLE:", err);
    }
}


async function cargarComentarios(
    idPublicacion
) {

 const contenedor =
document.getElementById(
    "listaComentarios"
);

    if (!contenedor) return;

    try {

        const respuestaComentarios =
            await fetch(
                `${API}/comentarios`
            );

        const comentarios =
            await respuestaComentarios.json();
            console.log("Comentarios recibidos:", comentarios);
            console.log("ID publicación:", idPublicacion);

        const respuestaUsuarios =
            await fetch(
                `${API}/usuarios`
            );

        const usuarios =
            await respuestaUsuarios.json();

        contenedor.innerHTML = "";

        comentarios.forEach(
            comentario => {

   console.log("Comentario:", comentario);
console.log("Buscando publicación:", idPublicacion);

if (
    comentario.id_publicacion == idPublicacion
) {

                    const usuario =
                        usuarios.find(
                            u =>
                            u.id_usuario ==
                            comentario.id_usuario
                        );
                    const foto =
                        usuario?.foto_perfil
    ?
                       `${API}/${usuario.foto_perfil}`
                       :
                       "img/default.png";

                    const nombre =
                        usuario
                        ?
                        usuario.nombre_usuario
                        :
                        "Usuario";

                    contenedor.innerHTML += `

                    <div class="post">


                        <img
                             src="${foto}"
                             style="
                                 width:35px;
                                 height:35px;
                                 border-radius:50%;
                                 object-fit:cover;
                                 vertical-align:middle;
                             "
                          >
                       <b
                        onclick="
                        verPerfil(
                        ${comentario.id_usuario}
                        )"
                        style="
                        cursor:pointer;
                        "
                        >

                        ${nombre}

                        </b>

                        <br><br>

                        ${comentario.contenido}

                    </div>

                    `;

                }

            }
        );

    } catch (error) {

        console.log(error);

    }

}
function mostrarFormularioAcademico() {

    document.getElementById(
        "formularioAcademico"
    ).style.display =
        "block";

}async function guardarInformacionAcademica() {

    const usuario =
        JSON.parse(
            localStorage.getItem("usuario")
        );

    try {

        await fetch(
            `${API}/usuarios/${usuario.id_usuario}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    carrera: document.getElementById("inputCarrera").value,
                    semestre: document.getElementById("inputSemestre").value,
                    materias: document.getElementById("inputMaterias").value
                })
            }
        );

        cargarPerfil();

        alert("Información actualizada");

    } catch (error) {
        console.log(error);
    }
}
window.enviarComentario = async function () {

    const idPublicacion =
        new URLSearchParams(window.location.search).get("id");

    const texto =
        document.getElementById("nuevoComentario").value;

    const usuario =
        JSON.parse(localStorage.getItem("usuario"));

    if (!texto.trim()) return;

    await fetch(`${API}/comentarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_usuario: usuario.id_usuario,
            id_publicacion: idPublicacion,
            contenido: texto
        })
    });

    document.getElementById("nuevoComentario").value = "";

    cargarComentarios(idPublicacion);
};

let chatActivo = null;
let receptorActivo = null;

function abrirChat(idUsuario) {

    window.location.href = `chat.html?receptor=${idUsuario}`;

}

async function cargarChats() {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const res = await fetch(`${API}/conversaciones/${usuario.id_usuario}`);
    const chats = await res.json();

    const contenedor = document.getElementById("listaChats");
    contenedor.innerHTML = "";

    chats.forEach(c => {

        const idOtro =
            c.id_usuario1 === usuario.id_usuario
                ? c.id_usuario2
                : c.id_usuario1;

        contenedor.innerHTML += `
            <div onclick="abrirChat(${idOtro}, ${c.id_conversacion})"
                 style="padding:10px;border-bottom:1px solid #ccc;cursor:pointer;">
                Usuario ${idOtro}
                <small style="display:block;">${c.estado}</small>
            </div>
        `;
    });
}


async function enviarSolicitudChat(idReceptor) {

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    try {

        await fetch(`${API}/solicitudes-chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_emisor: usuario.id_usuario,
                id_receptor: idReceptor
            })
        });

        alert("Solicitud enviada");

    } catch (error) {
        console.log(error);
    }
}
async function cargarPuntosRojos() {

    const usuario =
        JSON.parse(
            localStorage.getItem("usuario")
        );

    if (!usuario) return;

    // MENSAJES

    const respuestaMensajes =
        await fetch(
            `${API}/notificaciones/mensajes/${usuario.id_usuario}`
        );

    const datosMensajes =
        await respuestaMensajes.json();

    if (datosMensajes.cantidad > 0) {

        document
            .getElementById(
                "puntoMensajes"
            )
            .style.display = "block";

    }


    // SOLICITUDES

    const respuestaSolicitudes =
        await fetch(
            `${API}/notificaciones/solicitudes/${usuario.id_usuario}`
        );

    const datosSolicitudes =
        await respuestaSolicitudes.json();

    if (datosSolicitudes.cantidad > 0) {

        document
            .getElementById(
                "puntoSolicitudes"
            )
            .style.display = "block";

    }

}
async function enviarCodigo() {

    const telefono = document.getElementById("telefono").value;

    const res = await fetch("http://127.0.0.1:8000/sms/enviar-codigo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ telefono })
    });

    const data = await res.json();

    alert(data.mensaje);
}
async function verificarCodigo() {

    const telefono = document.getElementById("telefono").value;
    const codigo = document.getElementById("codigo").value;

    const res = await fetch("http://127.0.0.1:8000/sms/verificar-codigo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            telefono,
            codigo
        })
    });

    const data = await res.json();

    if (data.verificado) {
        alert("Teléfono verificado ✔");
        localStorage.setItem("telefono_verificado", "1");
    } else {
        alert("Código incorrecto");
    }
}
async function registrarUsuario() {

    const verificado = localStorage.getItem("telefono_verificado");

    if (!verificado) {
        alert("Primero verifica tu teléfono");
        return;
    }

    const nombre = document.getElementById("usuario").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://127.0.0.1:8000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombre_usuario: nombre,
            correo,
            telefono,
            password,
            carrera: "",
            materias: ""
        })
    });

    const data = await res.json();

    alert(data.mensaje);
}


if (typeof cargarNovaPantalla === "function") {
    cargarNovaPantalla();
}

if (typeof cargarMensajes === "function") {
    cargarMensajes();
}

if (typeof cargarMisPublicaciones === "function") {
    cargarMisPublicaciones();
}

if (typeof cargarPerfil === "function") {
    cargarPerfil();
}

if (typeof obtenerPensamiento === "function") {
    obtenerPensamiento();
}

if (typeof cargarPublicaciones === "function") {
    cargarPublicaciones();
}

if (typeof cargarNotificaciones === "function") {
    cargarNotificaciones();
}

if (typeof cargarAmigos === "function") {
    cargarAmigos();
}

if (typeof cargarSolicitudes === "function") {
    cargarSolicitudes();
}

if (typeof cargarPerfilUsuario === "function") {
    cargarPerfilUsuario();
}

if (typeof activarBuscador === "function") {
    activarBuscador();
}
console.log("APP JS CARGADO");


if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("/frontend/sw.js")
        .then(() => {
            console.log("Service Worker registrado");
        })
        .catch(error => {
            console.log("Error al registrar Service Worker:", error);
        });

    });

}