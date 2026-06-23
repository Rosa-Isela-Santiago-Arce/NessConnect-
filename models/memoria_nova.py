from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base


class MemoriaNova(Base):
    __tablename__ = "memorias_nova"

    id_memoria = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_nova = Column(
        Integer,
        ForeignKey("nova.id_nova"),
        nullable=False
    )

    titulo = Column(
        String(100),
        nullable=False
    )

    contenido = Column(
        String,
        nullable=False
    )

    fecha_creacion = Column(
        DateTime,
        server_default=func.now()
    )