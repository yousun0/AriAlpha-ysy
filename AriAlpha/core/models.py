from django.db import models
from django.core.exceptions import ObjectDoesNotExist
from AriAlpha.core.admin_combobox_list import YES_NO_CHOICES

"""
Core models.py는 AriAlpha 핵심 모델 및 모든 앱에서 공통으로 사용하는 모델을 정의합니다.
자주 사용되는 모델은 다른 앱에서는 core에서 상속받아 사용합니다. (동일 모델을 여러 앱에 중복 정의하지 않기 위함)
예 : 사용자, 권한, 단지정보 등
"""


# Create your models here.
class SyCorpCnnbN(models.Model):
    """SY_법인연락처내역"""

    corp_mgmt_nb = models.CharField(
        db_column="CORP_MGMT_NB",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        primary_key=True,
        verbose_name="법인관리번호",
    )  # Field name made lowercase.
    cnnb_sqnb = models.SmallIntegerField(
        db_column="CNNB_SQNB",
        verbose_name="연락처순번",
    )  # Field name made lowercase.
    cnnb_name = models.CharField(
        db_column="CNNB_NAME",
        max_length=50,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="연락처명",
    )  # Field name made lowercase.
    cnnb_tel = models.CharField(
        db_column="CNNB_TEL",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="연락처전화번호",
    )  # Field name made lowercase.
    rgst_user_id = models.CharField(
        db_column="RGST_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="등록사용자아이디",
    )  # Field name made lowercase.
    rgst_dtm = models.DateTimeField(
        db_column="RGST_DTM",
        verbose_name="등록일시",
        auto_now_add=True,
    )  # Field name made lowercase.
    mdfy_user_id = models.CharField(
        db_column="MDFY_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="수정사용자아이디",
    )  # Field name made lowercase.
    mdfy_dtm = models.DateTimeField(
        db_column="MDFY_DTM",
        verbose_name="수정일시",
        auto_now=True,
    )  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "SY_CORP_CNNB_N"
        unique_together = (("corp_mgmt_nb", "cnnb_sqnb"),)
        verbose_name = "SY_법인연락처내역"
        verbose_name_plural = "법인연락처내역 목록"


class SyCorpM(models.Model):
    """SY_법인"""

    corp_mgmt_nb = models.CharField(
        db_column="CORP_MGMT_NB",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        primary_key=True,
        unique=True,
        verbose_name="법인관리번호",
    )  # Field name made lowercase.
    corp_name = models.CharField(
        db_column="CORP_NAME",
        max_length=100,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="법인명",
    )  # Field name made lowercase.
    corp_bzid = models.CharField(
        db_column="CORP_BZID",
        max_length=15,
        db_collation="Korean_Wansung_CI_AS",
        blank=True,
        null=True,
        verbose_name="법인사업자번호",
    )  # Field name made lowercase.
    corp_addr = models.CharField(
        db_column="CORP_ADDR",
        max_length=500,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="법인주소",
    )  # Field name made lowercase.
    tpbz_name = models.CharField(
        db_column="TPBZ_NAME",
        max_length=50,
        db_collation="Korean_Wansung_CI_AS",
        blank=True,
        null=True,
        verbose_name="업종명",
    )  # Field name made lowercase.
    bzcn_name = models.CharField(
        db_column="BZCN_NAME",
        max_length=50,
        db_collation="Korean_Wansung_CI_AS",
        blank=True,
        null=True,
        verbose_name="업태명",
    )  # Field name made lowercase.
    rprsp_name = models.CharField(
        db_column="RPRSP_NAME",
        max_length=50,
        db_collation="Korean_Wansung_CI_AS",
        blank=True,
        null=True,
        verbose_name="대표자명",
    )  # Field name made lowercase.
    corp_sctn_mgmt_cd = models.CharField(
        db_column="CORP_SCTN_MGMT_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="법인구분관리코드",
    )  # Field name made lowercase.
    corp_sctn_cd = models.CharField(
        db_column="CORP_SCTN_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="법인구분코드",
    )  # Field name made lowercase.
    rgst_user_id = models.CharField(
        db_column="RGST_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="등록사용자아이디",
    )  # Field name made lowercase.
    rgst_dtm = models.DateTimeField(
        db_column="RGST_DTM",
        verbose_name="등록일시",
        auto_now_add=True,
    )  # Field name made lowercase.
    mdfy_user_id = models.CharField(
        db_column="MDFY_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="수정사용자아이디",
    )  # Field name made lowercase.
    mdfy_dtm = models.DateTimeField(
        db_column="MDFY_DTM",
        verbose_name="수정일시",
        auto_now=True,
    )  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "SY_CORP_M"
        verbose_name = "SY_법인(ERP 사용법인)"
        verbose_name_plural = "ERP 사용법인 목록"

    @classmethod
    def get_company(cls, corp_mgmt_nb: str) -> str | None:
        """법인관리번호로 법인명을 가져옵니다."""
        try:
            corp = cls.objects.get(corp_mgmt_nb=corp_mgmt_nb)
        except ObjectDoesNotExist:
            return None
        return corp.corp_name


