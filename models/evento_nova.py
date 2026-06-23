from sqlalchemy import Column, Integer, String
from database import Base


class EventoNova(Base):
    __tablename__ = "eventos_nova"

    id_evento = Column(
        Integer,
        primary_key=True,
        index=True
    )

    nombre_evento = Column(
        String(100),
        nullable=False
    )

    descripcion = Column(
        String
    )

    probabilidad = Column(
        Integer,
        default=50
    )