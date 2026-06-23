from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base


class Amigo(Base):
    __tablename__ = "amigos"

    id_amigo = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_usuario = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )

    id_amigo_usuario = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )

    estado = Column(
        String(20),
        default="pendiente"
    )