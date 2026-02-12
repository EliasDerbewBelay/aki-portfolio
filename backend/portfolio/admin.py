from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    # This makes the admin list look like a spreadsheet
    list_display = ('title', 'category', 'created_at')
    # This automatically fills the slug as you type the title
    prepopulated_fields = {'slug': ('title',)}