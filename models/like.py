from sqlalchemy import Column, Integer, ForeignKey
from database import Base


class LikePublicacion(Base):
    __tablename__ = "likes_publicaciones"

    id_like = Column(
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