import asyncio
import json
from time import sleep

from asgiref.sync import sync_to_async
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.db import connection

from AriAlpha.WebComponentwithdynamicjs.models import (
    Vin10100Actionsearch,
    VINM0200_GetCommCdMstr,
)


def get_js_file(request, test_number=None):
    # static에서 js 파일 경로
    js_file_name = (
        f"WebComponentAsync/js/async_test{test_number}/async_test{test_number}.js"
    )
    return JsonResponse({"js_file_name": js_file_name})


async def get_html(request, test_number=None):
    # dictionary 형태로 html에 넘겨줄 값
    function_auth: dict = {
        "search_auth": True,
        "print_auth": False,
    }

    parameter = await get_parameter()

    # function_auth와 parameter를 하나의 딕셔너리로 합치기
    context = {**function_auth, **parameter}
    return render(request, f"WebComponentAsync/async_test{test_number}.html", context)


# 파라미터 비동기 처리
@sync_to_async
def get_data_by_dan_and_clsf(dan_cd, clsf_cd):
    # 매개변수로 받은 DAN_CD와 CLSF_CD에 해당하는 데이터 조회
    data = (
        VINM0200_GetCommCdMstr.objects.filter(
            DAN_CD=dan_cd, CLSF_CD=clsf_cd, USE_YN="Y"
        )
        .values("DETL_CD", "DETL_NM")
        .order_by("SORT_SEQ")
    )
    return list(data)


async def get_parameter():
    # asyncio.gather를 사용하여 두 함수를 동시에 비동기적으로 호출
    data_1150, data_h031 = await asyncio.gather(
        get_data_by_dan_and_clsf("9999", "1150"),
        get_data_by_dan_and_clsf("9999", "H031"),
    )

    # 결과를 딕셔너리 형태로 템플릿에 전달
    context = {"data_1150": data_1150, "data_h031": data_h031}
    return context


def get_grid(request):
    grid_file_name = "WebComponentAsync/js/component_test_grid.js"
    return JsonResponse({"grid_file_name": grid_file_name})


@require_http_methods(["POST"])
def get_data(request, test_number=None):
    data = json.loads(request.body)
    dancode = data["dancode"]
    yyyymm = data["yyyymm"]
    if not dancode or not yyyymm:
        return JsonResponse({"error": "Missing data"}, status=400)

    with connection.cursor() as cursor:
        cursor.execute(
            "Select bldg, room, lkup_nm, pclot_area, cmnm, t_lkup_dvsn, "
            "ocpn_ocpn_dd, ocpn_key_rlse_dd, memo, el_hshl_cnt, el_lgfmly_kind, "
            "el_wlfr_dcnt, mter_sqno, pvmn_nomt, thmn_nomt, thmn_usgqty, mter1_pvmn_nomt, "
            "mter1_thmn_nomt, mter1_thmn_usgqty, mter2_pvmn_nomt, mter2_thmn_nomt, "
            "mter2_thmn_usgqty, smtt_chrg_usgqty, sttt_pvmn_usgqty, sttt_pvmn_cmpr, "
            "sttt_mm3_avrg, sttt_layr2_smmm, thmn_usgfe, el_comm_usgqty, el_tvcnt, "
            "el_tv_exmt, el_tv_lcns_fee, el_dcnt_amt_smtt, el_lgfmly_chrg, el_wlfr_chrg, "
            "el_wlfr_adtl_rdct, vlnr_hrcy_alvn_amt, el_gurn_ddct, el_pwsv_dcnt, el_smss_dcnt, "
            "basc_chrg, el_elenrg_chrg, el_envr_expn_sbtr, el_clmt_envr_chrg, el_flul_ajam, "
            "el_sppr, el_etpw_fund, el_vat, el_ke_clam, pvmn_tran_dcnt, thmn_tran_dcnt, "
            "vchr_amt, el_enrg_cash_back, el_enrg_gurd, el_pwtt_adfn, smtt_chrg, trub_yn, "
            "mter1_trub_yn, mter2_trub_yn, erdf_rang_chek, inst_dt, inst_id, last_dt, last_id "
            "From vin10100_actionsearch where dan_cd = %s and yyyy_mm = %s order by bldg, room",
            [dancode, yyyymm],
        )

        column_names = [col[0] for col in cursor.description]
        rows = []
        while True:
            batch = cursor.fetchmany(1000)
            if not batch:
                break
            rows.extend([dict(zip(column_names, row)) for row in batch])

    if int(test_number) == 1:
        data = {"data": rows * 1000}
    else:
        data = {"data": rows}

    # test_number가 1이면 1000을 곱하고 아니면 1을 곱함
    if int(test_number) == 1:
        pass
    elif int(test_number) == 2:
        sleep(20)
    elif int(test_number) == 3:
        sleep(15)
    elif int(test_number) == 4:
        sleep(3)

    return JsonResponse(data)
