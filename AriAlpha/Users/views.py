from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import LoginForm
from django.http import JsonResponse


# Create your views here.
# def login(request):
#     return render(
#         request,
#         "Users/login.html",
#     )


def login_view(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(
                username=form.cleaned_data["username"],
                password=form.cleaned_data["password"],
                aval_yn="Y",
            )
            if user is not None:
                login(request, user)

                # 사용자의 휴대폰 번호 가져오기
                phone_number = (
                    f"{user.frdg_mobl_nb}-{user.mddg_mobl_nb}-{user.ltdg_mobl_nb}"
                )

                return JsonResponse(
                    {
                        "success": True,
                        "message": "로그인 성공",
                        "phone_number": phone_number,  # 휴대폰 번호 추가
                    }
                )
            else:
                # 인증 실패 처리
                return JsonResponse(
                    {"success": False, "message": "아이디 또는 비밀번호가 일치하지 않습니다."}
                )
    else:
        form = LoginForm()

    return render(request, "Users/login.html", {"form": form})
