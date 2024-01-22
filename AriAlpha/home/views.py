from django.http import HttpResponse
from django.shortcuts import render
from django.template.loader import render_to_string


def index(request):
    return render(
        request,
        "home/index.html",
    )


def change_complex(request):
    return render(
        request,
        "home/modal/change-complex.html",
    )


def get_data(request):
    if request.method == "POST":
        # 임의 json 데이터 생성
        data = {
            "name": "Aria",
            "age": 20,
            "email": "",
            "phone": "",
            "address": "",
        }
        return HttpResponse(data, content_type="application/json")

    return HttpResponse("get 방식은 취급안함")


def get_param(request):
    if request.method == "POST":
        return HttpResponse("post")
    return HttpResponse("param")
