class Template16 {
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
        id:'checkbox',
        type:'checkbox'
      }),
      
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
    this.tabEvent();
  }

  tabEvent(){
    const targetNav= this.container.querySelectorAll(".template-tab .template-tab-navs");
    const targetContainer = this.container.querySelectorAll(".template-tab-contents-container .template-tab-contents");

    targetNav.forEach((nav)=>{
      nav.addEventListener("click",()=>{
        targetNav.forEach(container=>container.classList.remove("active"))
        targetContainer.forEach(container=>container.classList.remove("active"))
        nav.classList.add("active")
        console.log(this.container.querySelector(`.template-tab-contents-container .template-tab-contents[data-template-tab="${nav.dataset.templateTab}"]`))
        this.container.querySelector(`.template-tab-contents-container .template-tab-contents[data-template-tab="${nav.dataset.templateTab}"]`).classList.add("active")
      })
    })
  }

  init(){
    this.container.querySelectorAll(".tab-filter-fold").forEach(el=>{
      el.addEventListener("click",()=>{
        el.parentElement.classList.toggle("fold");
      })
    })
  }
  
}


window.registerModuleInit('template-16', (element) => {
  const me = new Template16(element)

});

if(isPopup) {
  new Template16(document.querySelector(".template-16"));
}

