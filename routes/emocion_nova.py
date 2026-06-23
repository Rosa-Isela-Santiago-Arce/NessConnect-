from fastapi import APIRouter

router = APIRouter()


@router.get("/emociones_nova")
def prueba_emociones():
    return {
        "mensaje": "Nova tiene sentimientos 👾"
    }