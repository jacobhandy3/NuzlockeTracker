from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    #home page showing the mandatory rules and allows creation of new rules
    path('', UserDetail.as_view(),name='user-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)