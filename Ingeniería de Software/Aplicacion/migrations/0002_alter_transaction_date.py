# Generated by Django 4.2 on 2023-06-27 04:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Aplicacion", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="transaction",
            name="date",
            field=models.DateField(default=datetime.date.today),
        ),
    ]
