from pydantic import BaseModel


class MemoriaNovaCreate(BaseModel):
    id_nova: int
    titulo: str
    contenido: str