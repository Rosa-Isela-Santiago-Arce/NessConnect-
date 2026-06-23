from fastapi import APIRouter
import random

router = APIRouter()


@router.get("/nova/frase/{emocion}")
def frase_por_emocion(emocion: str):

    frases = {

        "feliz": [
            "¡Qué bueno verte!",
            "¿Jugaremos algo hoy?",
            "Me alegra que hayas vuelto."
        ],

        "enojada": [
            "Haz lo que quieras.",
            "No estoy de humor.",
            "¿Ahora sí te acordaste de mí?"
        ],

        "aburrida": [
            "Ya me aburrí...",
            "No pasa nada interesante.",
            "Creo que voy a esconderme."
        ]

    }

    return {
        "frase": random.choice(
            frases.get(
                emocion,
                ["No sé cómo me siento."]
            )
        )
    }
@router.get("/nova/pensamiento")
def pensamiento_nova():

    pensamientos = [
        "Me pregunto qué estarán haciendo los demás usuarios 👀",
        "Hoy hay mucho movimiento por aquí.",
        "Creo que voy a esconderme un rato 🫣",
        "¿Ya viste las publicaciones nuevas?",
        "Estoy observando todo desde aquí 👾",
        "Tengo la sensación de que alguien necesita ayuda.",
        "Qué tranquilo está GameLink hoy.",
        "Creo que voy a leer algo 📖"
    ]

    import random

    return {
        "pensamiento": random.choice(pensamientos)
    }