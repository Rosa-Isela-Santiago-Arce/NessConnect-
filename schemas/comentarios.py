from pydantic import BaseModel


class ComentarioCreate(BaseModel):
    id_usuario: int
    id_publicacion: int
    contenido: str