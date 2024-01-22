from django.http import HttpResponseNotFound, HttpResponseRedirect
from django.middleware.csrf import CsrfViewMiddleware
from django.urls import reverse
from django.conf import settings

"""
middleware.py 에는 모든 로직이 거쳐야하는 로직을 작성
예 : login_required, ip 제한, csrf 체크 등
주의점
1. DRF와 일반 Django 요청을 구분해야함
2. DRF 요청에 대해서는 csrf 체크를 직접 구현해야함
3. csrf 체크 시, 반드시 해야될 경우와 안해도 되는 경우를 구분해야함
4. IP, 로그인, csrf 등에 대해 허용되지 않은 경우에는 404를 리턴 (403은 안됨)
5. IP, 로그인, csrf 등에 예외처리를 반드시 해주어야 함 
"""


# IP 리스트 파일 읽기
with open("config/settings/allowed_ips.txt", "r") as f:
    ALLOWED_IPS = [line.strip() for line in f.readlines()]


def complex_middleware(get_response):
    csrf_middleware = CsrfViewMiddleware(get_response)

    def middleware(request):
        # DRF 요청 여부를 판단
        is_drf = (
            request.META.get("CONTENT_TYPE") == "application/json"
            or request.META.get("HTTP_ACCEPT") == "application/json"
        )

        # 로그인 페이지 경로
        login_path = reverse("login_view")

        # 로그인 페이지가 아니고, 인증되지 않은 경우에 대한 처리
        if request.path != login_path and not request.user.is_authenticated:
            if is_drf:
                # DRF 요청에 대한 CSRF 체크
                csrf_middleware.process_request(request)
                reason = csrf_middleware.process_view(request, None, (), {})
                if reason:
                    return HttpResponseNotFound("페이지를 찾을 수 없습니다.")
            else:
                # 일반 Django 요청의 경우 로그인 페이지로 리다이렉트
                return HttpResponseRedirect(settings.LOGIN_URL)

        response = get_response(request)
        return response

    return middleware
