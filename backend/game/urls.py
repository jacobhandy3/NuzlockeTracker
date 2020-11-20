from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    #home page showing the mandatory games
    path('', GameList.as_view(),name='games'),
    #show user custom rules + mandatory rules
    path('<slug:slug>/', GameDetail.as_view(),name='game-detail'),
    path('create/',GameCreate.as_view(),name='game-create')
]

urlpatterns = format_suffix_patterns(urlpatterns)