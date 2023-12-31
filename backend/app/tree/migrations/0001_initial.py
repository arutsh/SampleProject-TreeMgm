# Generated by Django 4.2.5 on 2023-09-23 14:33

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TreeType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(editable=False)),
                ('modified_on', models.DateTimeField(editable=False)),
                ('last_viewed_on', models.DateTimeField(editable=False)),
                ('name', models.CharField(max_length=50)),
                ('description', models.CharField(blank=True, max_length=1000, null=True)),
                ('lifespan', models.IntegerField(blank=True, null=True)),
                ('oxygen', models.IntegerField(blank=True, null=True)),
                ('created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_created_by', to=settings.AUTH_USER_MODEL)),
                ('last_viewed_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_last_viewed_by', to=settings.AUTH_USER_MODEL)),
                ('modified_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Tree',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(editable=False)),
                ('modified_on', models.DateTimeField(editable=False)),
                ('last_viewed_on', models.DateTimeField(editable=False)),
                ('identifier', models.CharField(max_length=50)),
                ('location', models.CharField(max_length=100)),
                ('planted_on', models.DateField()),
                ('created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_created_by', to=settings.AUTH_USER_MODEL)),
                ('last_viewed_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_last_viewed_by', to=settings.AUTH_USER_MODEL)),
                ('modified_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='%(app_label)s_%(class)s_modified_by', to=settings.AUTH_USER_MODEL)),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tree.treetype')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
