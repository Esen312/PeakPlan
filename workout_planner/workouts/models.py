from django.db import models
from users.models import CustomUser

class WorkoutType(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    workout_type = models.ForeignKey(WorkoutType, on_delete=models.CASCADE, related_name='workouts')
    sets = models.IntegerField(default=1)
    reps = models.IntegerField(default=1)
    duration = models.IntegerField(default=0)  # in minutes
    additional_weight = models.FloatField(null=True, blank=True)

    def __str__(self):
        return self.name

class WorkoutSchedule(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()

    def __str__(self):
        return f"{self.user.email} - {self.workout.name} on {self.date} at {self.time}"
