# Generated by Django 5.1 on 2024-09-09 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0012_delete_author_alter_artists_id_alter_artists_status_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Comic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='profile_pictures/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('status', models.IntegerField(choices=[(0, 'Inactive'), (1, 'Active')], default=1)),
                ('artists', models.ManyToManyField(blank=True, related_name='comics', to='myapp.artists')),
                ('languages', models.ManyToManyField(blank=True, related_name='comics', to='myapp.languages')),
                ('tags', models.ManyToManyField(blank=True, related_name='comics', to='myapp.tags')),
            ],
        ),
    ]
