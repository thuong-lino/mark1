# Generated by Django 3.2.7 on 2021-10-02 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_order_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='unit',
            field=models.CharField(default='', max_length=10, verbose_name='Đơn vị tính'),
        ),
        migrations.AlterField(
            model_name='order',
            name='item',
            field=models.CharField(default='', max_length=50, verbose_name='Loại hàng hóa'),
        ),
        migrations.DeleteModel(
            name='Item',
        ),
    ]
