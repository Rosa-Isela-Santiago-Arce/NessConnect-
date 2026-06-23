from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.conversacion import Conversacion
from models.usuario import Usuario
from dependencies.auth import verificar_usuario_activo 

router = APIRouter()


@router.get("/conversaciones/{id_usuario}")
def obtener_conversaciones(
    id_usuario: int,
    db: Session = Depends(get_db),
    usuario = Depends(verificar_usuario_activo)
):

    conversaciones = db.query(
        Conversacion
    ).filter(
        (Conversacion.id_usuario1 == id_usuario) |
        (Conversacion.id_usuario2 == id_usuario)
    ).all()

    resultado = []

    for conversacion in conversaciones:

        otro_id = (
            conversacion.id_usuario2
            if conversacion.id_usuario1 == id_usuario
            else conversacion.id_usuario1
        )

        usuario = db.query(
            Usuario
        ).filter(
            Usuario.id_usuario == otro_id
        ).first()

        resultado.append({
            "id_conversacion":
                conversacion.id_conversacion,
            "id_usuario":
                otro_id,
            "nombre_usuario":
                usuario.nombre_usuario if usuario else "Usuario",
            "foto_perfil":
                usuario.foto_perfil if usuario else None
        })

    return resultado


@router.get("/conversacion/{id_conversacion}")
def obtener_conversacion(
    id_conversacion: int,
    db: Session = Depends(get_db),
    usuario = Depends(verificar_usuario_activo)
):

    conversacion = db.query(
        Conversacion
    ).filter(
        Conversacion.id_conversacion == id_conversacion
    ).first()

    if not conversacion:
        return {
            "mensaje":
            "Conversación no encontrada"
        }

    return conversacion