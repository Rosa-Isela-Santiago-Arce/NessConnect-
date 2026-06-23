from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    Form
)

from sqlalchemy.orm import Session
import uuid

from database import get_db

# ✔ MODELOS CORRECTOS
from models.publicacion import Publicacion
from models.comentarios import Comentario
from models.like import LikePublicacion

from schemas.publicacion import PublicacionUpdate
from dependencies.auth import verificar_usuario_activo 

router = APIRouter()


@router.get("/publicaciones")
def listar_publicaciones(db: Session = Depends(get_db)):
    return db.query(Publicacion).all()


@router.post("/publicaciones")
async def crear_publicacion(
    id_usuario: int = Form(...),
    titulo: str = Form(...),
    contenido: str = Form(...),
    archivo: UploadFile = File(None),
    db: Session = Depends(get_db),
    usuario = Depends(verificar_usuario_activo)
):

    ruta_archivo = None
    tipo_archivo = None

    if archivo:

        extension = archivo.filename.split(".")[-1].lower()
        nombre_archivo = f"{uuid.uuid4()}.{extension}"
        ruta_archivo = "uploads/" + nombre_archivo

        with open(ruta_archivo, "wb") as buffer:
            buffer.write(await archivo.read())

        tipo_archivo = extension

    nueva_publicacion = Publicacion(
        id_usuario=id_usuario,
        titulo=titulo,
        contenido=contenido,
        archivo=ruta_archivo,
        tipo_archivo=tipo_archivo
    )

    db.add(nueva_publicacion)
    db.commit()

    return {"mensaje": "Publicación creada correctamente"}


@router.put("/publicaciones/{id_publicacion}")
def editar_publicacion(
    id_publicacion: int,
    data: PublicacionUpdate,
    db: Session = Depends(get_db)
):

    pub = db.query(Publicacion).filter(
        Publicacion.id_publicacion == id_publicacion
    ).first()

    if not pub:
        return {"mensaje": "Publicación no encontrada"}

    pub.titulo = data.titulo
    pub.contenido = data.contenido

    db.commit()

    return {"mensaje": "Publicación actualizada"}


@router.delete("/publicaciones/{id_publicacion}")
def eliminar_publicacion(id_publicacion: int, db: Session = Depends(get_db)):

    pub = db.query(Publicacion).filter(
        Publicacion.id_publicacion == id_publicacion
    ).first()

    if not pub:
        return {"mensaje": "No existe"}

    try:

        db.query(Comentario).filter(
            Comentario.id_publicacion == id_publicacion
        ).delete()

        db.query(LikePublicacion).filter(
            LikePublicacion.id_publicacion == id_publicacion
        ).delete()

        db.delete(pub)
        db.commit()

        return {"mensaje": "Eliminada"}

    except Exception as e:
        db.rollback()
        return {"mensaje": "Error", "error": str(e)}


@router.get("/publicaciones/{id_publicacion}")
def obtener_publicacion(id_publicacion: int, db: Session = Depends(get_db)):

    pub = db.query(Publicacion).filter(
        Publicacion.id_publicacion == id_publicacion
    ).first()

    if not pub:
        return {"mensaje": "Publicación no encontrada"}

    return pub

@router.get("/publicaciones/usuario/{id_usuario}")
def publicaciones_usuario(
    id_usuario: int,
    db: Session = Depends(get_db)
):

    publicaciones = db.query(
        Publicacion
    ).filter(
        Publicacion.id_usuario == id_usuario
    ).all()

    return publicaciones