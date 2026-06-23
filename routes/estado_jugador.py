from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.estado_jugador import EstadoJugador
from schemas.estado_jugador import EstadoJugadorCreate

router = APIRouter()


@router.post("/estado_jugador")
def crear_estado(
    datos: EstadoJugadorCreate,
    db: Session = Depends(get_db)
):

    nuevo_estado = EstadoJugador(
        id_usuario=datos.id_usuario,
        estado=datos.estado,
        juego_actual=datos.juego_actual
    )

    db.add(nuevo_estado)
    db.commit()

    return {
        "mensaje": "Estado guardado correctamente"
    }


@router.get("/estado_jugador")
def obtener_estados(
    db: Session = Depends(get_db)
):

    estados = db.query(
        EstadoJugador
    ).all()

    return estados