from sqlalchemy import Column, Integer, String
from database import Base


class FraseNova(Base):
    __tablename__ = "frases_nova"

    id_frase = Column(
        Integer,
        primary_key=True,
        index=True
    )

    personalidad = Column(
        String(50),
        nullable=False
    )

    emocion = Column(
        String(50),
        nullable=False
    )

    frase = Column(
        String,
        nullable=False
    )