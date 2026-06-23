from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.comentarios import Comentario
from schemas.comentarios import ComentarioCreate

router = APIRouter()


@router.post("/comentarios")
def crear_comentario(
    comentario: ComentarioCreate,
    db: Session = Depends(get_db),
):
    nuevo_comentario = Comentario(
        id_usuario=comentario.id_usuario,
        id_publicacion=comentario.id_publicacion,
        contenido=comentario.contenido
    )

    db.add(nuevo_comentario)
    db.commit()

    return {
        "mensaje": "Comentario creado correctamente"
    }


@router.get("/comentarios")
def listar_comentarios(
    db: Session = Depends(get_db),
):
    comentarios = db.query(
        Comentario
    ).all()

    return comentarios