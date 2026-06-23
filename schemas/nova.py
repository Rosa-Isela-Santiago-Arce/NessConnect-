from pydantic import BaseModel


class NovaCreate(BaseModel):
    id_usuario: int
    nombre: str
    personalidad: str
    historia: str