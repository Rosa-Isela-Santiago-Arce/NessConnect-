from pydantic import BaseModel


class PublicacionCreate(BaseModel):

    id_usuario: int

    titulo: str

    contenido: str

    imagen: str | None = None

    video: str | None = None

    archivo: str | None = None

    tipo_archivo: str | None = None

class PublicacionUpdate(BaseModel):

    titulo: str

    contenido: str

class PublicacionResponse(BaseModel):

    id_publicacion: int

    id_usuario: int

    titulo: str

    contenido: str

    likes: int

    class Config:
        from_attributes = True

    class Config:
        from_attributes = True