from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from models.publicacion import Publicacion
from database import get_db
from models.like import LikePublicacion
from schemas.like import LikeCreate

router = APIRouter()


@router.post("/likes")
def dar_like(
    like: LikeCreate,
    db: Session = Depends(get_db),
):

    like_existente = db.query(
        LikePublicacion
    ).filter(
        LikePublicacion.id_usuario ==
        like.id_usuario,

        LikePublicacion.id_publicacion ==
        like.id_publicacion
    ).first()

    if like_existente:

        return {
            "mensaje": "Ya diste like"
        }

    nuevo_like = LikePublicacion(
        id_usuario=like.id_usuario,
        id_publicacion=like.id_publicacion
    )

    db.add(
        nuevo_like
    )

    publicacion = db.query(
        Publicacion
    ).filter(
        Publicacion.id_publicacion ==
        like.id_publicacion
    ).first()

    if publicacion:

        publicacion.likes += 1

    db.commit()

    return {
        "mensaje": "Like agregado correctamente"
    }


@router.get("/likes")
def listar_likes(
    db: Session = Depends(get_db)
):

    likes = db.query(
        LikePublicacion
    ).all()

    return likes