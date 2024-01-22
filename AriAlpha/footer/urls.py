from django.urls import path

from . import views

urlpatterns = [
    path("", views.footer, name="footer"),
]
