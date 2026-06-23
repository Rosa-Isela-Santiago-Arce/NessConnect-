from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from sqlalchemy.sql import func
from database import Base
from sqlalchemy import Column, Integer, String, Boolean


class Usuario(Base):

    __tablename__ = "usuarios"

    id_usuario = Column(
        Integer,
        primary_key=True,
        index=True
    )
    telefono_verificado = Column(Boolean, default=False)

    nombre_usuario = Column(
        String(50),
        nullable=False
    )

    correo = Column(
        String(100),
        unique=True,
        nullable=False
    )

    telefono = Column(
        String(20)
    )

    password = Column(
        String(255),
        nullable=False
    )

    monedas = Column(
        Integer,
        default=100
    )

    foto_perfil = Column(
        String,
        nullable=True
    )
    carrera = Column(
        String(100),
        nullable=True
    )
    semestre = Column(
        Integer,
        nullable=True
    )

    materias = Column(
        String(500),
        nullable=True
     )
    
    fecha_registro = Column(
        DateTime,
        server_default=func.now()
    )