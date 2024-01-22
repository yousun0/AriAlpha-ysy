class Template1 {
  constructor(container){
    this.container = container
    // 페이지네이션과 게시물 목록을 초기화하고 렌더링
    this.schemeContainer = this.container.querySelector(".tab-filter-container >div");
    const myGridElement = container.querySelectorAll('.grid-table');
    myGridElement.forEach((el)=>{
      agGrid.createGrid(el, gridData[el.dataset.gridData]);
    })

    this.scheme = [
      new InputMonth({
        title: '부과연월',
        id: 'paymonth',
        name: 'paymonth',
      }),
      new SelectOptions({
        title: '구분',
        id: 'sortby',
        name: 'sortby',
        list: [
          '월주차비',
          '호수'
        ]
      }),
      new InputDate({
        title: '기준일',
        id: 'basedate',
        name: 'basedate',
        showHelper: false
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
        new InputCheck({
          title: '내림차순',
          id: 'descending',
          type:'radio',
          name: 'orderby',
          checked:true
        }),
        new InputCheck({
          title: '오름차순',
          id: 'ascending',
          type:'radio',
          name: 'orderby'
        }),
      ],
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
      [
        new InputCheck({
          title:'개인정보표시',
          id:'viewPrivate',
          type:'checkbox'
        }),
        new InputCheck({
          title:'일수계산차량',
          id:'payedVehicle',
          type:'checkbox'
        }),
        new InputCheck({
          title:'임의수정호실',
          id:'editedRoom',
          type:'checkbox'
        }),
        new InputCheck({
          title:'차량변동호실',
          id:'changedVRoom',
          type:'checkbox'
        }),
        new InputCheck({
          title:'0원출력',
          id:'printZero',
          type:'checkbox',
          checked: true
        }),
      ]
    ]

    this.scheme.forEach(sche => {
      // sche가 배열인 경우
      if (Array.isArray(sche)) {
        const wrapperDiv = document.createElement('div');
        sche.forEach(item => {
          wrapperDiv.appendChild(item.container);
        });
        this.schemeContainer.appendChild(wrapperDiv);
      }
      // sche가 클래스 인스턴스인 경우
      else {
        this.schemeContainer.appendChild(sche.container);
      }
    });
    

    this.init()
  }

  init(){
    this.container.querySelectorAll(".tab-filter-fold").forEach(el=>{
      el.addEventListener("click",()=>{
        el.parentElement.classList.toggle("fold");
      })
    })
  }
  
}


window.registerModuleInit('template-1', (element) => {
  const me = new Template1(element)

});

if(isPopup) {
  new Template1(document.querySelector(".template-1"));
}

