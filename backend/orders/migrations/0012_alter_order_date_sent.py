# Generated by Django 3.2.7 on 2021-10-10 06:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0011_auto_20211010_1332'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='date_sent',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
