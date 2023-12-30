from django.contrib import admin

# Register your models here.

from Aplicacion.models import User, Transaction

admin.site.register(User)
admin.site.register(Transaction)