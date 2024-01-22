/**
 * de
 */

const hideMenu = [
  {
    title: "대시보드",
    slug: "dashboard",
    icon: null,
    type: ''
  },{
    title: "나의 달력",
    slug: "calendar",
    icon: null,
    type: ''
  },{
    title: "나의 할 일",
    slug: "todo",
    icon: null,
    type: ''
  },{
    title: "나의 메모",
    slug: "memo",
    icon: null,
    type: ''
  },{
    title: "메모 작성",
    slug: "new-memo",
    icon: null,
    type: ''
  },{
    title: "나의 정보",
    slug: "mypage",
    icon: null,
    type: ''
  },
]

const dummySubmenu = [
  {
    title: "기초정보",
    slug: "basic-info",
    icon: null,
    type: 'submenu-title',
    children: [
      {
        title: '템플릿1',
        slug: 'template-1',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿2',
        slug: 'template-2',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿3',
        slug: 'template-3',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿4',
        slug: 'template-4',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿5',
        slug: 'template-5',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿6',
        slug: 'template-6',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿7',
        slug: 'template-7',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿8',
        slug: 'template-8',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿9',
        slug: 'template-9',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿10',
        slug: 'template-10',
        type: 'submenu',
        icon: null
      },
    ]
  },{
    title: "예산",
    slug: "budget",
    icon: null,
    type: 'submenu-title',
    children: [
      {
        title: '템플릿11',
        slug: 'template-11',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿12',
        slug: 'template-12',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿13',
        slug: 'template-13',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿14',
        slug: 'template-14',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿15',
        slug: 'template-15',
        type: 'submenu',
        icon: null
      },
      {
        title: '템플릿16',
        slug: 'template-16',
        type: 'submenu',
        icon: null
      },
    ]
  },{
    title: "전표",
    slug: "invoice",
    icon: null,
    type: 'submenu-title',
    children: [
      {
        title: '템플릿17',
        slug: 'template-17',
        type: 'submenu',
        icon: null
      },
      {
        title: '전표등록(계정식)',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '전표등록(수익사업)',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '결의서관리',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '전표조회',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '수납자동분개처리',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '전표수정이력',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '분개장',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '일계표',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '월계표',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '현금출납장',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '제예금명세서',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '잡수입 및 공사 예치금 관리',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
    ]
  },{
    title: "세금계산서",
    slug: "vat-tax",
    icon: null,
    type: 'submenu-title',
    children: [
      {
        title: '세금계산서현황',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '매입매출장',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '세금계산서합계표',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
    ]
  },{
    title:"장부",
    slug: 'ledger',
    icon: null,
    type: 'submenu-title',
    children:[
      {
        title: '관리비용명세서',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '거래처원장',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '총계정원장',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '보조부원장',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '계정과목별잔액장',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
    ]
  },{
    title:"월말결산",
    slug: 'monthend-settlement',
    icon: null,
    type: 'submenu-title',
    children:[
      {
        title: '아파트정보등록',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '결산보고서주석등록',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '재무상태표',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '운영성과표',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '부속명세서',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '부속명세서(그룹)',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '부속명세서(단일)',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '첨부파일등록',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '결산보고서출력',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '위탁사결산보고서출력',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
    ]
  },{
    title:"결산",
    slug: 'settlement',
    icon: null,
    type: 'submenu-title',
    children:[
      {
        title: '합계잔액시산표',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '대차대포표',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '손익계산서',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '월별손익계산서',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '세입세출서',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '연도이월',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
    ]
  },{
    title:"세무",
    slug: 'tax',
    icon: null,
    type: 'submenu-title',
    children:[
      {
        title: '홈택스정보입력',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '홈택스정보확인',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '계정별원장',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '세무자료실관리',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '법인세산출요약표',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '세무계정별원장',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '세무결산서',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '법인세신고(관리자)',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '법인세신고(단지확인)',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '법인지방소득세신고',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '법인세중간예납(관리자)',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '법인세중간예납(단지)',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '법인세가결산',
        slug: 'example',
        type: 'submenu',
        icon: null
      },
      {
        title: '법인세가결산(관리자)',
        slug: 'example',
        type: 'submenu',
        icon: null
      },

    ]
  }
]

const nav_data = [
  {
    title: "단지설정",
    slug: "complex-setting",
    icon: "complex-setting",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu,
    
  },
  {
    title: "신규입주",
    slug: "new-movein",
    icon: "new-movein",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "검침",
    slug: "meter",
    icon: "meter",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "부과",
    slug: "charge",
    icon: "charge",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "수납",
    slug: "acceptance",
    icon: "acceptance",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "회계",
    slug: "accounting",
    icon: "accounting",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "세무",
    slug: "tax",
    icon: "tax",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "인사급여",
    slug: "salary",
    icon: "salary",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "입주",
    slug: "movein",
    icon: "movein",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "민원/하자보수",
    slug: "repair",
    icon: "repair",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "전산관리",
    slug: "computational",
    icon: "computational",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "관리자",
    slug: "admin",
    icon: "admin",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "커뮤니티",
    slug: "community",
    icon: "community",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "은행업무",
    slug: "banking",
    icon: "banking",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
  {
    title: "세금계산서",
    slug: "tax-receipt",
    icon: "tax-receipt",
    belong: ".menu-1",
    type: "main",
    children: dummySubmenu
  },
]

const topNav_data = [
  {
    title: "작업현황",
    slug: "workprogress",
    icon: "workprogress",
    belong: "",
    type: "groupMenu",
    children: [
      {
        title:"이체마감일지",
        slug: "",
        type: "popup"
      },{
        title:"관리일지",
        slug: "",
        type: "popup"
      },{
        title:"공정현황",
        slug: "",
        type: "popup"
      },{
        title:"업무현황",
        slug: "",
        type: "popup"
      }
    ]

  },
  {
    title: "워크플로우",
    slug: "workflow",
    icon: "workflow",
    belong: "",
    type: "groupMenu",
    children: [

    ]
  },
  {
    title: "전체메뉴",
    slug: "allMenu",
    icon: "allMenu",
    belong: "",
    type: "sitemap",
  },
  {
    title: "즐겨찾기",
    slug: "starred",
    icon: "starred",
    belong: "",
    type: "groupMenu",
    children: [

    ]
  },
  {
    title: "지원센터",
    slug: "service",
    icon: "service",
    belong: "",
    type: "groupMenu",
    children: [
      {
        title:"자주묻는질문",
        slug: "faq",
        type: "popup"
      },
      {
        title:"도움말",
        slug: "information",
        type: "popup"
      },
      {
        title:"자료실",
        slug: "materials",
        type: "popup"
      },
      {
        title:"1:1문의",
        slug: "faq",
        type: "popup"
      },
      {
        title:"접속기록",
        slug: "record",
        type: "popup"
      },
      {
        title:"원격지원",
        slug: "remote",
        type: "popup"
      },
    ]
  }
]

const sideMenu_data = [
  {
    title: "세대납부정보",
    slug: "home-pay",
    icon: "homePay",
  },
  {
    title: "세대조회(종합)",
    slug: "home-search",
    icon: "homeSearch",
  },
  {
    title: "온라인고지서",
    slug: "mob-bill",
    icon: "mobBill",
  },
  {
    title: "전출중간정산",
    slug: "immi-pay",
    icon: "immiPay",
  },
  {
    title: "전자세금계산서",
    slug: "tax",
    icon: "tax",
  },
  {
    title: "세대미수납조회",
    slug: "not-paid",
    icon: "notPaid",
  },
  {
    title: "입금내역현황",
    slug: "account-live",
    icon: "accountLive",
  },
  {
    title: "계좌관리업무",
    slug: "bank-account",
    icon: "bankAccount",
  },
  {
    title: "SMS & 알림톡",
    slug: "sms-talk",
    icon: "sms",
  },
  {
    title: "사용량 통합조회",
    slug: "statistics",
    icon: "statistics",
  },
  {
    title: "자료전송",
    slug: "share-file",
    icon: "shareFile",
  },
  {
    title: "전자고지세대",
    slug: "mail-bill",
    icon: "mailBill",
  },
  {
    title: "부가세산출",
    slug: "vat-tag",
    icon: "vatTag",
  },
  {
    title: "메모",
    slug: "memo",
    icon: "memo",
  },
]