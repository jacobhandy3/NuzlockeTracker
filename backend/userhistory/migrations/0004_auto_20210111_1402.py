# Generated by Django 3.1.2 on 2021-01-11 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userhistory', '0003_auto_20201210_1227'),
    ]

    operations = [
        migrations.AlterField(
            model_name='history',
            name='slug',
            field=models.SlugField(blank=True, max_length=201, null=True, unique=True),
        ),
    ]
