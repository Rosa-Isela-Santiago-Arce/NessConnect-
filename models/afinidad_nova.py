from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base


class AfinidadNova(Base):
    __tablename__ = "afinidad_nova"

    id_afinidad = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_nova = Column(
        Integer,
        ForeignKey("nova.id_nova"),
        nullable=False
    )

    afinidad = Column(
        Integer,
        default=50
    )

    fecha_actualizacion = Column(
        DateTime,
        server_default=func.now()
    )