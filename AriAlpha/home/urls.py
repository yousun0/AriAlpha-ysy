from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("change-complex/", views.change_complex, name="change_complex"),
]
