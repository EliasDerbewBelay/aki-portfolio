from django.db import models

class Project(models.Model):
    CATEGORY_CHOICES = [
        ('branding', 'Branding & Logos'),
        ('print', 'Print & Posters'),
        ('motion', 'Motion Graphics'),
        ('video', 'Video Editing'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    
    # This will be the cover image (The "Poster" for the video or the design itself)
    thumbnail = models.ImageField(upload_to='portfolio/thumbnails/')
    video_url = models.URLField(blank=True, help_text="Paste YouTube/Vimeo link here")
    
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"