from twilio.rest import Client
from dotenv import load_dotenv
import os

load_dotenv()

account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
verify_sid = os.getenv("TWILIO_VERIFY_SID")

client = Client(account_sid, auth_token)


def enviar_codigo(numero):
    verification = (
        client.verify.v2.services(verify_sid)
        .verifications
        .create(
            to=numero,
            channel="sms"
        )
    )

    return verification.status


def verificar_codigo(numero, codigo):
    verification_check = (
        client.verify.v2.services(verify_sid)
        .verification_checks
        .create(
            to=numero,
            code=codigo
        )
    )

    return verification_check.status