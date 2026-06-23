from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base


class Nova(Base):
    __tablename__ = "nova"

    id_nova = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_usuario = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )

    nombre = Column(
        String(50),
        nullable=False
    )

    personalidad = Column(
        String(50),
        nullable=False
    )

    emocion = Column(
        String(50),
        default="feliz"
    )

    afinidad = Column(
        Integer,
        default=50
    )

    historia = Column(
        String
    )