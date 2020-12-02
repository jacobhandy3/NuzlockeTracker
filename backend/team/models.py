import os, sys
current_dir = os.path.dirname(os.path.join(os.getcwd(), __file__))
sys.path.append(os.path.normpath(os.path.join(current_dir, '..', '..')))

from django.db import models
from django.contrib.auth.models import User
from game.models import Game

#Create your models here.

#model keeping track of caught teammates in a run by the user
class Team(models.Model):
    #trainer, foregin key to pk in User
    trainer = models.ForeignKey(User,on_delete=models.CASCADE)
    #origin, foreign key to pk in Game
    origin = models.ForeignKey(Game,on_delete=models.CASCADE)
    #Official name of teammate
    name = models.CharField(max_length=15,blank=False)
    #Nickname given by trainer
    nickname = models.CharField(max_length=15)
    #captured in area date
    captured = models.DateTimeField()
    #received in some way date
    received = models.DateTimeField()
    #date mon was encountered but not caught
    missed = models.DateTimeField()
    #stored in pc date
    stored = models.DateTimeField()
    #date mon was defeated
    deceased = models.DateTimeField()

    def __str__(self):
        return self.name