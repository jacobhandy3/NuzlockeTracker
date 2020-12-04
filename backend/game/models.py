from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse

# Create your models here.

#model to represent pokemon games and custom games
class Game(models.Model): 
    #contributor, foreign key to pk in User
    contributor = models.ForeignKey(User,on_delete=models.CASCADE)
    #name, representing the name of the pokemon version
    name = models.CharField(max_length=50)
    #region, representing the pokemon region of the game
    region = models.CharField(max_length=25)
    #locations, json list for the areas with catchable pokemon w/i the region
    locations = models.JSONField()
    #slug for use in url instead of pk
    slug = models.SlugField(null=False,unique=True,max_length=75)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse("game-detail", kwargs={"slug": self.slug})
    