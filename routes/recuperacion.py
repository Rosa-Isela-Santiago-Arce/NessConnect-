from fastapi import (
    APIRouter,
    Depends
)

from sqlalchemy.orm import Session

from database import get_db
from models.usuario import Usuario
from models.codigo_recuperacion import CodigoRecuperacion

from correo import enviar_correo

import random


router = APIRouter()


@router.post("/recuperar-password")
async def recuperar_password(
    correo: str,
    db: Session = Depends(get_db)
):

    usuario = db.query(
        Usuario
    ).filter(
        Usuario.correo == correo
    ).first()


    if not usuario:

        return {
            "mensaje":
            "El correo no existe"
        }


    codigo = str(
        random.randint(
            100000,
            999999
        )
    )


    nuevo_codigo = CodigoRecuperacion(

        id_usuario=
        usuario.id_usuario,

        codigo=
        codigo

    )


    db.add(
        nuevo_codigo
    )

    db.commit()


    await enviar_correo(

        correo,

        "Código de recuperación",

        f"Tu código de recuperación es: {codigo}"

    )


    return {

        "mensaje":
        "Código enviado al correo"

    }
@router.post("/verificar-codigo")
def verificar_codigo(
    correo: str,
    codigo: str,
    db: Session = Depends(get_db)
):

    usuario = db.query(
        Usuario
    ).filter(
        Usuario.correo == correo
    ).first()


    if not usuario:

        return {
            "mensaje":
            "Usuario no encontrado"
        }


    codigo_db = db.query(
        CodigoRecuperacion
    ).filter(
        CodigoRecuperacion.id_usuario == usuario.id_usuario,
        CodigoRecuperacion.codigo == codigo,
        CodigoRecuperacion.usado == False
    ).first()


    if not codigo_db:

        return {
            "mensaje":
            "Código incorrecto"
        }


    codigo_db.usado = True

    db.commit()


    return {
        "mensaje":
        "Código correcto"
    }
@router.put("/cambiar-password")
def cambiar_password(
    correo: str,
    nueva_password: str,
    db: Session = Depends(get_db)
):

    usuario = db.query(
        Usuario
    ).filter(
        Usuario.correo == correo
    ).first()


    if not usuario:

        return {
            "mensaje":
            "Usuario no encontrado"
        }


    usuario.password = nueva_password

    db.commit()


    return {
        "mensaje":
        "Contraseña actualizada correctamente"
    }