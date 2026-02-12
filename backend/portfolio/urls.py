from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet

# The router automatically creates URLs like /projects/ and /projects/1/
router = DefaultRouter()
router.register(r'projects', ProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
]