from pydantic import BaseModel


class AfinidadNovaCreate(BaseModel):
    id_nova: int
    afinidad: int