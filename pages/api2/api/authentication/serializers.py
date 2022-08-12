from rest_framework import serializers
from .models import User
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from django.http import JsonResponse


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ('email','username','password')
        
    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')


        if not username.isalnum():
            raise serializers.ValidationError(
                "The username should only contain alphanumeric characters"
            )
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ('token')

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id','username', 'email', 'is_staff','notifications', 'carts', 'saved_dishes')


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=6,write_only = True)
    username = serializers.CharField(max_length=255, min_length=3, read_only=True)
    tokens = serializers.CharField(max_length=68, min_length=6, read_only = True)
    is_staff = serializers.CharField(max_length=10, min_length=4, read_only = True)

    class Meta:
        model = User
        fields = ('email', 'password','username', 'tokens', 'is_staff')

    def validate(self, attrs):
        email = attrs.get('email', '')
        password= attrs.get('password', '')
        user = auth.authenticate(email=email, password=password)


        if not user:
            raise AuthenticationFailed({'error': 'Invalid credentials, try again.'})

        if not user.is_active:
            raise AuthenticationFailed("Account disabled, contact admin")
        # if not user.is_verified:
        #     raise AuthenticationFailed("Email is not verified.")


        return {
            'email': user.email,
            'username': user.username,
            'is_staff':user.is_staff,
            'tokens': user.tokens
        }

class StaffRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=6, write_only=True)
    class Meta:
        model = User
        fields = ('id','username', 'email', 'password')

    def validate(self, attrs):
        email = attrs.get('email', '')
        username = attrs.get('username', '')
    
        if not username.isalnum():
            raise serializers.ValidationError(
                "The username should only contain alphanumeric characters"
            )
        return attrs
        
    def create(self, validated_data):
        return User.objects.create_staffuser(**validated_data)
        