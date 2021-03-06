import os, sys
current_dir = os.path.dirname(os.path.join(os.getcwd(), __file__))
sys.path.append(os.path.normpath(os.path.join(current_dir, '..', '..')))

from django.db import models
from django.contrib.auth.models import User
from game.models import Game
from django.urls import reverse
# Create your models here.

#model for keeping track of the user's completed runs in a pre-generated story
class History(models.Model):
    #author, foreign key to pk in User
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    #game, foreign key to pk in Game
    game = models.ForeignKey(Game,on_delete=models.CASCADE,blank=True,null=True)
    #title representing the name of the run designated by user
    title = models.TextField(blank=True,null=True)
    #start_date marking the date and time the complete run began
    start_date = models.DateTimeField(blank=True,null=True)
    #end_date marking the date and time the complete run ended
    end_date = models.DateTimeField(auto_now_add=True,blank=True,null=True)
    #body detailing a pre-generated story based on the details in Pokemon table corresponding to the completed run
    body = models.TextField(blank=True,null=True)
    #slug for unique identification of each history
    slug = models.SlugField(blank=True,null=True,unique=True,max_length=201)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("history-detail", kwargs={"slug": self.slug})