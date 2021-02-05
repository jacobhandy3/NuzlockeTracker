from django.contrib import admin
from .models import Game

#describe model to admin interface
class GameAdmin(admin.ModelAdmin):
    #list fields of the model
    list_display = ('contributor','name','region','locations')
    #prepopulates slug field using name field that will be slugified
    prepopulated_fields = {'slug':('name',)}


# Register your models here.
admin.site.register(Game, GameAdmin)