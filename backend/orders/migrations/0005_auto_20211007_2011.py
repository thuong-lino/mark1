# Generated by Django 3.2.7 on 2021-10-07 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_auto_20211004_1859'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='date_flight',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='date_received',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='date_sent',
            field=models.DateField(),
        ),
    ]
