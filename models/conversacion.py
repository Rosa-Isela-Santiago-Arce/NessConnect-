from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey
)

from database import Base


class Conversacion(Base):

    __tablename__ = "conversaciones"

    id_conversacion = Column(
        Integer,
        primary_key=True
    )

    id_usuario1 = Column(
        Integer,
        ForeignKey("usuarios.id_usuario")
    )

    id_usuario2 = Column(
        Integer,
        ForeignKey("usuarios.id_usuario")
    )

    estado = Column(
        String,
        default="activa"
    )