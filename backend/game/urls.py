from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    #returns the OG games
    path('', GameList.as_view(),name='games'),
    #returns custom games
    path('custom/', GameCustomList.as_view(),name='custom-games'),
    #separate page for user defined game
    path('create/',GameCreate.as_view(),name='game-create'),
    #show specific game by its slug
    path('<slug:slug>/', GameDetail.as_view(),name='game-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)