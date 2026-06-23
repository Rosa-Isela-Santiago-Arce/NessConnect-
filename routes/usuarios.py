from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File
)

from sqlalchemy.orm import Session
from schemas.usuario import (
    UsuarioCreate,
    UsuarioUpdate,
    Login
)
from models.usuario import Usuario
from database import get_db

import shutil
import uuid

router = APIRouter()


@router.get("/usuarios")
def listar_usuarios(
    db: Session = Depends(get_db)
):

    usuarios = db.query(
        Usuario
    ).all()

    return usuarios


@router.get("/usuarios/{id_usuario}")
def obtener_usuario(
    id_usuario: int,
    db: Session = Depends(get_db)
):

    usuario = db.query(
        Usuario
    ).filter(
        Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:

        return {
            "mensaje":
            "Usuario no encontrado"
        }

    return usuario


@router.post("/usuarios")
def crear_usuario(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db)
):

    nuevo_usuario = Usuario(

        nombre_usuario=
        usuario.nombre_usuario,

        correo=
        usuario.correo,

        telefono=
        usuario.telefono,

        password=
        usuario.password,

        carrera=
        usuario.carrera,

        materias=
        usuario.materias

    )

    db.add(
        nuevo_usuario
    )

    db.commit()

    return {
        "mensaje":
        "Usuario creado correctamente"
    }


@router.post("/login")
def login(
    datos: Login,
    db: Session = Depends(get_db)
):

    usuario = db.query(
        Usuario
    ).filter(
        Usuario.correo ==
        datos.correo
    ).first()

    if not usuario:

        return {
            "mensaje":
            "Usuario no encontrado"
        }

    if usuario.password != datos.password:

        return {
            "mensaje":
            "Contraseña incorrecta"
        }

    return {

        "mensaje":
        "Login correcto",

        "id_usuario":
        usuario.id_usuario,

        "usuario":
        usuario.nombre_usuario

    }


@router.put("/usuarios/foto/{id_usuario}")
async def subir_foto_perfil(
    id_usuario: int,
    archivo: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    usuario = db.query(
        Usuario
    ).filter(
        Usuario.id_usuario ==
        id_usuario
    ).first()

    if not usuario:

        return {
            "mensaje":
            "Usuario no encontrado"
        }

    extension = (
        archivo.filename
        .split(".")[-1]
    )

    nombre_archivo = (
        f"{uuid.uuid4()}.{extension}"
    )

    ruta = (
        f"uploads/{nombre_archivo}"
    )

    with open(
        ruta,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            archivo.file,
            buffer
        )

    usuario.foto_perfil = ruta

    db.commit()

    return {
        "mensaje":
        "Foto actualizada correctamente"
    }
@router.put("/usuarios/{id_usuario}")
def actualizar_usuario(

    id_usuario: int,
    datos: UsuarioUpdate,
    db: Session = Depends(get_db)

):

    usuario = db.query(
        Usuario
    ).filter(
        Usuario.id_usuario == id_usuario
    ).first()


    if not usuario:

        return {
            "mensaje":
            "Usuario no encontrado"
        }


    usuario.carrera = (
        datos.carrera
    )

    usuario.materias = (
        datos.materias
    )

    usuario.semestre = (
        datos.semestre
    )


    db.commit()


    return {

        "mensaje":
        "Información actualizada"

    }