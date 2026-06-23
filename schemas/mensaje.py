from pydantic import BaseModel


class MensajeCreate(BaseModel):

    id_emisor: int

    id_receptor: int

    contenido: str