from fastapi import APIRouter

router = APIRouter()


@router.get("/eventos_nova")
def prueba_eventos():

    return {
        "mensaje": "Nova ya puede tener eventos aleatorios 👾"
    }