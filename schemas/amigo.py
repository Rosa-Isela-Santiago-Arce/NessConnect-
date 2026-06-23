from pydantic import BaseModel


class AmigoCreate(BaseModel):
    id_usuario: int
    id_amigo_usuario: int