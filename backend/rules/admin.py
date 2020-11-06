from django.contrib import admin
from .models import Rule

#describe model to admin interface
class RuleAdmin(admin.ModelAdmin):
    #list_display lists all the fields in the model
    list_display = ('author','title','body','date_added')


# Register your models here.
admin.site.register(Rule, RuleAdmin)