class CmMgmtC(models.Model):
    """CM_관리코드"""

    mgmt_cd = models.CharField(
        db_column="MGMT_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        primary_key=True,
        unique=True,
        verbose_name="관리코드",
    )  # Field name made lowercase.
    mgmt_cd_name = models.CharField(
        db_column="MGMT_CD_NAME",
        max_length=100,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="관리코드명",
    )  # Field name made lowercase.
    uppr_mgmt_cd = models.CharField(
        db_column="UPPR_MGMT_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        blank=True,
        null=True,
        verbose_name="상위관리코드",
    )  # Field name made lowercase.
    subj_cd = models.CharField(
        db_column="SUBJ_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        blank=True,
        null=True,
        verbose_name="주제영역코드",
    )  # Field name made lowercase.
    sort_sqnb = models.SmallIntegerField(
        db_column="SORT_SQNB", blank=True, null=True, verbose_name="정렬순번"
    )  # Field name made lowercase.
    dtl_cd_owns_yn = models.CharField(
        db_column="DTL_CD_OWNS_YN",
        max_length=1,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="상세코드소유여부",
        choices=YES_NO_CHOICES,
        default="Y",
    )  # Field name made lowercase.
    add_item_owns_yn = models.CharField(
        db_column="ADD_ITEM_OWNS_YN",
        max_length=1,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="추가항목소유여부",
        choices=YES_NO_CHOICES,
        default="Y",
    )  # Field name made lowercase.
    use_yn = models.CharField(
        db_column="USE_YN",
        max_length=1,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="사용여부",
        choices=YES_NO_CHOICES,
        default="Y",
    )  # Field name made lowercase.
    rmrk_cnts = models.CharField(
        db_column="RMRK_CNTS",
        max_length=1000,
        db_collation="Korean_Wansung_CI_AS",
        blank=True,
        null=True,
        verbose_name="비고내용",
    )  # Field name made lowercase.
    rgst_user_id = models.CharField(
        db_column="RGST_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="등록사용자아이디",
    )  # Field name made lowercase.
    rgst_dtm = models.DateTimeField(
        db_column="RGST_DTM", auto_now_add=True, verbose_name="등록일시"
    )  # Field name made lowercase.
    mdfy_user_id = models.CharField(
        db_column="MDFY_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="수정사용자아이디",
    )  # Field name made lowercase.
    mdfy_dtm = models.DateTimeField(
        db_column="MDFY_DTM", auto_now=True, verbose_name="수정일시"
    )  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "[cmmn].[CM_MGMT_C]"
        verbose_name = "CM_관리코드"
        verbose_name_plural = "관리코드 목록"


class CmMgmtCdR(models.Model):
    """CM_관리코드_관계"""

    mgmt_cd = models.CharField(
        db_column="MGMT_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        primary_key=True,
        verbose_name="관리코드",
    )  # Field name made lowercase.
    dtl_cd = models.CharField(
        db_column="DTL_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="상세코드",
    )  # Field name made lowercase.
    rel_sqnb = models.SmallIntegerField(
        db_column="REL_SQNB",
        verbose_name="관계순번",
    )  # Field name made lowercase.
    trgt_mgmt_cd = models.CharField(
        db_column="TRGT_MGMT_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="대상관리코드",
    )  # Field name made lowercase.
    trgt_dtl_cd = models.CharField(
        db_column="TRGT_DTL_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="대상상세코드",
    )  # Field name made lowercase.
    cd_rel_sctn_mgmt_cd = models.CharField(
        db_column="CD_REL_SCTN_MGMT_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="코드관계구분관리코드",
    )  # Field name made lowercase.
    cd_rel_sctn_cd = models.CharField(
        db_column="CD_REL_SCTN_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="코드관계구분코드",
    )  # Field name made lowercase.
    use_yn = models.CharField(
        db_column="USE_YN",
        max_length=1,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="사용여부",
        choices=YES_NO_CHOICES,
        default="Y",
    )  # Field name made lowercase.
    rgst_user_id = models.CharField(
        db_column="RGST_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="등록사용자아이디",
    )  # Field name made lowercase.
    rgst_dtm = models.DateTimeField(
        db_column="RGST_DTM", auto_now_add=True, verbose_name="등록일시"
    )  # Field name made lowercase.
    mdfy_user_id = models.CharField(
        db_column="MDFY_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="수정사용자아이디",
    )  # Field name made lowercase.
    mdfy_dtm = models.DateTimeField(
        db_column="MDFY_DTM", auto_now=True, verbose_name="수정일시"
    )  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "[cmmn].[CM_MGMT_CD_R]"
        unique_together = (("mgmt_cd", "dtl_cd", "rel_sqnb"),)
        verbose_name = "CM_관리코드_관계"
        verbose_name_plural = "관리코드_관계 목록"


