from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.amigo import Amigo
from schemas.amigo import AmigoCreate
from dependencies.auth import verificar_usuario_activo 

router = APIRouter()


@router.post("/amigos")
def agregar_amigo(
    amigo: AmigoCreate,
    db: Session = Depends(get_db),
    usuario = Depends(verificar_usuario_activo)
):

    # Evitar agregarse a sí mismo
    if amigo.id_usuario == amigo.id_amigo_usuario:

        return {
            "mensaje":
            "No puedes agregarte a ti mismo"
        }

    # Buscar solicitud en ambos sentidos
    solicitud_existente = db.query(
        Amigo
    ).filter(

        (
            (Amigo.id_usuario == amigo.id_usuario)
            &
            (Amigo.id_amigo_usuario == amigo.id_amigo_usuario)
        )

        |

        (
            (Amigo.id_usuario == amigo.id_amigo_usuario)
            &
            (Amigo.id_amigo_usuario == amigo.id_usuario)
        )

    ).first()

    if solicitud_existente:

        return {
            "mensaje":
            "Ya existe una solicitud o amistad con este usuario"
        }

    nuevo_amigo = Amigo(
        id_usuario=amigo.id_usuario,
        id_amigo_usuario=amigo.id_amigo_usuario
    )

    db.add(nuevo_amigo)

    db.commit()

    return {
        "mensaje":
        "Solicitud enviada"
    }


@router.get("/amigos")
def listar_amigos(
    db: Session = Depends(get_db),
    usuario = Depends(verificar_usuario_activo)
):

    amigos = db.query(
        Amigo
    ).all()

    return amigos


@router.put("/amigos/{id_amigo}")
def aceptar_solicitud(
    id_amigo: int,
    db: Session = Depends(get_db),
    usuario = Depends(verificar_usuario_activo)
):

    amigo = db.query(
        Amigo
    ).filter(
        Amigo.id_amigo == id_amigo
    ).first()

    if not amigo:

        return {
            "mensaje":
            "Solicitud no encontrada"
        }

    amigo.estado = "aceptado"

    db.commit()

    return {
        "mensaje":
        "Solicitud aceptada"
    }


@router.delete("/amigos/{id_amigo}")
def eliminar_amigo(
    id_amigo: int,
    db: Session = Depends(get_db)
):

    amigo = db.query(
        Amigo
    ).filter(
        Amigo.id_amigo == id_amigo
    ).first()

    if not amigo:

        return {
            "mensaje":
            "Amigo no encontrado"
        }

    db.delete(
        amigo
    )

    db.commit()

    return {
        "mensaje":
        "Amigo eliminado"
    }