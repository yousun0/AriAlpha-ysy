from django.shortcuts import render
from AriAlpha.core.models import SyCorpCnnbN, SyCorpM


# Create your views here.
def hub(request):
    context = {
        "user_name": request.user.user_name,
        "email": request.user.user_emal_addr,
        # 추가적인 사용자 정보
    }
    return render(
        request,
        "hub/hub.html",
        context,
    )
