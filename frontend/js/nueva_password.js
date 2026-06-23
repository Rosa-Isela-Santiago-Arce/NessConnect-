const API = "http://127.0.0.1:8000";


const parametros =
    new URLSearchParams(
        window.location.search
    );


const correo =
    parametros.get("correo");



async function cambiarPassword(){

    const password =
        document.getElementById(
            "password"
        ).value;


    const respuesta = await fetch(
        `${API}/cambiar-password?correo=${correo}&nueva_password=${password}`,
        {
            method: "PUT"
        }
    );


    const datos =
        await respuesta.json();


    document.getElementById(
        "mensaje"
    ).innerText =
        datos.mensaje;

        if (respuesta.ok) {

    alert("Contraseña cambiada correctamente");

    window.location.href =
        "login.html";

}

}