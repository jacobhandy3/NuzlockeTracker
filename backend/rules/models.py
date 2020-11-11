from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse

# Create your models here.

#model for users to create their own rules
class Rule(models.Model):
    #author as a foreign key to the pk in Users
    #optional so i can set the standard, required rules
    author = models.ForeignKey(User,on_delete=models.CASCADE)

    #title representing the name of the rule
    title = models.CharField(max_length=100)

    #body representing the details of the rule
    body = models.TextField()

    #date_added marking the creation of the rule
    date_added = models.DateTimeField(auto_now_add=True)

    slug = models.SlugField(null=False,unique=True, max_length=125)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("rule-detail", kwargs={"slug": self.slug})
