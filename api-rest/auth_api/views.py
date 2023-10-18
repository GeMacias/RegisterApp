from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404,redirect

from .serializers import UserSerializer


# Public views
class ApiRoot(APIView):
    def get(self, request):
        return Response({"detail": "This is the root of the API."})

class SignUp(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = User.objects.get(username=request.data['username'])
            user.set_password(request.data["password"])
            user.save()
            token = Token.objects.create(user=user)
            return Response({"token": token.key, "username": request.data["username"]})
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)

class Login(APIView):
    def post(self, request):
        user = get_object_or_404(User,username=request.data["username"])
        if not user.check_password(request.data["password"]):
            return Response({"detail": "User not found"}, status.HTTP_404_NOT_FOUND)
        token, created = Token.objects.get_or_create(user=user)
        return Response({"user":request.data["username"],"token":token.key},status.HTTP_200_OK)

# Authentication imports
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import TokenAuthentication, SessionAuthentication

# Views that require atuhentication
class TestToken(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(f"Passed for {request.user.username}", status.HTTP_200_OK)

class ListUsers(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get(self, request):
        usernames = [user.username for user in User.objects.all()]
        return Response(usernames, status.HTTP_200_OK)
    
def redirect_root(request):
    return redirect('api-root')