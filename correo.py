import os
from dotenv import load_dotenv
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig


load_dotenv()

config_correo = ConnectionConfig(
    MAIL_USERNAME=os.getenv("CORREO_APP"),
    MAIL_PASSWORD=os.getenv("CORREO_PASSWORD"),
    MAIL_FROM=os.getenv("CORREO_APP"),
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
)


correo = FastMail(config_correo)


async def enviar_correo(destino, asunto, mensaje):

    email = MessageSchema(
        subject=asunto,
        recipients=[destino],
        body=mensaje,
        subtype="plain"
    )

    await correo.send_message(email)