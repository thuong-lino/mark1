# Generated by Django 3.2.7 on 2021-10-07 07:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0002_api_key_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='customertransaction',
            name='currency',
            field=models.CharField(default='USD', max_length=3),
        ),
    ]
