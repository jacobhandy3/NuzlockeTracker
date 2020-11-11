from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rules import views

urlpatterns = [
    #home page showing the mandatory rules
    path('', views.RuleList.as_view(),name='rules'),
    #show user custom rules + mandatory rules
    path('<slug:slug>/', views.RuleDetail.as_view(),name='rule-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)