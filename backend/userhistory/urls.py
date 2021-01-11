from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    path('', HistoryList.as_view(),name='history-list'),
    path('create/<int:game>',HistoryCreate.as_view(),name='history-create'),
    path('<slug:slug>/', HistoryDetail.as_view(), name='history-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)