from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class SolicitudChat(Base):
    __tablename__ = "solicitudes_chat"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    id_emisor = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )

    id_receptor = Column(
        Integer,
        ForeignKey("usuarios.id_usuario"),
        nullable=False
    )

    estado = Column(
        String,
        default="pendiente"
    )

    mensajes_temporales = Column(
        Integer,
        default=0
    )