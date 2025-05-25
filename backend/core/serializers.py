from rest_framework import serializers
from .models import Manga, Link, Progress

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ["id", "url", "source_name", "last_checked", "status"]

class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = ["id", "user", "manga", "chapter", "page", "updated_at"]

class MangaSerializer(serializers.ModelSerializer):
    links    = LinkSerializer(many=True, read_only=True)
    progress = ProgressSerializer(source="progress_entries", many=True, read_only=True)

    class Meta:
        model  = Manga
        fields = ["id", "title", "author", "cover_url", "description", "created_at", "links", "progress"]
