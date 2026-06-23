from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.notificacion import Notificacion

from schemas.notificacion import NotificacionCreate

router = APIRouter()


@router.post("/notificaciones")
def crear_notificacion(
    notificacion: NotificacionCreate,
    db: Session = Depends(get_db)
):

    nueva = Notificacion(
        id_usuario=notificacion.id_usuario,
        tipo=notificacion.tipo,
        mensaje=notificacion.mensaje
    )

    db.add(nueva)
    db.commit()

    return {
        "mensaje": "Notificación creada"
    }
    
@router.get("/notificaciones/mensajes/{id_usuario}")
def notificaciones_mensajes(
    id_usuario: int,
    db: Session = Depends(get_db)
):

    cantidad = db.query(
        Notificacion
    ).filter(
        Notificacion.id_usuario == id_usuario,
        Notificacion.tipo == "mensaje",
        Notificacion.leida == False
    ).count()

    return {
        "cantidad": cantidad
    }


@router.get("/notificaciones/solicitudes/{id_usuario}")
def notificaciones_solicitudes(
    id_usuario: int,
    db: Session = Depends(get_db)
):

    cantidad = db.query(
        Notificacion
    ).filter(
        Notificacion.id_usuario == id_usuario,
        Notificacion.tipo == "solicitud",
        Notificacion.leida == False
    ).count()

    return {
        "cantidad": cantidad
    }

@router.get("/notificaciones/{id_usuario}")
def listar_notificaciones(
    id_usuario: int,
    db: Session = Depends(get_db)
):

    return db.query(
        Notificacion
    ).filter(
        Notificacion.id_usuario == id_usuario
    ).order_by(
        Notificacion.fecha.desc()
    ).all()
    
@router.get("/notificaciones/no-leidas/{id_usuario}")
def contar_no_leidas(
    id_usuario: int,
    db: Session = Depends(get_db)
):

    total = db.query(
        Notificacion
    ).filter(
        Notificacion.id_usuario == id_usuario,
        Notificacion.leida == False
    ).count()

    return {
        "cantidad": total
    }
@router.put("/notificaciones/leidas/{id_usuario}")
def marcar_leidas(
    id_usuario: int,
    db: Session = Depends(get_db)
):

    notificaciones = db.query(
        Notificacion
    ).filter(
        Notificacion.id_usuario == id_usuario,
        Notificacion.leida == False
    ).all()

    for n in notificaciones:
        n.leida = True

    db.commit()

    return {
        "mensaje": "OK"
    }