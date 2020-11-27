# from django.core.exceptions import ValidationError
# from django.db import models
# from django.contrib.auth.models import User
# from ..game.models import *

#Create your models here.

#model keeping track of caught teammates in a run by the user
# class Team(models.Model):
    #trainer, foregin key to pk in User
    # trainer = models.ForeignKey(User,on_delete=models.CASCADE)
    #origin, foreign key to pk in Game
    # origin = models.ForeignKey(Game,on_delete=models.CASCADE)
    #runNo represents a counter from 1-10 to track the user's last 10 runs
    #updates

    #default format for JSONField as a list of dicts
    #list of dicts represents each member's name,nickname, and status history
    # def member_default():
    #     return [
    #         {
    #             "name": "",
    #             "nickname": "",
    #             "status": {
    #                 "captured": "",
    #                 "received": "",
    #                 "missed": "",
    #                 "stored": "",
    #                 "deceased": "",
    #                 }
    #         }
    #     ]
    #members to hold list of all team members
    # members = models.JSONField(default=member_default)
    #override clean method to get the earliest created team from the last 10 teams
    #and delete it and create the newest run
    # def clean(self):
    #     if Team.objects.filter(user=self.trainer).count()>=10:
    #         raise ValidationError('Only 10 entries per user allowed')
