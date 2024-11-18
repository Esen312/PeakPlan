from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WorkoutViewSet, WorkoutScheduleViewSet, WorkoutTypeViewSet

router = DefaultRouter()
router.register('workout-types', WorkoutTypeViewSet)
router.register('workouts', WorkoutViewSet)
router.register('schedule', WorkoutScheduleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
