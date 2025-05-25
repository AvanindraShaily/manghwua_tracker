from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import MangaViewSet, LinkViewSet, ProgressViewSet

router = DefaultRouter()
router.register(r"manga", MangaViewSet)
router.register(r"links", LinkViewSet)
router.register(r"progress", ProgressViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
