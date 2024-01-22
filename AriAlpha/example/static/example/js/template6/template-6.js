class Template6 {
  constructor(container){
    this.container = container
    this.schemeContainer = {}
    this.scheme = {}
    // 페이지네이션과 게시물 목록을 초기화하고 렌더링
    const myGridElement = container.querySelectorAll('.grid-table');
    myGridElement.forEach((el)=>{
      agGrid.createGrid(el, gridData[el.dataset.gridData]);
    })


    this.init()
  }

  section1(){
    this.schemeContainer.section1 = this.container.querySelector(".tab-filter-container[data-scheme='section1'] >div");

    this.scheme.section1 = [
      new InputMonth({
        title: '월분',
        id: 'paymonth',
        name: 'paymonth',
      }),
      new InputText({
        title: '동',
        id: 'complex',
        name: 'complex',
        value: '103',
        className: 'width-small',
        numberOnly: true,
        disabled:true
      }),
      [
        new InputText({
          title: '호',
          id: 'startRoom',
          name: 'roomRange',
          value: '101',
          className: 'width-small',
          numberOnly: true,
        }),
        new InputText({
          title: '호',
          id: 'endRoom',
          name: 'roomRange',
          value: '2020',
          className: 'width-small',
          numberOnly: true,
        }),
      ],
      new SelectOptions({
        title: '구분',
        id: 'sortby',
        name: 'sortby',
        list: [
          '월주차비',
          '호수'
        ]
      }),
    ]

    this.scheme.section1.forEach(sche => {
      // sche가 배열인 경우
      if (Array.isArray(sche)) {
        const wrapperDiv = document.createElement('div');
        sche.forEach(item => {
          wrapperDiv.appendChild(item.container);
        });
        this.schemeContainer.section1.appendChild(wrapperDiv);
      }
      // sche가 클래스 인스턴스인 경우
      else {
        this.schemeContainer.section1.appendChild(sche.container);
      }
    });
    
  }

  section2(){

    this.schemeContainer.section2 = this.container.querySelector(".tab-filter-container[data-scheme='section2'] >div");

    this.scheme.section2 = [
      new InputMonth({
        title: '월분',
        id: 'paymonth',
        name: 'paymonth',
      }),
      new InputText({
        title: '동',
        id: 'complex',
        name: 'complex',
        value: '103',
        className: 'width-small',
        numberOnly: true,
        disabled:true
      }),
      [
        new InputText({
          title: '호',
          id: 'startRoom',
          name: 'roomRange',
          value: '101',
          className: 'width-small',
          numberOnly: true,
        }),
        new InputText({
          title: '호',
          id: 'endRoom',
          name: 'roomRange',
          value: '2020',
          className: 'width-small',
          numberOnly: true,
        }),
      ],
      new SelectOptions({
        title: '구분',
        id: 'sortby',
        name: 'sortby',
        list: [
          '월주차비',
          '호수'
        ]
      }),
      [
        new InputCheck({
          title: '정방향',
          id: 'descending',
          type:'radio',
          name: 'orderby',
          checked:true
        }),
        new InputCheck({
          title: '역방향',
          id: 'ascending',
          type:'radio',
          name: 'orderby'
        }),
      ],
      new InputCheck({
        title:'체크박스',
        id:'viewPrivate',
        type:'checkbox'
      }),
      new InputCheck({
        title:'개인정보표시(중요표시)',
        id:'viewPrivate',
        type:'checkbox'
      }),
      new InputCheck({
        title:'고정 Y/N(off) - 토글',
        id:'viewPrivate',
        type:'checkbox'
      }),
    ]
    this.scheme.section2.forEach(sche => {
      // sche가 배열인 경우
      if (Array.isArray(sche)) {
        const wrapperDiv = document.createElement('div');
        sche.forEach(item => {
          wrapperDiv.appendChild(item.container);
        });
        this.schemeContainer.section2.appendChild(wrapperDiv);
      }
      // sche가 클래스 인스턴스인 경우
      else {
        this.schemeContainer.section2.appendChild(sche.container);
      }
    });
  }

  init(){
    this.section1()
    this.section2()
    this.container.querySelectorAll(".tab-filter-fold").forEach(el=>{
      el.addEventListener("click",()=>{
        el.parentElement.classList.toggle("fold");
      })
    })
  }
  
}


window.registerModuleInit('template-6', (element) => {
  const me = new Template6(element)

});

if(isPopup) {
  new Template6(document.querySelector(".template-6"));
}

