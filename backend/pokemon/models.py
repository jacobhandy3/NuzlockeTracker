from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#model keeping track of caught pokemon in a run by the user
#class Pokemon(models.Model):
    #trainer, foregin key to pk in User
    #trainer = models.ForeignKey(User, )
    #origin, foreign key to pk in Region

    #name representing the pokemon name

    #nickname representing the user given name to the pokemon

    #status representing the history of statuses for a caught pokemon
    #JSON format with statuses mapping to date status applied
    #status: captured,received,missed,stored,deceased