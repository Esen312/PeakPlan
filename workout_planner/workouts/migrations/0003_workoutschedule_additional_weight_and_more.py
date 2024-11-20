# Generated by Django 5.1.3 on 2024-11-20 05:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0002_alter_workout_duration_alter_workout_reps_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='workoutschedule',
            name='additional_weight',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='workoutschedule',
            name='duration',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='workoutschedule',
            name='reps',
            field=models.PositiveIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='workoutschedule',
            name='sets',
            field=models.PositiveIntegerField(default=1),
        ),
    ]