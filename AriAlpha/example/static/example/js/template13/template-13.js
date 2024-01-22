class Template13 {
  constructor(container){
    this.container = container
    // 페이지네이션과 게시물 목록을 초기화하고 렌더링
    this.schemeContainer = this.container.querySelector(".tab-filter-container >div");
    const myGridElement = container.querySelectorAll('.grid-table');
    myGridElement.forEach((el)=>{
      agGrid.createGrid(el, gridData[el.dataset.gridData]);
    })

    this.scheme = [
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
          'combo box',
          'combo box'
        ]
      }),
      new InputCheck({
        title:'고정 Y/N(off) - 토글',
        id:'viewPrivateOff',
        type:'checkbox'
      }),
      new InputCheck({
        title:'고정 Y/N(on) - 토글',
        id:'viewPrivateOn',
        type:'checkbox'
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
      [
        new InputCheck({
          title:'체크박스',
          id:'checkbox',
          type:'checkbox'
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


window.registerModuleInit('template-13', (element) => {
  const me = new Template13(element)

});

if(isPopup) {
  new Template13(document.querySelector(".template-13"));
}

