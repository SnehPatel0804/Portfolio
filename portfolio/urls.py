from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("projects/<slug:slug>/", views.project_detail, name="project_detail"),
    path("certificates/<slug:slug>/", views.certificate_detail, name="certificate_detail"),
]
