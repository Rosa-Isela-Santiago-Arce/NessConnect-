from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routes.usuarios import router as usuarios_router
from routes.publicaciones import router as publicaciones_router
from routes.likes import router as likes_router
from routes.comentarios import router as comentarios_router
from routes.amigos import router as amigos_router
from routes.bloqueados import router as bloqueados_router
from routes.chat import router as chat_router
from routes.conversaciones import router as conversaciones_router
from routes.estado_jugador import router as estado_router
from routes.notificaciones import router as notificaciones_router
from routes.nova import router as nova_router
from routes.emocion_nova import router as emocion_nova_router
from routes.actividad_nova import router as actividad_nova_router
from routes.frase_nova import router as frase_nova_router
from routes.afinidad_nova import router as afinidad_nova_router
from routes.evento_nova import router as evento_nova_router
from routes.memoria_nova import router as memoria_nova_router
from routes.recuperacion import router as recuperacion_router
from routes.sms import router as sms_router

allow_origins=["*"]
app = FastAPI()
app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    sms_router,
    prefix="/sms",
    tags=["SMS"]
)

app.include_router(usuarios_router)
app.include_router(publicaciones_router)
app.include_router(likes_router)
app.include_router(comentarios_router)
app.include_router(amigos_router)
app.include_router(bloqueados_router)
app.include_router(chat_router)
app.include_router(conversaciones_router)
app.include_router(estado_router)
app.include_router(notificaciones_router)

app.include_router(nova_router)
app.include_router(emocion_nova_router)
app.include_router(actividad_nova_router)
app.include_router(frase_nova_router)
app.include_router(afinidad_nova_router)
app.include_router(evento_nova_router)
app.include_router(memoria_nova_router)
app.include_router(recuperacion_router)

@app.get("/")
def inicio():
    return {"mensaje": "Bienvenido a GameLink"}
