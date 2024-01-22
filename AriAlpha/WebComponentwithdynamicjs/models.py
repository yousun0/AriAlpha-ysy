from django.db import models


# Create your models here.
class VINM0200_GetCommCdMstr(models.Model):
    DAN_CD = models.CharField(max_length=5, primary_key=True)
    CLSF_CD = models.CharField(max_length=1000)
    DETL_CD = models.CharField(max_length=1000)
    DETL_NM = models.CharField(max_length=100)
    CMNT_YN = models.CharField(max_length=1)  # Y/N 값이라고 가정
    WHOL_YN = models.CharField(max_length=1)
    NONE_YN = models.CharField(max_length=1)
    BASC_YN = models.CharField(max_length=1)
    USE_YN = models.CharField(max_length=1)
    SORT_SEQ = models.IntegerField()
    RMRK = models.TextField(null=True, blank=True)
    ETC01 = models.CharField(max_length=100, null=True, blank=True)
    ETC01_NM = models.CharField(max_length=100, null=True, blank=True)
    ETC02 = models.CharField(max_length=100, null=True, blank=True)
    ETC02_NM = models.CharField(max_length=100, null=True, blank=True)
    ETC03 = models.CharField(max_length=100, null=True, blank=True)
    ETC03_NM = models.CharField(max_length=100, null=True, blank=True)
    ETC04 = models.CharField(max_length=100, null=True, blank=True)
    ETC04_NM = models.CharField(max_length=100, null=True, blank=True)
    ETC05 = models.CharField(max_length=100, null=True, blank=True)
    ETC05_NM = models.CharField(max_length=100, null=True, blank=True)
    ETC06 = models.CharField(max_length=100, null=True, blank=True)
    ETC06_NM = models.CharField(max_length=100, null=True, blank=True)
    ETC07 = models.CharField(max_length=100, null=True, blank=True)
    ETC07_NM = models.CharField(max_length=100, null=True, blank=True)
    ETC08 = models.CharField(max_length=100, null=True, blank=True)
    ETC08_NM = models.CharField(max_length=100, null=True, blank=True)
    ETC09 = models.CharField(max_length=100, null=True, blank=True)
    ETC09_NM = models.CharField(max_length=100, null=True, blank=True)
    ETC10 = models.CharField(max_length=100, null=True, blank=True)
    ETC10_NM = models.CharField(max_length=100, null=True, blank=True)
    INST_DT = models.DateTimeField()
    INST_ID = models.CharField(max_length=100)
    LAST_DT = models.DateTimeField()
    LAST_ID = models.CharField(max_length=100)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()

    class Meta:
        db_table = "VINM0200_GetCommCdMstr"  # 실제 데이터베이스 테이블 이름
        unique_together = (("DAN_CD", "CLSF_CD", "DETL_CD"),)
        managed = False

    def __str__(self):
        return self.DETL_NM


