# Generated by Django 3.2.7 on 2021-10-10 06:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0010_alter_order_weight'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='created_at',
        ),
        migrations.AlterField(
            model_name='order',
            name='date_sent',
            field=models.DateField(auto_now_add=True),
        ),
    ]
