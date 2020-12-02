from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path('<int:origin>/', TeamList.as_view(),name='team-list'),
    path('<int:pk>/', TeamDetail.as_view(),name='team-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)