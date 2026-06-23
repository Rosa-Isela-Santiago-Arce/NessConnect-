from schemas.sms import TelefonoSchema, VerificacionSchema
from sms import enviar_codigo, verificar_codigo
from fastapi import APIRouter

router = APIRouter()

@router.post("/enviar-codigo")
def enviar(datos: TelefonoSchema):

    enviar_codigo(datos.telefono)

    return {
        "mensaje": "Código enviado"
    }


@router.post("/verificar-codigo")
def verificar(datos: VerificacionSchema):

    estado = verificar_codigo(
        datos.telefono,
        datos.codigo
    )

    if estado == "approved":
        return {
            "verificado": True
        }

    return {
        "verificado": False
    }