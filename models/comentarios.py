from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base


class Comentario(Base):
    __tablename__ = "comentarios"

    id_comentario = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_usuario = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )

    id_publicacion = Column(
        Integer,
        ForeignKey("publicaciones.id_publicacion"),
        nullable=False
    )

    contenido = Column(
        String,
        nullable=False
    )

    fecha_comentario = Column(
        DateTime,
        server_default=func.now()
    )