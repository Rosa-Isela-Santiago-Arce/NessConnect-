const API = "http://127.0.0.1:8000";

const params = new URLSearchParams(window.location.search);
const correo = params.get("correo");

document.addEventListener("DOMContentLoaded", () => {

    const correoInput = document.getElementById("correo");

    // SOLO llenar una vez
    if (correoInput && correo) {
        correoInput.value = correo;
        correoInput.disabled = true; // mejor que readonly
    }

});

async function verificarCodigo() {

    const codigo = document.getElementById("codigo").value;

    try {

        const respuesta = await fetch(
            `${API}/verificar-codigo?correo=${correo}&codigo=${codigo}`,
            {
                method: "POST"
            }
        );

        const datos = await respuesta.json();

        document.getElementById("mensaje").innerText = datos.mensaje;

        if (respuesta.ok) {

            window.location.href =
                "nueva_password.html?correo=" + correo;

        }

    } catch (error) {

        console.log(error);

        document.getElementById("mensaje").innerText =
            "Error al verificar código";
    }
}