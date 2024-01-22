from django.urls import path

from . import views

urlpatterns = [
    path(
        "async_test<test_number>/get_js_file_name",
        views.get_js_file,
        name="get_js_file_name",
    ),
    path("async_test<test_number>/get_html", views.get_html, name="get_css_file_name"),
    path("async_test<test_number>/get_data", views.get_data, name="get_data"),
    # path("test1/get_html", views.get_html, name="get_html"),
    # path("test1/get_grid", views.get_grid, name="get_grid"),
    # path("test1/get_data", views.get_data, name="get_data"),
]
