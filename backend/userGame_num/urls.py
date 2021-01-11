from django.urls import path
from django.contrib.auth import views
from django.contrib.auth.forms import AdminPasswordChangeForm
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *

urlpatterns = [
    #home page showing the mandatory rules and allows creation of new rules
    path('', UserDetail.as_view(),name='user-detail'),
    path('create/',UserCreate.as_view(),name='user-create'),
    path('update/<int:num>',RunsUpdate.as_view(),name='runs-update'),
    path('password_change/', views.PasswordChangeView.as_view(),
        {'password_change_form': AdminPasswordChangeForm}, name='password_change'),
    path('password_change/done/', views.PasswordChangeDoneView.as_view(), name='password_change_done'),
]

urlpatterns = format_suffix_patterns(urlpatterns)