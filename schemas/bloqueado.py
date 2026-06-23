from pydantic import BaseModel


class BloqueadoCreate(BaseModel):
    id_usuario: int
    id_bloqueado: int