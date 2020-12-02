from django.contrib import admin
from .models import Team

#describe model to admin interface
class TeamAdmin(admin.ModelAdmin):
    #list_display lists fields of the model
    list_display = ('trainer','origin','name','nickname','captured','received','missed','stored','deceased')


# Register your models here.
admin.site.register(Team, TeamAdmin)