# Generated by Django 3.2.7 on 2021-10-07 06:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0003_currencyrates'),
    ]

    operations = [
        migrations.AlterField(
            model_name='currencyrates',
            name='rate',
            field=models.DecimalField(decimal_places=10, max_digits=15),
        ),
    ]
