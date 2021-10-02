# Generated by Django 3.2.7 on 2021-10-01 09:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0006_alter_order_total'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='currency',
            field=models.CharField(choices=[('USD', 'USD'), ('VND', 'VND')], default='USD', max_length=3),
        ),
    ]
