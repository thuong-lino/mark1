# Generated by Django 3.2.7 on 2021-10-02 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0006_transaction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='phatsinh_co',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=8, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='phatsinh_no',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=8, null=True),
        ),
    ]
