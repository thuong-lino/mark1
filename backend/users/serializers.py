from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from .models import User
from rest_framework.authtoken.models import Token
from django.db import transaction


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'firstname', 'password', 'phone_number']


class CustomRegisterSerializer(RegisterSerializer):
    firstname = serializers.CharField()
    lastname = serializers.CharField()
    phone_number = serializers.CharField()

    class Meta:
        model = User
        fields = ('firstname', 'lastname', 'email',
                  'password',  'phone_number')

    def get_cleaned_data(self):
        return {
            'firstname': self.validated_data.get('firstname', ''),
            'lastname': self.validated_data.get('lastname', ''),
            'email': self.validated_data.get('email', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'phone_number': self.validated_data.get('phone_number', ''),
        }

    @transaction.atomic  # roll back the save operation in case of errors
    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        print(user)
        self.cleaned_data = self.get_cleaned_data()
        user.firstname = self.cleaned_data.get('firstname')
        user.lastname = self.cleaned_data.get('lastname')
        user.phone_number = self.cleaned_data.get('phone_number')
        user.save()
        adapter.save_user(request, user, self)
        return user


class TokenSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ('key', 'user', 'name')

    def get_name(self, obj):
        serializer_data = UserSerializer(obj.user).data
        firstname = serializer_data.get('firstname')
        return {
            firstname,
        }
