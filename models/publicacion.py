from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base


class Publicacion(Base):

    __tablename__ = "publicaciones"

    id_publicacion = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_usuario = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )

    contenido = Column(
        String,
        nullable=False
    )
    titulo = Column(
    String(100),
    nullable=False
)

    imagen = Column(
        String,
        nullable=True
    )

    video = Column(
        String,
        nullable=True
    )

    archivo = Column(
        String,
        nullable=True
    )

    tipo_archivo = Column(
        String(50),
        nullable=True
    )

    fecha_publicacion = Column(
        DateTime,
        server_default=func.now()
    )

    likes = Column(
        Integer,
        default=0
    )