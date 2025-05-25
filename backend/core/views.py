from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from .models import Manga, Link, Progress
from .serializers import MangaSerializer, LinkSerializer, ProgressSerializer

class MangaViewSet(viewsets.ModelViewSet):
    queryset = Manga.objects.all().order_by("-created_at")
    serializer_class = MangaSerializer
    #permission_classes = [IsAuthenticatedOrReadOnly]
    permission_classes = [AllowAny]

class LinkViewSet(viewsets.ModelViewSet):
    queryset = Link.objects.all()
    serializer_class = LinkSerializer
    #permission_classes = [IsAuthenticatedOrReadOnly]
    permission_classes = [AllowAny]

class ProgressViewSet(viewsets.ModelViewSet):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer
    #permission_classes = [IsAuthenticatedOrReadOnly]
    permission_classes = [AllowAny]
