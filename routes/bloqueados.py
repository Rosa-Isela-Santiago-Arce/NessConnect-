from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.bloqueado import Bloqueado
from schemas.bloqueado import BloqueadoCreate

router = APIRouter()


@router.post("/bloqueados")
def bloquear_usuario(
    bloqueo: BloqueadoCreate,
    db: Session = Depends(get_db)
):

    nuevo_bloqueo = Bloqueado(
        id_usuario=bloqueo.id_usuario,
        id_bloqueado=bloqueo.id_bloqueado
    )

    db.add(nuevo_bloqueo)
    db.commit()

    return {
        "mensaje": "Usuario bloqueado"
    }


@router.get("/bloqueados")
def listar_bloqueados(
    db: Session = Depends(get_db)
):

    return db.query(
        Bloqueado
    ).all()