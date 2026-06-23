

from pydantic import BaseModel


class UsuarioCreate(BaseModel):

    nombre_usuario: str
    correo: str
    telefono: str
    password: str

    carrera: str | None = None
    materias: str | None = None
    semestre: int | None = None


class UsuarioResponse(BaseModel):

    id_usuario: int
    nombre_usuario: str
    correo: str
    telefono: str | None = None
    monedas: int
    foto_perfil: str | None = None

    carrera: str | None = None
    materias: str | None = None
    semestre: int | None = None

class Config:
        from_attributes = True
        
class UsuarioUpdate(BaseModel):

    carrera: str | None = None
    materias: str | None = None
    semestre: int | None = None

class Login(BaseModel):

    correo: str
    password: str