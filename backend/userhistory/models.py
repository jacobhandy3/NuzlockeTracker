from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#model for keeping track of the user's completed runs in a pre-generated story
#class History(models.Model):
    #author, foreign key to pk in User
    #author = models.ForeignKey(User,on_delete=models.CASCADE)
    #title representing the name of the run designated by user
    #title = models.CharField(max_length=50)
    #start_date marking the date and time the complete run began
    #start_date = models.DateTimeField()
    #end_date marking the date and time the complete run ended
    #end_date = models.DateTimeField()
    #version representing the pokemon game version played on

    #body detailing a pre-generated story based on the details in Pokemon table corresponding to the completed run
    #body = models.TextField()