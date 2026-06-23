from pydantic import BaseModel


class NotificacionCreate(BaseModel):
    id_usuario: int
    tipo: str
    mensaje: str