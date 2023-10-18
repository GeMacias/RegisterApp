from django.urls import path
from .views import ApiRoot, redirect_root, SignUp, Login, TestToken, ListUsers

urlpatterns = [
    path('', redirect_root, name='redirect-root'),
    path('api-auth/', ApiRoot.as_view(), name='api-root'),
    path('api-auth/login', Login.as_view()),
    path('api-auth/signup', SignUp.as_view()),
    path('api-auth/testToken', TestToken.as_view()),
    path('api-auth/listUsers', ListUsers.as_view())
]