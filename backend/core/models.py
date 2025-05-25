from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Manga(models.Model):
    title       = models.CharField(max_length=255)
    author      = models.CharField(max_length=255, blank=True)
    cover_url   = models.URLField(blank=True)
    description = models.TextField(blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Link(models.Model):
    SOURCE_CHOICES = [
        ("siteA", "Site A"),
        ("siteB", "Site B"),
        # add others as needed
    ]
    manga        = models.ForeignKey(Manga, on_delete=models.CASCADE, related_name="links")
    url          = models.URLField()
    source_name  = models.CharField(max_length=50, choices=SOURCE_CHOICES)
    last_checked = models.DateTimeField(null=True, blank=True)
    status       = models.CharField(max_length=20, default="unknown")

    def __str__(self):
        return f"{self.source_name} – {self.manga.title}"

class Progress(models.Model):
    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name="progress")
    manga      = models.ForeignKey(Manga, on_delete=models.CASCADE, related_name="progress_entries")
    chapter    = models.IntegerField(default=1)
    page       = models.IntegerField(default=1)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ("user", "manga")

    def __str__(self):
        return f"{self.user.username}: {self.manga.title} ch.{self.chapter}"
