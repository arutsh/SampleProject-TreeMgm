# Generated by Django 4.2.5 on 2023-09-25 09:56

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('tree', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tree',
            name='modified_on',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
        migrations.AlterField(
            model_name='treetype',
            name='modified_on',
            field=models.DateTimeField(default=django.utils.timezone.now, editable=False),
        ),
    ]
