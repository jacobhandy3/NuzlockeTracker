from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

#model to add completed runs to django's User model
class gameNum(models.Model):
    #completed_runs represents number of runs ended(not including failed runs that are cleared)
    completed_runs = models.IntegerField()
    userID = models.OneToOneField(User, on_delete=models.CASCADE)
    
@receiver(post_save, sender=User)
def create_user_gameNum(sender,instance,created,**kwargs):
    if created:
        gameNum.objects.create(userID=instance,completed_runs=0)

