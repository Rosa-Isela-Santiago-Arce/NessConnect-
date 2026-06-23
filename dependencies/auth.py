from fastapi import HTTPException

def verificar_usuario_activo(usuario):

    if not usuario.telefono_verificado:
        raise HTTPException(
            status_code=403,
            detail="Debes verificar tu teléfono para usar la app"
        )

    return usuario