class Vin10100Actionsearch(models.Model):
    dan_cd = models.CharField(
        db_column="DAN_CD", primary_key=True, max_length=5
    )  # Field name made lowercase. The composite primary key (DAN_CD, MTRD_TYPE, YYYY_MM, BLDG, ROOM) found, that is not supported. The first column is selected.
    mtrd_type = models.CharField(
        db_column="MTRD_TYPE", max_length=2
    )  # Field name made lowercase.
    yyyy_mm = models.CharField(
        db_column="YYYY_MM", max_length=6
    )  # Field name made lowercase.
    bldg = models.CharField(
        db_column="BLDG", max_length=1000
    )  # Field name made lowercase.
    room = models.CharField(
        db_column="ROOM", max_length=1000
    )  # Field name made lowercase.
    lkup_nm = models.CharField(
        db_column="LKUP_NM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    pclot_area = models.CharField(
        db_column="PCLOT_AREA", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    cmnm = models.CharField(
        db_column="CMNM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    rsdn_dvsn_nm = models.CharField(
        db_column="RSDN_DVSN_NM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    ocpn_ocpn_dd = models.CharField(
        db_column="OCPN_OCPN_DD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    ocpn_key_rlse_dd = models.CharField(
        db_column="OCPN_KEY_RLSE_DD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    memo = models.CharField(
        db_column="MEMO", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_hshl_cnt = models.CharField(
        db_column="EL_HSHL_CNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_lgfmly_kind = models.CharField(
        db_column="EL_LGFMLY_KIND", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_wlfr_dcnt = models.CharField(
        db_column="EL_WLFR_DCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    mter_sqno = models.CharField(
        db_column="MTER_SQNO", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    pvmn_nomt = models.CharField(
        db_column="PVMN_NOMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    thmn_nomt = models.CharField(
        db_column="THMN_NOMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    thmn_usgqty = models.CharField(
        db_column="THMN_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    mter1_pvmn_nomt = models.CharField(
        db_column="MTER1_PVMN_NOMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    mter1_thmn_nomt = models.CharField(
        db_column="MTER1_THMN_NOMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    mter1_thmn_usgqty = models.CharField(
        db_column="MTER1_THMN_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    mter2_pvmn_nomt = models.CharField(
        db_column="MTER2_PVMN_NOMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    mter2_thmn_nomt = models.CharField(
        db_column="MTER2_THMN_NOMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    mter2_thmn_usgqty = models.CharField(
        db_column="MTER2_THMN_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    smtt_chrg_usgqty = models.CharField(
        db_column="SMTT_CHRG_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    sttt_pvmn_usgqty = models.CharField(
        db_column="STTT_PVMN_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    sttt_pvmn_cmpr = models.CharField(
        db_column="STTT_PVMN_CMPR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    sttt_mm3_avrg = models.CharField(
        db_column="STTT_MM3_AVRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    sttt_layr2_smmm = models.CharField(
        db_column="STTT_LAYR2_SMMM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    thmn_usgfe = models.CharField(
        db_column="THMN_USGFE", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_comm_usgqty = models.CharField(
        db_column="EL_COMM_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_tvcnt = models.CharField(
        db_column="EL_TVCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_tv_exmt = models.CharField(
        db_column="EL_TV_EXMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_tv_lcns_fee = models.CharField(
        db_column="EL_TV_LCNS_FEE", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_dcnt_amt_smtt = models.CharField(
        db_column="EL_DCNT_AMT_SMTT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_lgfmly_chrg = models.CharField(
        db_column="EL_LGFMLY_CHRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_wlfr_chrg = models.CharField(
        db_column="EL_WLFR_CHRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_wlfr_adtl_rdct = models.CharField(
        db_column="EL_WLFR_ADTL_RDCT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    vlnr_hrcy_alvn_amt = models.CharField(
        db_column="VLNR_HRCY_ALVN_AMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_gurn_ddct = models.CharField(
        db_column="EL_GURN_DDCT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_pwsv_dcnt = models.CharField(
        db_column="EL_PWSV_DCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_smss_dcnt = models.CharField(
        db_column="EL_SMSS_DCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    basc_chrg = models.CharField(
        db_column="BASC_CHRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_elenrg_chrg = models.CharField(
        db_column="EL_ELENRG_CHRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_envr_expn_sbtr = models.CharField(
        db_column="EL_ENVR_EXPN_SBTR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_clmt_envr_chrg = models.CharField(
        db_column="EL_CLMT_ENVR_CHRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_flul_ajam = models.CharField(
        db_column="EL_FLUL_AJAM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_sppr = models.CharField(
        db_column="EL_SPPR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_etpw_fund = models.CharField(
        db_column="EL_ETPW_FUND", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_vat = models.CharField(
        db_column="EL_VAT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_ke_clam = models.CharField(
        db_column="EL_KE_CLAM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    pvmn_tran_dcnt = models.CharField(
        db_column="PVMN_TRAN_DCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    thmn_tran_dcnt = models.CharField(
        db_column="THMN_TRAN_DCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    vchr_amt = models.CharField(
        db_column="VCHR_AMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_enrg_cash_back = models.CharField(
        db_column="EL_ENRG_CASH_BACK", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_enrg_gurd = models.CharField(
        db_column="EL_ENRG_GURD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    el_pwtt_adfn = models.CharField(
        db_column="EL_PWTT_ADFN", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    smtt_chrg = models.CharField(
        db_column="SMTT_CHRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    trub_yn = models.CharField(
        db_column="TRUB_YN", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    mter1_trub_yn = models.CharField(
        db_column="MTER1_TRUB_YN", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    mter2_trub_yn = models.CharField(
        db_column="MTER2_TRUB_YN", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    erdf_rang_chek = models.CharField(
        db_column="ERDF_RANG_CHEK", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    inst_dt = models.CharField(
        db_column="INST_DT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    inst_id = models.CharField(
        db_column="INST_ID", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    last_dt = models.CharField(
        db_column="LAST_DT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    last_id = models.CharField(
        db_column="LAST_ID", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_sqno = models.CharField(
        db_column="T_SQNO", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_mtrd_ympr = models.CharField(
        db_column="T_MTRD_YMPR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_mtrd_kind = models.CharField(
        db_column="T_MTRD_KIND", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_rsdn_dvsn = models.CharField(
        db_column="T_RSDN_DVSN", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_mtrd_strt_dd = models.CharField(
        db_column="T_MTRD_STRT_DD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_mtrd_end_dd = models.CharField(
        db_column="T_MTRD_END_DD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_sttt_layr_smmm = models.CharField(
        db_column="T_STTT_LAYR_SMMM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_sttt_yy_avrg = models.CharField(
        db_column="T_STTT_YY_AVRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_sprt_mtrd_yn = models.CharField(
        db_column="T_SPRT_MTRD_YN", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_aply_lkup_sqno = models.CharField(
        db_column="T_APLY_LKUP_SQNO", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_lkup_aply_strt_dd = models.CharField(
        db_column="T_LKUP_APLY_STRT_DD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_lkup_usgqty_nodg = models.CharField(
        db_column="T_LKUP_USGQTY_NODG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_lkup_usgqty_rond = models.CharField(
        db_column="T_LKUP_USGQTY_ROND", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_aply_cnrt_sqno = models.CharField(
        db_column="T_APLY_CNRT_SQNO", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_hshl_lkup_sqno = models.CharField(
        db_column="T_HSHL_LKUP_SQNO", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_hshl_el_cnrt_sqno = models.CharField(
        db_column="T_HSHL_EL_CNRT_SQNO", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_lkup_dvsn = models.CharField(
        db_column="T_LKUP_DVSN", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_basc_mtrd_inpr = models.CharField(
        db_column="T_BASC_MTRD_INPR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_basc_mtrd_dcpr = models.CharField(
        db_column="T_BASC_MTRD_DCPR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_hshl_mter_inpr = models.CharField(
        db_column="T_HSHL_MTER_INPR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_hshl_mter_dcpr = models.CharField(
        db_column="T_HSHL_MTER_DCPR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_mter_inpr = models.CharField(
        db_column="T_MTER_INPR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_mter_dcpr = models.CharField(
        db_column="T_MTER_DCPR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_hshl_mter_cnt = models.CharField(
        db_column="T_HSHL_MTER_CNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_frmt_usgqty = models.CharField(
        db_column="T_FRMT_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_frmt_el_wlfr_dcnt = models.CharField(
        db_column="T_FRMT_EL_WLFR_DCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_ocpt_sqno = models.CharField(
        db_column="T_OCPT_SQNO", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_clcl_usgfe = models.CharField(
        db_column="T_CLCL_USGFE", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_vchr_aply_amt = models.CharField(
        db_column="T_VCHR_APLY_AMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_vchr_blce = models.CharField(
        db_column="T_VCHR_BLCE", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_lgfmly_aply_strt_dd = models.CharField(
        db_column="T_LGFMLY_APLY_STRT_DD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_wlfr_aply_strt_dd = models.CharField(
        db_column="T_WLFR_APLY_STRT_DD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_tv_exmt_aply_strt_dd = models.CharField(
        db_column="T_TV_EXMT_APLY_STRT_DD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    t_dcnt_aply_strt_dd = models.CharField(
        db_column="T_DCNT_APLY_STRT_DD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    cplxcd = models.CharField(
        db_column="CPLXCD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    userid = models.CharField(
        db_column="USERID", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    rowidx = models.CharField(
        db_column="ROWIDX", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    action = models.CharField(
        db_column="ACTION", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    srowid = models.CharField(
        db_column="SROWID", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_bldg = models.CharField(
        db_column="L_BLDG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_room = models.CharField(
        db_column="L_ROOM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_lkup_nm = models.CharField(
        db_column="L_LKUP_NM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_pclot_area = models.CharField(
        db_column="L_PCLOT_AREA", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_cmnm = models.CharField(
        db_column="L_CMNM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_rsdn_dvsn_nm = models.CharField(
        db_column="L_RSDN_DVSN_NM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_ocpn_ocpn_dd = models.CharField(
        db_column="L_OCPN_OCPN_DD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_ocpn_key_rlse_dd = models.CharField(
        db_column="L_OCPN_KEY_RLSE_DD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_memo = models.CharField(
        db_column="L_MEMO", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_hshl_cnt = models.CharField(
        db_column="L_EL_HSHL_CNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_lgfmly_kind = models.CharField(
        db_column="L_EL_LGFMLY_KIND", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_wlfr_dcnt = models.CharField(
        db_column="L_EL_WLFR_DCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_mter_sqno = models.CharField(
        db_column="L_MTER_SQNO", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_pvmn_nomt = models.CharField(
        db_column="L_PVMN_NOMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_thmn_nomt = models.CharField(
        db_column="L_THMN_NOMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_thmn_usgqty = models.CharField(
        db_column="L_THMN_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_mter1_pvmn_nomt = models.CharField(
        db_column="L_MTER1_PVMN_NOMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_mter1_thmn_nomt = models.CharField(
        db_column="L_MTER1_THMN_NOMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_mter1_thmn_usgqty = models.CharField(
        db_column="L_MTER1_THMN_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_mter2_pvmn_nomt = models.CharField(
        db_column="L_MTER2_PVMN_NOMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_mter2_thmn_nomt = models.CharField(
        db_column="L_MTER2_THMN_NOMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_mter2_thmn_usgqty = models.CharField(
        db_column="L_MTER2_THMN_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_smtt_chrg_usgqty = models.CharField(
        db_column="L_SMTT_CHRG_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_sttt_pvmn_usgqty = models.CharField(
        db_column="L_STTT_PVMN_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_sttt_pvmn_cmpr = models.CharField(
        db_column="L_STTT_PVMN_CMPR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_sttt_mm3_avrg = models.CharField(
        db_column="L_STTT_MM3_AVRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_sttt_layr2_smmm = models.CharField(
        db_column="L_STTT_LAYR2_SMMM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_thmn_usgfe = models.CharField(
        db_column="L_THMN_USGFE", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_comm_usgqty = models.CharField(
        db_column="L_EL_COMM_USGQTY", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_tvcnt = models.CharField(
        db_column="L_EL_TVCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_tv_exmt = models.CharField(
        db_column="L_EL_TV_EXMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_tv_lcns_fee = models.CharField(
        db_column="L_EL_TV_LCNS_FEE", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_dcnt_amt_smtt = models.CharField(
        db_column="L_EL_DCNT_AMT_SMTT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_lgfmly_chrg = models.CharField(
        db_column="L_EL_LGFMLY_CHRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_wlfr_chrg = models.CharField(
        db_column="L_EL_WLFR_CHRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_wlfr_adtl_rdct = models.CharField(
        db_column="L_EL_WLFR_ADTL_RDCT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_vlnr_hrcy_alvn_amt = models.CharField(
        db_column="L_VLNR_HRCY_ALVN_AMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_gurn_ddct = models.CharField(
        db_column="L_EL_GURN_DDCT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_pwsv_dcnt = models.CharField(
        db_column="L_EL_PWSV_DCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_smss_dcnt = models.CharField(
        db_column="L_EL_SMSS_DCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_basc_chrg = models.CharField(
        db_column="L_BASC_CHRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_elenrg_chrg = models.CharField(
        db_column="L_EL_ELENRG_CHRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_envr_expn_sbtr = models.CharField(
        db_column="L_EL_ENVR_EXPN_SBTR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_clmt_envr_chrg = models.CharField(
        db_column="L_EL_CLMT_ENVR_CHRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_flul_ajam = models.CharField(
        db_column="L_EL_FLUL_AJAM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_sppr = models.CharField(
        db_column="L_EL_SPPR", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_etpw_fund = models.CharField(
        db_column="L_EL_ETPW_FUND", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_vat = models.CharField(
        db_column="L_EL_VAT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_ke_clam = models.CharField(
        db_column="L_EL_KE_CLAM", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_pvmn_tran_dcnt = models.CharField(
        db_column="L_PVMN_TRAN_DCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_thmn_tran_dcnt = models.CharField(
        db_column="L_THMN_TRAN_DCNT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_vchr_amt = models.CharField(
        db_column="L_VCHR_AMT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_enrg_cash_back = models.CharField(
        db_column="L_EL_ENRG_CASH_BACK", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_enrg_gurd = models.CharField(
        db_column="L_EL_ENRG_GURD", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_el_pwtt_adfn = models.CharField(
        db_column="L_EL_PWTT_ADFN", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_smtt_chrg = models.CharField(
        db_column="L_SMTT_CHRG", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_trub_yn = models.CharField(
        db_column="L_TRUB_YN", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_mter1_trub_yn = models.CharField(
        db_column="L_MTER1_TRUB_YN", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_mter2_trub_yn = models.CharField(
        db_column="L_MTER2_TRUB_YN", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_erdf_rang_chek = models.CharField(
        db_column="L_ERDF_RANG_CHEK", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_inst_dt = models.CharField(
        db_column="L_INST_DT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_inst_id = models.CharField(
        db_column="L_INST_ID", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_last_dt = models.CharField(
        db_column="L_LAST_DT", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    l_last_id = models.CharField(
        db_column="L_LAST_ID", max_length=1000, blank=True, null=True
    )  # Field name made lowercase.
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = "VIN10100_ActionSearch"
        unique_together = (("dan_cd", "mtrd_type", "yyyy_mm", "bldg", "room"),)
