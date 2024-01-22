
  const columnDefs = [
      { field: "bldg", headerName: "동", editable: true, sortable: true, filter: true, width:80, },
      { field: "room", headerName: "호", editable: true, sortable: true, filter: true, width:80},
      { field: "lkup_nm", headerName: "조회 명", editable: true, sortable: true, filter:true, },
      { field: "pclot_area", headerName: "토지 면적", editable: true, sortable: true, filter: true,  },
      { field: "cmnm", headerName: "공통 명칭", editable: true, sortable: true, filter: true,  },
      { field: "t_lkup_dvsn", headerName: "조회 구분", editable: true, sortable: true, filter: true,  },
      { field: "ocpn_ocpn_dd", headerName: "점유 시작 일자", editable: true, sortable: true, filter: true,   },
      { field: "ocpn_key_rlse_dd", headerName: "키 배포 일자", editable: true, sortable: true, filter: true,   },
      { field: "memo", headerName: "메모", editable: true, sortable: true, filter: true, width:80 },
      { field: "el_hshl_cnt", headerName: "전기 가구 수", editable: true, sortable: true, filter: true,  },
      { field: "el_lgfmly_kind", headerName: "대가족 유형", editable: true, sortable: true, filter: true },
      { field: "el_wlfr_dcnt", headerName: "복지 할인", editable: true, sortable: true, filter: true },
      { field: "mter_sqno", headerName: "계량기 일련번호", editable: true, sortable: true, filter: true },
      { field: "pvmn_nomt", headerName: "전력 사용량", editable: true, sortable: true, filter: true },
      { field: "thmn_nomt", headerName: "도시가스 사용량", editable: true, sortable: true, filter: true },
      { field: "thmn_usgqty", headerName: "도시가스 사용량(수량)", editable: true, sortable: true, filter: true },
      { field: "mter1_pvmn_nomt", headerName: "1차 전력 사용량", editable: true, sortable: true, filter: true },
      { field: "mter1_thmn_nomt", headerName: "1차 도시가스 사용량", editable: true, sortable: true, filter: true },
      { field: "mter1_thmn_usgqty", headerName: "1차 도시가스 사용량(수량)", editable: true, sortable: true, filter: true },
      { field: "mter2_pvmn_nomt", headerName: "2차 전력 사용량", editable: true, sortable: true, filter: true },
      { field: "mter2_thmn_nomt", headerName: "2차 도시가스 사용량", editable: true, sortable: true, filter: true },
      { field: "mter2_thmn_usgqty", headerName: "2차 도시가스 사용량(수량)", editable: true, sortable: true, filter: true },
      { field: "smtt_chrg_usgqty", headerName: "소액 청구 사용량", editable: true, sortable: true, filter: true },
      { field: "sttt_pvmn_usgqty", headerName: "통계 전력 사용량", editable: true, sortable: true, filter: true },
      { field: "sttt_pvmn_cmpr", headerName: "통계 전력 비교", editable: true, sortable: true, filter: true },
      { field: "sttt_mm3_avrg", headerName: "통계 평균", editable: true, sortable: true, filter: true },
      { field: "sttt_layr2_smmm", headerName: "통계 2층 요약", editable: true, sortable: true, filter: true },
      { field: "thmn_usgfe", headerName: "도시가스 요금", editable: true, sortable: true, filter: true },
      { field: "el_comm_usgqty", headerName: "전력 상업 사용량", editable: true, sortable: true, filter: true },
      { field: "el_tvcnt", headerName: "TV 수", editable: true, sortable: true, filter: true },
      { field: "el_tv_exmt", headerName: "TV 면제", editable: true, sortable: true, filter: true },
      { field: "el_tv_lcns_fee", headerName: "TV 라이센스 수수료", editable: true, sortable: true, filter: true },
      { field: "el_dcnt_amt_smtt", headerName: "할인 금액(소액)", editable: true, sortable: true, filter: true },
      { field: "el_lgfmly_chrg", headerName: "대가족 요금", editable: true, sortable: true, filter: true },
      { field: "el_wlfr_chrg", headerName: "복지 요금", editable: true, sortable: true, filter: true },
      { field: "el_wlfr_adtl_rdct", headerName: "추가 복지 할인", editable: true, sortable: true, filter: true },
      { field: "vlnr_hrcy_alvn_amt", headerName: "취약 계층 구제 금액", editable: true, sortable: true, filter: true },
      { field: "el_gurn_ddct", headerName: "보증금 할인", editable: true, sortable: true, filter: true },
      { field: "el_pwsv_dcnt", headerName: "절약 할인", editable: true, sortable: true, filter: true },
      { field: "el_smss_dcnt", headerName: "특별 할인", editable: true, sortable: true, filter: true },
      { field: "basc_chrg", headerName: "기본 요금", editable: true, sortable: true, filter: true },
      { field: "el_elenrg_chrg", headerName: "전기 에너지 요금", editable: true, sortable: true, filter: true },
      { field: "el_envr_expn_sbtr", headerName: "환경 비용 공제", editable: true, sortable: true, filter: true },
      { field: "el_clmt_envr_chrg", headerName: "기후 환경 요금", editable: true, sortable: true, filter: true },
      { field: "el_flul_ajam", headerName: "연료 조정", editable: true, sortable: true, filter: true },
      { field: "el_sppr", headerName: "지원금", editable: true, sortable: true, filter: true },
      { field: "el_etpw_fund", headerName: "전력 기금", editable: true, sortable: true, filter: true },
      { field: "el_vat", headerName: "부가가치세", editable: true, sortable: true, filter: true },
      { field: "el_ke_clam", headerName: "KE 클레임", editable: true, sortable: true, filter: true },
      { field: "pvmn_tran_dcnt", headerName: "전력 전송 할인", editable: true, sortable: true, filter: true },
      { field: "thmn_tran_dcnt", headerName: "도시가스 전송 할인", editable: true, sortable: true, filter: true },
      { field: "vchr_amt", headerName: "바우처 금액", editable: true, sortable: true, filter: true },
      { field: "el_enrg_cash_back", headerName: "에너지 캐시백", editable: true, sortable: true, filter: true },
      { field: "el_enrg_gurd", headerName: "에너지 보증", editable: true, sortable: true, filter: true },
      { field: "el_pwtt_adfn", headerName: "전력 추가 기능", editable: true, sortable: true, filter: true},
      { field: "smtt_chrg", headerName: "소액 청구", editable: true, sortable: true, filter: true },
      { field: "trub_yn", headerName: "고장 여부", editable: true, sortable: true, filter: true },
      { field: "mter1_trub_yn", headerName: "1차 고장 여부", editable: true, sortable: true, filter: true },
      { field: "mter2_trub_yn", headerName: "2차 고장 여부", editable: true, sortable: true, filter: true },
      { field: "erdf_rang_chek", headerName: "ERDF 범위 체크", editable: true, sortable: true, filter: true },
      { field: "inst_dt", headerName: "등록 일자", editable: true, sortable: true, filter: true },
      { field: "inst_id", headerName: "등록자", editable: true, sortable: true, filter: true },
      { field: "last_dt", headerName: "최종 일자", editable: true, sortable: true, filter: true },
      { field: "last_id", headerName: "최종자", editable: true, sortable: true, filter: true },
  ]
  // 설정 옵션: 중요, 위에 정의한 것들이 여기서 통합됨에 주목
  export const gridOptions = {
    defaultColDef: {

    },
    rowHeight: 30,
    columnDefs: columnDefs,
  };


//   document.addEventListener('click', function(event) {
//     if (!gridDiv.contains(event.target)) {
//       gridOptions.api.stopEditing(); // 편집 중인 셀의 포커스를 해제
//     }
//   });


