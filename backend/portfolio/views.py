from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides the 'list' (all projects)
    and 'retrieve' (one specific project) actions.
    """
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer