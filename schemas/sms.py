from pydantic import BaseModel


class TelefonoSchema(BaseModel):
    telefono: str


class VerificacionSchema(BaseModel):
    telefono: str
    codigo: str