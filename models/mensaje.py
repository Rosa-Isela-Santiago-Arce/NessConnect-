from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base


class Mensaje(Base):
    __tablename__ = "mensajes"

    id_mensaje = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_emisor = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )

    id_receptor = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )

    contenido = Column(
        String,
        nullable=False
    )

    fecha_envio = Column(
        DateTime,
        server_default=func.now()
    )
    
    
    id_conversacion = Column(
    Integer,
    ForeignKey("conversaciones.id_conversacion")
)