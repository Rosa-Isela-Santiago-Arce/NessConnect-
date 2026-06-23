from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from database import Base


class Notificacion(Base):
    __tablename__ = "notificaciones"

    id_notificacion = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_usuario = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )

    tipo = Column(
        String(50)
    )

    mensaje = Column(
        String
    )

    leida = Column(
        Boolean,
        default=False
    )

    fecha = Column(
        DateTime,
        server_default=func.now()
    )