from django.urls import path

from . import views

urlpatterns = [
    path("", views.sidebar, name="sidebar"),
]
