from pydantic import BaseModel


class EstadoJugadorCreate(BaseModel):
    id_usuario: int
    estado: str
    juego_actual: str | None = None