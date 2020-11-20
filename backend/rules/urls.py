from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    #home page showing the mandatory rules
    path('', RuleList.as_view(),name='rules'),
    #show user custom rules + mandatory rules
    path('<slug:slug>/', RuleDetail.as_view(),name='rule-detail'),
    path('create/',RuleCreate.as_view(),name='rule-create')
]

urlpatterns = format_suffix_patterns(urlpatterns)