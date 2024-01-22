from django.urls import path

from . import views

urlpatterns = [
    # path("", views.login, name="login"),
    path("", views.login_view, name="login_view"),
]
