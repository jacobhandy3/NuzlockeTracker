from django.db import models
from django.contrib.auth.models import User
from ..game.models import *

# Create your models here.

#model keeping track of caught teammates in a run by the user
#class Team(models.Model):
    #trainer, foregin key to pk in User
    #trainer = models.ForeignKey(User,on_delete=models.CASCADE)
    #origin, foreign key to pk in Game
    #origin = models.ForeignKey(Game,on_delete=models.CASCADE)
    #name representing the team member's name
    #name = models.CharField(max_length=15)
    #nickname representing the user given name to the teammate
    #nickname = models.CharField(max_length=15)
    #status representing the history of statuses for a caught teammate
    #JSON format with statuses mapping to date status applied
    #status: captured,received,missed,stored,deceased
    #status = models.JSONField()
