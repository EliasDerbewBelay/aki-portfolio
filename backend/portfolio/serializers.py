from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'slug', 'category', 'category_display', 'thumbnail', 'video_url', 'description', 'created_at']