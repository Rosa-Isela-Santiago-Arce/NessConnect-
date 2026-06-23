from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base


class ActividadNova(Base):
    __tablename__ = "actividad_nova"

    id_actividad = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_nova = Column(
        Integer,
        ForeignKey("nova.id_nova"),
        nullable=False
    )

    actividad = Column(
        String(50),
        nullable=False
    )

    fecha_inicio = Column(
        DateTime,
        server_default=func.now()
    )