const API = "http://127.0.0.1:8000";

window.enviarCodigo = async function () {

    const correo = document.getElementById("correo").value;

    console.log("Enviando código a:", correo);

    try {

        const respuesta = await fetch(
            `${API}/recuperar-password?correo=${correo}`,
            {
                method: "POST"
            }
        );

        const datos = await respuesta.json();

        document.getElementById("mensaje").innerText = datos.mensaje;

        if (respuesta.ok) {

            window.location.href =
                "verificar_codigo.html?correo=" +
                encodeURIComponent(correo);

        }

    } catch (error) {

        console.log("ERROR:", error);

        document.getElementById("mensaje").innerText =
            "Error al enviar código";

    }
}