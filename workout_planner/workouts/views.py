from rest_framework import viewsets
from .models import Workout, WorkoutSchedule, WorkoutType
from .serializers import WorkoutSerializer, WorkoutScheduleSerializer, WorkoutTypeSerializer

class WorkoutTypeViewSet(viewsets.ModelViewSet):
    queryset = WorkoutType.objects.all()
    serializer_class = WorkoutTypeSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

class WorkoutScheduleViewSet(viewsets.ModelViewSet):
    queryset = WorkoutSchedule.objects.all()
    serializer_class = WorkoutScheduleSerializer
