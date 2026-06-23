from pydantic import BaseModel


class EmocionNovaCreate(BaseModel):
    id_nova: int
    emocion: str