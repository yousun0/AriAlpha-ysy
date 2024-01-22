from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.core.validators import EmailValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
import string
import re
from AriAlpha.core.admin_combobox_list import YES_NO_CHOICES


class VarcharField(models.CharField):
    """Varchar 필드"""

    def db_type(self, connection):
        return "varchar(%s)" % self.max_length


# 유효성 검사기 정의
def validate_user_id(value):
    """아이디 유효성 검사기"""
    if len(value) < 6:
        raise ValidationError(_("아이디가 너무 짧습니다."))

    if not re.search(r"[A-Za-z]", value):
        raise ValidationError("ID에 최소한 한 개의 알파벳이 포함되어야 합니다.")

    if not re.search(r"\d", value):
        raise ValidationError("ID에 최소한 한 개의 숫자가 포함되어야 합니다.")


def validate_password(value):
    """비밀번호 유효성 검사기"""
    if len(value) < 8:
        raise ValidationError(_("비밀번호가 너무 짧습니다."))

    if not any(char.isdigit() for char in value):
        raise ValidationError(_("비밀번호는 숫자, 영문자 소문자, 영문자 대문자, 특수문자를 포함해야 합니다."))

    if not any(char.isupper() for char in value):
        raise ValidationError(_("비밀번호는 숫자, 영문자 소문자, 영문자 대문자, 특수문자를 포함해야 합니다."))

    if not any(char.islower() for char in value):
        raise ValidationError(_("비밀번호는 숫자, 영문자 소문자, 영문자 대문자, 특수문자를 포함해야 합니다."))

    if not any(char in string.punctuation for char in value):
        raise ValidationError(_("비밀번호는 숫자, 영문자 소문자, 영문자 대문자, 특수문자를 포함해야 합니다."))


class UserManager(BaseUserManager):
    """사용자 모델 매니저"""

    use_in_migrations = True

    def create_user(self, user_id, password=None, **extra_fields):
        """다이렉트로 들어오면 일반 직원, create_superuser로 들어오면 관리자"""

        if not user_id:
            raise ValueError("The given user_id must be set")
        user = self.model(user_id=user_id, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, password, **extra_fields):
        """Super User"""
        extra_fields.setdefault("aval_user_yn", "Y")
        extra_fields.setdefault("user_stat_mgmt_cd", "1")
        extra_fields.setdefault("sys_admn_yn", "Y")

        extra_fields.setdefault("rgst_dtm", timezone.now())
        extra_fields.setdefault("rgst_user_id", "system")
        extra_fields.setdefault("mdfy_dtm", timezone.now())
        extra_fields.setdefault("mdfy_user_id", "system")
        return self.create_user(user_id=user_id, password=password, **extra_fields)


