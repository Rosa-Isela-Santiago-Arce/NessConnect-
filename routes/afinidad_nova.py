from fastapi import APIRouter

router = APIRouter()


@router.get("/afinidad_nova")
def prueba_afinidad():

    return {
        "mensaje": "Nova ya puede desarrollar cariño 👾❤️"
    }