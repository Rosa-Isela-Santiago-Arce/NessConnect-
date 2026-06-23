from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models.memoria_nova import MemoriaNova
from schemas.memoria_nova import MemoriaNovaCreate

router = APIRouter()


@router.post("/memorias_nova")
def crear_memoria(
    datos: MemoriaNovaCreate,
    db: Session = Depends(get_db)
):

    nueva_memoria = MemoriaNova(
        id_nova=datos.id_nova,
        titulo=datos.titulo,
        contenido=datos.contenido
    )

    db.add(nueva_memoria)

    db.commit()

    return {
        "mensaje": "Memoria guardada correctamente 👾🧠"
    }


@router.get("/memorias_nova")
def obtener_memorias(
    db: Session = Depends(get_db)
):

    memorias = db.query(
        MemoriaNova
    ).all()

    return memorias
import random


@router.get("/nova/recuerdo")
def recordar(
    db: Session = Depends(get_db)
):

    memorias = db.query(
        MemoriaNova
    ).all()

    if not memorias:

        return {
            "mensaje": "Todavía no recuerdo nada 👾"
        }

    memoria = random.choice(
        memorias
    )

    return {
        "frase": f"Recuerdo que {memoria.titulo} es {memoria.contenido} 👾"
    }