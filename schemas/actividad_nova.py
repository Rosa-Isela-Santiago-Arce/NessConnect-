from pydantic import BaseModel


class ActividadNovaCreate(BaseModel):
    id_nova: int
    actividad: str