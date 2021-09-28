# Generated by Django 3.2.7 on 2021-09-28 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(max_length=20)),
                ('lastname', models.CharField(max_length=30)),
                ('phone_number', models.CharField(default='', max_length=12)),
                ('email', models.EmailField(max_length=100, null=True, unique=True)),
                ('TIN', models.CharField(max_length=13, unique=True, verbose_name='Mã số thuế')),
                ('DOB', models.DateField(null=True, verbose_name='Ngày Sinh')),
                ('address', models.CharField(max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
