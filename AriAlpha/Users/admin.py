from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import SyUserM
from AriAlpha.core.admin import CommonModelAdmin


class SyUserMAdmin(UserAdmin, CommonModelAdmin):
    """SY_USER_M 모델을 관리자 사이트에서 보여주는 클래스"""

    list_display = [
        "user_id",
        "user_name",
        "blon_corp_mgmt_nb",
        "aval_user_yn",
        "sys_admn_yn",
    ]
    search_fields = ["user_id", "user_name, blon_corp_mgmt_nb", "aval_user_yn"]
    ordering = ["user_id"]
    list_filter = ("aval_user_yn", "sys_admn_yn")
    fieldsets = (
        (None, {"fields": ("user_id", "password")}),
        (
            "Personal Info",
            {
                "fields": (
                    "blon_corp_mgmt_nb",
                    "user_name",
                    "zpcd",
                    "rspc_rdnm_addr",
                    "rspc_adnb_addr",
                    "user_emal_addr",
                    "frdg_mobl_nb",
                    "mddg_mobl_nb",
                    "ltdg_mobl_nb",
                    "user_stat_mgmt_cd",
                    "user_stat_cd",
                )
            },
        ),
        ("Permissions", {"fields": ("aval_user_yn", "sys_admn_yn")}),
        # 기타 필요한 필드셋 설정
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "user_id",
                    (
                        "password1",
                        "password2",
                    ),
                    "user_name",
                    (
                        "blon_corp_mgmt_nb",
                        "zpcd",
                        "rspc_rdnm_addr",
                        "rspc_adnb_addr",
                    ),
                    "user_emal_addr",
                    ("frdg_mobl_nb", "mddg_mobl_nb", "ltdg_mobl_nb"),
                    (
                        "aval_user_yn",
                        "sys_admn_yn",
                    ),
                    (
                        "user_stat_mgmt_cd",
                        "user_stat_cd",
                    ),
                ),
            },
        ),
    )


admin.site.register(SyUserM, SyUserMAdmin)
