from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from database import get_db
from models.mensaje import Mensaje
from models.conversacion import Conversacion
from models.solicitud_chat import SolicitudChat
from models.notificacion import Notificacion
from schemas.mensaje import MensajeCreate
from schemas.solicitud_chat import SolicitudChatCreate


from websocket.connection_manager import manager

router = APIRouter()


# =========================
# ENVIAR MENSAJE
# =========================

@router.post("/chat")
def enviar_mensaje(
    mensaje: MensajeCreate,
    db: Session = Depends(get_db),
):

    conversacion = db.query(
        Conversacion
    ).filter(

        (
            (Conversacion.id_usuario1 == mensaje.id_emisor)
            &
            (Conversacion.id_usuario2 == mensaje.id_receptor)
        )

        |

        (
            (Conversacion.id_usuario1 == mensaje.id_receptor)
            &
            (Conversacion.id_usuario2 == mensaje.id_emisor)
        )

    ).first()

    if not conversacion:

        conversacion = Conversacion(
            id_usuario1=mensaje.id_emisor,
            id_usuario2=mensaje.id_receptor
        )

        db.add(conversacion)

        db.commit()

        db.refresh(conversacion)

    nuevo = Mensaje(

        id_emisor=mensaje.id_emisor,

        id_receptor=mensaje.id_receptor,

        id_conversacion=conversacion.id_conversacion,

        contenido=mensaje.contenido

    )

    db.add(nuevo)

    # Crear notificación para el receptor
    notificacion = Notificacion(

        id_usuario=mensaje.id_receptor,

        tipo="mensaje",

        mensaje="Tienes un nuevo mensaje",

        leida=False

    )

    db.add(notificacion)

    db.commit()

    db.refresh(nuevo)

    return {

        "mensaje": "OK",

        "id_mensaje": nuevo.id_mensaje
    }
# =========================
# CREAR SOLICITUD
# =========================
@router.post("/solicitudes-chat")
def crear_solicitud(
    data: SolicitudChatCreate,
    db: Session = Depends(get_db),
):

    solicitud_existente = db.query(
        SolicitudChat
    ).filter(

        (
            (SolicitudChat.id_emisor == data.id_emisor)
            &
            (SolicitudChat.id_receptor == data.id_receptor)
        )

        |

        (
            (SolicitudChat.id_emisor == data.id_receptor)
            &
            (SolicitudChat.id_receptor == data.id_emisor)
        )

    ).first()

    if solicitud_existente:

        return {
            "mensaje":
            "Ya existe una solicitud entre estos usuarios"
        }

    solicitud = SolicitudChat(
        id_emisor=data.id_emisor,
        id_receptor=data.id_receptor,
        estado="pendiente",
        mensajes_temporales=0
    )

    db.add(solicitud)

    # Crear notificación para el receptor
    notificacion = Notificacion(

        id_usuario=data.id_receptor,

        tipo="solicitud",

        mensaje="Tienes una nueva solicitud",

        leida=False

    )

    db.add(notificacion)

    conversacion = db.query(
        Conversacion
    ).filter(

        (
            (Conversacion.id_usuario1 == data.id_emisor)
            &
            (Conversacion.id_usuario2 == data.id_receptor)
        )

        |

        (
            (Conversacion.id_usuario1 == data.id_receptor)
            &
            (Conversacion.id_usuario2 == data.id_emisor)
        )

    ).first()

    if not conversacion:

        conversacion = Conversacion(
            id_usuario1=data.id_emisor,
            id_usuario2=data.id_receptor
        )

        db.add(conversacion)

    db.commit()

    return {
        "mensaje": "Solicitud enviada"
    }

# =========================
# OBTENER CHAT ENTRE 2 USUARIOS
# =========================

@router.get("/chat/{id1}/{id2}")
def obtener_chat(
    id1: int,
    id2: int,
    db: Session = Depends(get_db),
):

    conversacion = db.query(
        Conversacion
    ).filter(

        (
            (Conversacion.id_usuario1 == id1)
            &
            (Conversacion.id_usuario2 == id2)
        )

        |

        (
            (Conversacion.id_usuario1 == id2)
            &
            (Conversacion.id_usuario2 == id1)
        )

    ).first()

    if not conversacion:
        return []

    mensajes = db.query(
        Mensaje
    ).filter(
        Mensaje.id_conversacion ==
        conversacion.id_conversacion
    ).order_by(
        Mensaje.fecha_envio
    ).all()

    return mensajes


# =========================
# OBTENER TODOS LOS MENSAJES
# =========================

@router.get("/chat")
def obtener_mensajes(
    db: Session = Depends(get_db),
):

    return db.query(
        Mensaje
    ).all()


# =========================
# OBTENER CONVERSACIÓN
# =========================

@router.get("/conversacion/{id1}/{id2}")
def obtener_conversacion(
    id1: int,
    id2: int,
    db: Session = Depends(get_db),
):

    conversacion = db.query(
        Conversacion
    ).filter(

        (
            (Conversacion.id_usuario1 == id1)
            &
            (Conversacion.id_usuario2 == id2)
        )

        |

        (
            (Conversacion.id_usuario1 == id2)
            &
            (Conversacion.id_usuario2 == id1)
        )

    ).first()

    if not conversacion:

        return {
            "id_conversacion": None
        }

    return {
        "id_conversacion":
        conversacion.id_conversacion
    }


# =========================
# WEBSOCKET
# =========================

@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket
):

    await manager.connect(
        websocket
    )

    try:

        while True:

            data = await websocket.receive_text()

            await manager.send_message(
                data
            )

    except WebSocketDisconnect:

        manager.disconnect(
            websocket
        )