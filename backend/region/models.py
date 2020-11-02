from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#model to represent pokemon regions and user created custom regions
#class Region(models.Model):
    #source, foreign key to pk in User
    #optional so I can add standard regions
    #source = models.ForeignKey(User,)
    #name, representing the name of the pokemon region

    #version, representing the pokemon game version being played on the region

    #locations, lists the areas with catchable pokemon w/i the region
    #json format mapping a number to the location to maintain order of encounter