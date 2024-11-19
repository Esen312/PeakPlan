from rest_framework import serializers
from .models import Workout, WorkoutSchedule, WorkoutType


class WorkoutTypeSerializer(serializers.ModelSerializer):
    """Сериализатор для типа тренировки."""
    class Meta:
        model = WorkoutType
        fields = "__all__"


class WorkoutSerializer(serializers.ModelSerializer):
    """Сериализатор для тренировки."""
    workout_type = serializers.CharField(source="workout_type.name", read_only=True)

    class Meta:
        model = Workout
        fields = "__all__"


class WorkoutScheduleSerializer(serializers.ModelSerializer):
    """Сериализатор для расписания тренировок."""
    workout_name = serializers.CharField(source="workout.name", read_only=True)
    workout_type = serializers.CharField(source="workout.workout_type.name", read_only=True)
    description = serializers.CharField(source="workout.description", read_only=True)
    sets = serializers.IntegerField(source="workout.sets", read_only=True)
    reps = serializers.IntegerField(source="workout.reps", read_only=True)
    duration = serializers.IntegerField(source="workout.duration", read_only=True)
    additional_weight = serializers.FloatField(source="workout.additional_weight", read_only=True)

    class Meta:
        model = WorkoutSchedule
        fields = [
            "id",
            "user",
            "workout",
            "date",
            "time",
            "workout_name",
            "workout_type",
            "description",
            "sets",
            "reps",
            "duration",
            "additional_weight",
        ]
        extra_kwargs = {"user": {"read_only": True}}

    def create(self, validated_data):
        """Создание записи о тренировке для пользователя."""
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """Обновление записи о тренировке."""
        instance.workout = validated_data.get("workout", instance.workout)
        instance.date = validated_data.get("date", instance.date)
        instance.time = validated_data.get("time", instance.time)
        instance.save()
        return instance
