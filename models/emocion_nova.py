from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base


class EmocionNova(Base):
    __tablename__ = "emociones_nova"

    id_emocion = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_nova = Column(
        Integer,
        ForeignKey("nova.id_nova"),
        nullable=False
    )

    emocion = Column(
        String(50),
        nullable=False
    )

    fecha_inicio = Column(
        DateTime,
        server_default=func.now()
    )