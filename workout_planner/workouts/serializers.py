from rest_framework import serializers
from .models import Workout, WorkoutSchedule, WorkoutType

class WorkoutTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutType
        fields = '__all__'

class WorkoutSerializer(serializers.ModelSerializer):
    # Используем PrimaryKeyRelatedField для выбора существующих типов
    workout_type = serializers.PrimaryKeyRelatedField(queryset=WorkoutType.objects.all())

    class Meta:
        model = Workout
        fields = '__all__'

class WorkoutScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutSchedule
        fields = '__all__'
