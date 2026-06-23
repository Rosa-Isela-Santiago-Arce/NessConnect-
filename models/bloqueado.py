from sqlalchemy import Column, Integer, ForeignKey
from database import Base


class Bloqueado(Base):
    __tablename__ = "bloqueados"

    id_bloqueo = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_usuario = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )

    id_bloqueado = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )