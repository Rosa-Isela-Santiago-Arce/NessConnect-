const nessie = document.getElementById("nessieImagen");
let animando = false;
let estadoManual = null;

if (nessie) {

    // Estado según la página
    const pagina =
        window.location.pathname
        .split("/")
        .pop();

    if (pagina === "perfil.html") {

        nessie.src =
        "img/nessie_moviendotrasero.gif";

    }
    else if (pagina === "mensajes.html") {

        nessie.src =
        "img/nessie_piensa.gif";

    }
    else {

        nessie.src =
        "img/nessie_salta.gif";

    }


    nessie.addEventListener(
        "click",
        (e) => {

            if (animando) return;

            animando = true;

            const altura = nessie.offsetHeight;
const posicionY = e.offsetY;
const ancho = nessie.offsetWidth;
const posicionX = e.offsetX;


// CABEZA
if (posicionY < altura * 0.35) {

    nessie.src =
    "img/nessie_deretido.gif";

    crearCorazones();

}


// TRASERO (lado derecho)
else if (posicionX > ancho * 0.45) {


    setTimeout(() => {
        nessie.src = "img/nessie_trasero.gif";
    }, 400); // 👈 dura solo 0.4 segundos

}


// PANZA
else {

    nessie.src =
    "img/nessie_piso.gif";

}

            setTimeout(() => {
                if (estadoManual === "trasero") {
    estadoManual = null;
    animando = false;
    return;
}

                const paginaActual =
                    window.location.pathname
                    .split("/")
                    .pop();


                if (
                    paginaActual ===
                    "perfil.html"
                ) {

                    nessie.src =
                    "img/nessie_moviendotrasero.gif";

                }
                else if (
                    paginaActual ===
                    "mensajes.html"
                ) {

                    nessie.src =
                    "img/nessie_piensa.gif";

                }
                else {

                    nessie.src =
                    "img/nessie_salta.gif";

                }

                animando = false;

            }, 1500);

        }
    );

}



function crearCorazones() {

    for (let i = 0; i < 4; i++) {

        let corazon =
            document.createElement("div");

        corazon.className =
            "corazon-nessie";

        corazon.innerHTML =
            "❤️";

        corazon.style.right =
            (60 + Math.random() * 50) + "px";

        corazon.style.bottom =
            (180 + Math.random() * 40) + "px";

        document.body.appendChild(
            corazon
        );

        setTimeout(() => {

            corazon.remove();

        }, 1500);

    }

}