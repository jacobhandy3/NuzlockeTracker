from django.contrib import admin
from .models import History

#describe model to admin interface
class HistoryAdmin(admin.ModelAdmin):
    #list_display lists fields of the model
    list_display = ('author','game','title','start_date','end_date','body')
    prepopulated_fields = {'slug': ('title',)}


# Register your models here.
admin.site.register(History, HistoryAdmin)