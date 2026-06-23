from pydantic import BaseModel

class SolicitudChatCreate(BaseModel):
    id_emisor: int
    id_receptor: int