from pydantic import BaseModel


class LikeCreate(BaseModel):
    id_usuario: int
    id_publicacion: int