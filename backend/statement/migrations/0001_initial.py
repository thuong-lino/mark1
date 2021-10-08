# Generated by Django 3.2.7 on 2021-10-02 16:02

from django.db import migrations, models
import django.db.models.deletion
import statement.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('customers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Period',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField(default=statement.models.current_year)),
                ('open_date', models.DateField(auto_now_add=True)),
                ('close_date', models.DateField(blank=True, null=True)),
                ('is_close', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Statement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('open_debit', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=8, null=True)),
                ('open_credit', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=8, null=True)),
                ('transaction_debit', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=8, null=True)),
                ('transaction_credit', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=8, null=True)),
                ('close_debit', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=8, null=True)),
                ('close_credit', models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=8, null=True)),
                ('customer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='customers.customer')),
                ('period', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stament', to='statement.period')),
            ],
        ),
    ]
