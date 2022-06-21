from django.core.mail import EmailMessage
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import jwt
from django.conf import settings
import os

class Util:
    @staticmethod
    def send_email(data):

        gmail_user = os.environ.get('EMAIL_HOST_USER')
        gmail_password = os.environ.get('EMAIL_HOST_PASSWORD')

        msg = MIMEMultipart()
        msg['From'] = gmail_user
        msg['To']= data['to_email']
        msg['Subject'] = data['email_subject']
        msg.attach(MIMEText(data['email_body']))

        recipient = data['to_email']

        
        try:
            mailServer = smtplib.SMTP('smtp.gmail.com', 587)
            mailServer.ehlo()
            mailServer.starttls()
            mailServer.ehlo()
            mailServer.login(gmail_user, gmail_password)
            mailServer.sendmail(gmail_user, recipient, msg.as_string())
            mailServer.close()

            print('Email sent!')
        except Exception as exception:
            print("Error: %s!\n\n" % exception)

        

def get_User_Info (request):
    auth_header = request.headers['Authorization']
    auth_token = auth_header.split(" ")
    token = auth_token[1]
    keys = os.environ.get('keys')
    payload = jwt.decode(token, settings.SECRET_KEY,keys)
    return payload