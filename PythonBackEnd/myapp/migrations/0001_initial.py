# Generated by Django 5.1 on 2024-08-20 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('pen_name', models.CharField(blank=True, max_length=250, null=True)),
                ('bio', models.TextField()),
                ('birth_date', models.DateField()),
                ('nationality', models.CharField(max_length=250)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_pictures/')),
            ],
        ),
    ]