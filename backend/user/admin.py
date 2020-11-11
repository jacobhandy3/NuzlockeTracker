from django.contrib import admin
from .models import userRuns

#describe model to admin interface
class RunsAdmin(admin.ModelAdmin):
    #list_display lists fields of the model
    list_display = ('completed_runs','user_id')


# Register your models here.
admin.site.register(userRuns, RunsAdmin)