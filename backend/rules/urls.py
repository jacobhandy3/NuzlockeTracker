from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rules import views

urlpatterns = [
    path('', views.RuleList.as_view(),name='rules'),
    path('<int:fk>/<int:pk>/', views.RuleDetail.as_view(),name='rule-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)