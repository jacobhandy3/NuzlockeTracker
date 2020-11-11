from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#model to add completed runs to django's User model
class userRuns(models.Model):
    #completed_runs represents number of runs ended(not including failed runs that are cleared)
    completed_runs = models.IntegerField()
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    