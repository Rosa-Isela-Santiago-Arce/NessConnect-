from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean
)

from sqlalchemy.sql import func
from database import Base


class CodigoRecuperacion(Base):

    __tablename__ = "codigos_recuperacion"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_usuario = Column(
        Integer,
        nullable=False
    )

    codigo = Column(
        String(6),
        nullable=False
    )

    usado = Column(
        Boolean,
        default=False
    )

    fecha_creacion = Column(
        DateTime,
        server_default=func.now()
    )