class CmMgmtDtlC(models.Model):
    """CM_관리상세코드"""

    mgmt_cd = models.ForeignKey(
        CmMgmtC,
        on_delete=models.CASCADE,
        db_column="MGMT_CD",
        to_field="mgmt_cd",
        verbose_name="관리코드",
        primary_key=True,
    )  # Field name made lowercase.
    dtl_cd = models.CharField(
        db_column="DTL_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="상세코드",
    )  # Field name made lowercase.
    dtl_cd_name = models.CharField(
        db_column="DTL_CD_NAME",
        max_length=100,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="상세코드명",
    )  # Field name made lowercase.
    use_yn = models.CharField(
        db_column="USE_YN",
        max_length=1,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="사용여부",
        choices=YES_NO_CHOICES,
        default="Y",
    )  # Field name made lowercase.
    sort_sqnb = models.SmallIntegerField(
        db_column="SORT_SQNB", blank=True, null=True, verbose_name="정렬순번"
    )  # Field name made lowercase.
    rmrk_cnts = models.CharField(
        db_column="RMRK_CNTS",
        max_length=1000,
        db_collation="Korean_Wansung_CI_AS",
        blank=True,
        null=True,
        verbose_name="비고내용",
    )  # Field name made lowercase.
    rgst_user_id = models.CharField(
        db_column="RGST_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="등록사용자아이디",
    )  # Field name made lowercase.
    rgst_dtm = models.DateTimeField(
        db_column="RGST_DTM", auto_now_add=True, verbose_name="등록일시"
    )  # Field name made lowercase.
    mdfy_user_id = models.CharField(
        db_column="MDFY_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="수정사용자아이디",
    )  # Field name made lowercase.
    mdfy_dtm = models.DateTimeField(
        db_column="MDFY_DTM", auto_now=True, verbose_name="수정일시"
    )  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "[cmmn].[CM_MGMT_DTL_C]"
        unique_together = (("mgmt_cd", "dtl_cd"),)
        verbose_name = "CM_관리상세코드"
        verbose_name_plural = "관리상세코드 목록"


class CmCdUseAttrM(models.Model):
    """CM_코드사용속성내역"""

    mgmt_cd = models.CharField(
        db_column="MGMT_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        primary_key=True,
        verbose_name="관리코드",
    )  # Field name made lowercase.
    tble_name = models.CharField(
        db_column="TBLE_NAME",
        max_length=200,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="테이블명",
    )  # Field name made lowercase.
    col_name = models.CharField(
        db_column="COL_NAME",
        max_length=200,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="컬럼명",
    )  # Field name made lowercase.
    enty_name = models.CharField(
        db_column="ENTY_NAME",
        max_length=200,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="엔터티명",
    )  # Field name made lowercase.
    attr_name = models.CharField(
        db_column="ATTR_NAME",
        max_length=100,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="속성명",
    )  # Field name made lowercase.
    rgst_user_id = models.CharField(
        db_column="RGST_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="등록사용자아이디",
    )  # Field name made lowercase.
    rgst_dtm = models.DateTimeField(
        db_column="RGST_DTM", auto_now_add=True, verbose_name="등록일시"
    )  # Field name made lowercase.
    mdfy_user_id = models.CharField(
        db_column="MDFY_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="수정사용자아이디",
    )  # Field name made lowercase.
    mdfy_dtm = models.DateTimeField(
        db_column="MDFY_DTM", auto_now=True, verbose_name="수정일시"
    )  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = "[cmmn].[CM_CD_USE_ATTR_M]"
        unique_together = (("mgmt_cd", "tble_name", "col_name"),)
        verbose_name = "CM_코드사용속성내역"
        verbose_name_plural = "코드사용속성내역 목록"