class SyUserM(AbstractBaseUser, PermissionsMixin):
    """커스텀 사용자 모델"""

    user_id = VarcharField(
        db_column="USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        unique=True,
        validators=[validate_user_id],
        primary_key=True,
        verbose_name="사용자아이디",
    )  # Field name made lowercase.
    blon_corp_mgmt_nb = VarcharField(
        db_column="BLON_CORP_MGMT_NB",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="소속법인관리번호",
    )  # Field name made lowercase.
    password = VarcharField(
        db_column="USER_PSWD",
        max_length=128,
        db_collation="Korean_Wansung_CI_AS",
        validators=[validate_password],
        verbose_name="사용자비밀번호",
    )  # Field name made lowercase.
    user_name = VarcharField(
        db_column="USER_NAME",
        max_length=50,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="사용자명",
    )  # Field name made lowercase.
    zpcd = VarcharField(
        db_column="ZPCD",
        max_length=5,
        db_collation="Korean_Wansung_CI_AS",
        blank=True,
        null=True,
        verbose_name="우편번호",
    )  # Field name made lowercase.
    rspc_rdnm_addr = VarcharField(
        db_column="RSPC_RDNM_ADDR",
        max_length=500,
        db_collation="Korean_Wansung_CI_AS",
        blank=True,
        null=True,
        verbose_name="거주지도로명주소",
    )  # Field name made lowercase.
    rspc_adnb_addr = VarcharField(
        db_column="RSPC_ADNB_ADDR",
        max_length=500,
        db_collation="Korean_Wansung_CI_AS",
        blank=True,
        null=True,
        verbose_name="거주지지번주소",
    )  # Field name made lowercase.
    user_emal_addr = VarcharField(
        db_column="USER_EMAL_ADDR",
        max_length=100,
        db_collation="Korean_Wansung_CI_AS",
        blank=True,
        null=True,
        verbose_name="사용자이메일주소",
    )  # Field name made lowercase.
    frdg_mobl_nb = VarcharField(
        db_column="FRDG_MOBL_NB", max_length=3, verbose_name="앞자리휴대전화번호"
    )  # Field name made lowercase.
    mddg_mobl_nb = VarcharField(
        db_column="MDDG_MOBL_NB", max_length=4, verbose_name="중간자리휴대전화번호"
    )  # Field name made lowercase.
    ltdg_mobl_nb = VarcharField(
        db_column="LTDG_MOBL_NB", max_length=4, verbose_name="뒷자리휴대전화번호"
    )  # Field name made lowercase.
    aval_user_yn = VarcharField(
        db_column="AVAL_USER_YN",
        max_length=1,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="유효사용여부",
        choices=YES_NO_CHOICES,
        default="Y",
    )  # Field name made lowercase.
    user_stat_mgmt_cd = VarcharField(
        db_column="USER_STAT_MGMT_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="사용자상태관리코드",
    )  # Field name made lowercase.
    user_stat_cd = VarcharField(
        db_column="USER_STAT_CD",
        max_length=6,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="사용자상태코드",
    )  # Field name made lowercase.
    sys_admn_yn = VarcharField(
        db_column="SYS_ADMN_YN",
        max_length=1,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="시스템관리자여부",
        choices=YES_NO_CHOICES,
        default="N",
    )  # Field name made lowercase.
    last_login = models.DateTimeField(
        db_column="LAST_LGIN_DTM",
        blank=True,
        null=True,
        verbose_name="마지막로그인일시",
    )  # Field name made lowercase.
    rgst_user_id = VarcharField(
        db_column="RGST_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="등록사용자아이디",
    )  # Field name made lowercase.
    rgst_dtm = models.DateTimeField(
        db_column="RGST_DTM", auto_now_add=True, verbose_name="등록일시"
    )  # Field name made lowercase.
    mdfy_user_id = VarcharField(
        db_column="MDFY_USER_ID",
        max_length=20,
        db_collation="Korean_Wansung_CI_AS",
        verbose_name="수정사용자아이디",
    )  # Field name made lowercase.
    mdfy_dtm = models.DateTimeField(
        db_column="MDFY_DTM", auto_now=True, verbose_name="수정일시"
    )  # Field name made lowercase.

    USERNAME_FIELD = "user_id"
    REQUIRED_FIELDS = [
        "blon_corp_mgmt_nb",
        "user_name",
        "zpcd",
        "rspc_rdnm_addr",
        "rspc_adnb_addr",
        "user_emal_addr",
        "frdg_mobl_nb",
        "mddg_mobl_nb",
        "ltdg_mobl_nb",
    ]

    objects = UserManager()

    class Meta:
        managed = False
        db_table = "SY_USER_M"
        verbose_name = "SY_사용자"
        verbose_name_plural = "SY_사용자 목록"

    def __str__(self):
        """사용자 ID를 문자열로 변환하여 리턴"""
        return self.user_id

    def clean(self):
        """유효성 검사기"""
        super().clean()
        validate_password(self.password)

    @property
    def is_superuser(self):
        """관리자 여부"""
        return self.sys_admn_yn == "Y"

    @is_superuser.setter
    def is_superuser(self, value):
        """관리자 여부"""
        self.sys_admn_yn = "Y" if value else "N"

    @property
    def is_staff(self):
        """직원 여부를 관리자 여부와 통합"""
        return self.sys_admn_yn == "Y"

    @is_staff.setter
    def is_staff(self, value):
        """직원 여부를 관리자 여부와 통합"""
        self.sys_admn_yn = "Y" if value else "N"


# class Users(AbstractBaseUser, PermissionsMixin):
#     name_validator = UnicodeUsernameValidator()
#     email_validator = EmailValidator()
#
#     dancode = models.CharField(_("dancode"), max_length=5)
#     user_id = models.CharField(_("user_id"), max_length=50, primary_key=True)
#     name = models.CharField(
#         _("name"),
#         max_length=50,
#         validators=[name_validator],
#     )
#     email = models.EmailField(
#         _("email"),
#         max_length=50,
#         validators=[email_validator],
#     )
#     mobile = models.CharField(_("mobile"), max_length=20)
#     tel = models.CharField(_("tel"), max_length=20)
#     user_type = models.CharField(_("user_type"), max_length=2)
#     branch = models.CharField(_("branch"), max_length=2)
#     tab_type = models.CharField(_("tab_type"), max_length=1)
#     auth_exceptdate = models.DateField(_("auth_exceptdate"), blank=True, null=True)
#     auth_type = models.CharField(_("auth_type"), max_length=2)
#     memo = models.CharField(_("memo"), max_length=1000)
#     password = models.CharField(_("password"), max_length=128)
#     is_superuser = models.BooleanField(_("is_superuser"), default=False)
#     is_staff = models.BooleanField(_("is_staff"), default=False)
#     is_active = models.BooleanField(_("is_active"), default=True)
#     last_login = models.DateTimeField(_("last_login"), blank=True, null=True)
#     created_at = models.DateTimeField(_("created_at"), auto_now_add=True)
#     updated_at = models.DateTimeField(_("updated_at"), auto_now=True)
#
#     objects = UserManager()
#     USERNAME_FIELD = "user_id"
#     REQUIRED_FIELDS = ["name", "mobile"]
#
#     class Meta:
#         verbose_name = _("users")
#         verbose_name_plural = _("users")
#
#     def clean(self):
#         super().clean()
