from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path(r'admin/', admin.site.urls),
    path(r'accounts/', include('django.contrib.auth.urls')),
    path(r'accounts/profile/',include('userGame_num.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path(r'api/rules/', include('rules.urls')),
    path(r'api/game/',include('game.urls')),
    path(r'api/team/',include('team.urls')),
    path(r'api/history/',include('userhistory.urls')),
]
