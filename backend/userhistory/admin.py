from django.contrib import admin
from .models import History

#describe model to admin interface
#class HistoryAdmin(admin.ModelAdmin):
    #list_display lists fields of the model
    #list_display = ('author','title','start_date','end_date','version','body')
    #default name: "USER_NAME's REGION_NAME RUN #[counter]"
    #prepopulated_fields = {'title':}


# Register your models here.
#admin.site.register(History, HistoryAdmin)