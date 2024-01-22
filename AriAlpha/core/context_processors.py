"""
context_processors.py는 모든 Templates 파일에서 접근 가능한 변수를 정의
"""
from django.conf import settings
from AriAlpha.Users.models import SyUserM
from .models import SyCorpM


def user_corp_info(request):
    if request.user.is_authenticated:
        corp_name = SyCorpM.get_company(request.user.blon_corp_mgmt_nb)

        return {"user_corp_name": corp_name}
    return {}
