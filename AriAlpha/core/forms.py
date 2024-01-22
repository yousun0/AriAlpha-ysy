from django import forms
from .models import CmMgmtC, CmMgmtDtlC


class CmMgmtDtlCModelForm(forms.ModelForm):
    class Meta:
        model = CmMgmtDtlC
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super(CmMgmtDtlCModelForm, self).__init__(*args, **kwargs)
        try:
            cm_mgmt_c_model_choices = [
                (item.mgmt_cd, f"{item.mgmt_cd} - {item.mgmt_cd_name}")
                for item in CmMgmtC.objects.all()
            ]
            self.fields["mgmt_cd"].choices = cm_mgmt_c_model_choices
        except Exception as e:
            print(f"Error occurred while fetching CmMgmtC objects: {e}")
