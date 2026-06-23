from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.nova import Nova
from schemas.nova import NovaCreate

router = APIRouter()


@router.post("/nova")
def crear_nova(
    datos: NovaCreate,
    db: Session = Depends(get_db)
):

    nueva_nova = Nova(
        id_usuario=datos.id_usuario,
        nombre=datos.nombre,
        personalidad=datos.personalidad,
        historia=datos.historia
    )

    db.add(
        nueva_nova
    )

    db.commit()

    return {
        "mensaje": "Nova creada correctamente 👾"
    }


@router.get("/nova")
def obtener_novas(
    db: Session = Depends(get_db)
):

    novas = db.query(
        Nova
    ).all()

    return novas