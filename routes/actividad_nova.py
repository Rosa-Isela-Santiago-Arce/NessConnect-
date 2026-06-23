from fastapi import APIRouter
import random

router = APIRouter()


@router.get("/nova/actividad")
def actividad_aleatoria():

    actividades = [
        "Durmiendo 😴",
        "Leyendo 📖",
        "Jugando 🎮",
        "Paseando 🚶",
        "Escondida 🫣",
        "Observando chats 👀",
        "Aburrida 😒",
        "Comiendo 🍕"
    ]

    return {
        "actividad": random.choice(actividades)
    }