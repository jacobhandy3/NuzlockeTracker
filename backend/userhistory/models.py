from django.db import models
from django.contrib.auth.models import User

# Create your models here.

#model for keeping track of the user's completed runs in a pre-generated story
#class History(models.Model):
    #author, foreign key to pk in User
    #author = models.ForeignKey(User,)
    #title representing the name of the run designated by user
    #default name: "USER_NAME's REGION_NAME RUN #[counter]"

    #start_date marking the date and time the complete run began

    #end_date marking the date and time the complete run ended

    #version representing the pokemon game version played on

    #body detailing a pre-generated story based on the details in Pokemon table corresponding to the completed run