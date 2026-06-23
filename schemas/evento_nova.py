from pydantic import BaseModel


class EventoNovaCreate(BaseModel):
    nombre_evento: str
    descripcion: str
    probabilidad: int