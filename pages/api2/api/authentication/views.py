from django.shortcuts import render
from rest_framework import generics, status, views

from .serializers import RegisterSerializer, UserSerializer, LoginSerializer,EmailVerificationSerializer, StaffRegisterSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from django.http import Http404
import jwt
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
import os

# Create your views here.

class RegisterAPIView(generics.GenericAPIView):

    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(email=serializer.data['email'])
            token = RefreshToken.for_user(user).access_token

            # configure email verification content
            current_site = get_current_site(request).domain
            relativeLink = reverse('email-verify')

            absurl='http://'+current_site+relativeLink+"?token="+str(token)
            email_body = 'Hi '+user.username+' Use the link below to verify your email \n'  + absurl
            data = {
                'email_body': email_body,
                'to_email': user.email,
                'domain': absurl,
                'email_subject': 'no-reply: verify your email'
            }
            Util.send_email(data)
            responses = {
                'message': 'User registration successful. Check your email',
                'data': serializer.data
            }
            return Response(responses, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailAPIView(generics.GenericAPIView):
    serializer_class = UserSerializer
    
    def user(self, id):
        try:
            user= User.objects.get(id=id)
            return user
 
        except User.DoesNotExist:
            raise Http404
 
    def get(self, request, id):
        user_detail = self.user(id)
        serializer = UserSerializer(user_detail)
        return Response({'user': serializer.data})


    def delete(self, request, id):
        user_detail= self.user(id)
        user_detail.delete()
        return Response({'message': "User has been deleted"},status=status.HTTP_204_NO_CONTENT)

        
       
class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer

    # add a field for token on swagger 
    token_param_config = openapi.Parameter('token', in_=openapi.IN_QUERY, description="Description", type = openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        keys = os.environ.get('keys')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, keys)
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({'message': "email successfully activated"},status=status.HTTP_200_OK)

        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Token activation expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)


        return Response(serializer.data, status=status.HTTP_200_OK)

class StaffRegisterAPIView(generics.GenericAPIView):
    authentication_classes = []
    serializer_class = StaffRegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()
            responses = {
                'message': 'Vendor signup was successful',
                'data':serializer.data,
            }
            return Response(responses, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
