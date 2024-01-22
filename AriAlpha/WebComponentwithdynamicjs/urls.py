from django.urls import re_path

from . import views

urlpatterns = [
    re_path(
        r"^test(?P<test_number>\d+)/get_js_file_name$",
        views.get_js_file,
        name="get_js_file_name",
    ),
    re_path(
        r"^test(?P<test_number>\d+)/get_html$", views.get_html, name="get_css_file_name"
    ),
    re_path(r"^test(?P<test_number>\d+)/get_grid$", views.get_grid, name="get_grid"),
    re_path(r"^test(?P<test_number>\d+)/get_data$", views.get_data, name="get_data"),
    re_path(r"^test(?P<test_number>\d+)/get_data$", views.get_data, name="get_data"),
    # path("test1/get_html", views.get_html, name="get_html"),
    # path("test1/get_grid", views.get_grid, name="get_grid"),
    # path("test1/get_data", views.get_data, name="get_data"),
]
