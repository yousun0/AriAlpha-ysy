from django.contrib import admin
from .models import SyCorpCnnbN, SyCorpM, CmMgmtC, CmMgmtDtlC
from .forms import CmMgmtDtlCModelForm


class CommonModelAdmin(admin.ModelAdmin):
    """모든 모델에 공통적으로 적용되는 설정을 위한 클래스"""

    readonly_fields = ["rgst_user_id", "mdfy_user_id"]

    def save_model(self, request, obj, form, change):
        """모델 저장 시 사용자 정보를 저장하는 메서드"""
        if not change:  # 새로 생성되는 객체인 경우
            obj.rgst_user_id = request.user.user_id
        obj.mdfy_user_id = request.user.user_id
        super().save_model(request, obj, form, change)


class SyCorpCnnbNAdmin(CommonModelAdmin):
    """SY_CORP_CNNB_N 모델을 관리자 사이트에서 보여주는 클래스"""

    list_display = [
        "corp_mgmt_nb",
        "cnnb_sqnb",
        "cnnb_name",
        "cnnb_tel",
        "rgst_user_id",
    ]
    search_fields = ["cnnb_name", "cnnb_tel"]


class SyCorpMAdmin(CommonModelAdmin):
    """SY_CORP_M 모델을 관리자 사이트에서 보여주는 클래스"""

    list_display = ["corp_mgmt_nb", "corp_name", "corp_bzid", "corp_addr"]
    search_fields = ["corp_name", "corp_bzid"]


class CmMgmtCAdmin(CommonModelAdmin):
    """CM_MGMT_C 모델을 관리자 사이트에서 보여주는 클래스"""

    list_display = ["mgmt_cd", "mgmt_cd_name", "uppr_mgmt_cd", "subj_cd"]
    search_fields = ["mgmt_cd", "mgmt_cd_name"]


class CmMgmtDtlCAdmin(CommonModelAdmin):
    """CM_MGMT_DTL_C 모델을 관리자 사이트에서 보여주는 클래스"""

    form = CmMgmtDtlCModelForm
    list_display = ["mgmt_cd", "dtl_cd", "dtl_cd_name", "use_yn"]
    search_fields = ["mgmt_cd", "dtl_cd"]

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "mgmt_cd":
            kwargs["queryset"] = CmMgmtC.objects.all()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


# 관리자 사이트에 모델 등록
admin.site.register(SyCorpCnnbN, SyCorpCnnbNAdmin)
admin.site.register(SyCorpM, SyCorpMAdmin)
admin.site.register(CmMgmtC, CmMgmtCAdmin)
admin.site.register(CmMgmtDtlC, CmMgmtDtlCAdmin)
