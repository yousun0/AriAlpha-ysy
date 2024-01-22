from .base import *

# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
DATABASES = {
    "default": {
        "ENGINE": env("DB_CONNECTION"),
        "NAME": env("DB_NAME"),
        "USER": env("DB_USER"),
        "PASSWORD": env("DB_PASSWORD"),
        "HOST": env("DB_HOST"),
    }
}

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DEBUG")

# 로컬 개발환경에서만 사용할 앱들을 추가합니다.
INSTALLED_APPS += []
