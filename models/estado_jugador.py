from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base


class EstadoJugador(Base):
    __tablename__ = "estado_jugador"

    id_estado = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_usuario = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )

    estado = Column(
        String(20),
        default="desconectado"
    )

    juego_actual = Column(
        String(100),
        nullable=True
    )

    ultima_actividad = Column(
        DateTime,
        server_default=func.now()
    )