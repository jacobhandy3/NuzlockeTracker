from django.contrib import admin
from .models import gameNum

#describe model to admin interface
class RunsAdmin(admin.ModelAdmin):
    #list_display lists fields of the model
    list_display = ('completed_runs','userID')


# Register your models here.
admin.site.register(gameNum, RunsAdmin)