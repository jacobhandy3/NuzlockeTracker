"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
# from backend.pokemon import views as pokeviews
# from backend.region import views as regviews
# from backend.rules import views as ruleviews
# from backend.user import views as userviews
# from backend.userhistory import views as histviews

router = routers.DefaultRouter()
# router.register(r'rules',ruleviews.RuleView,'rules')
# router.register(r'pokemon',pokeviews.PokeView,'pokemon')
# router.register(r'regions','regviews.RegView,'region')
# router.register(r'history','histviews.HistView,'history')

urlpatterns = [
    path('admin/', admin.site.urls),
    #path('home/',include(router.urls))
]
