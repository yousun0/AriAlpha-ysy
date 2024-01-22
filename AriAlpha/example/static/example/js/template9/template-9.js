class Template9 {
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
          'combo box',
          'combo box'
        ]
      }),
      new InputCheck({
        title:'고정 Y/N(off) - 토글',
        id:'viewPrivate',
        type:'checkbox'
      }),
      new InputCheck({
        title:'개인정보표시(중요표시)',
        id:'viewPrivate',
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


window.registerModuleInit('template-9', (element) => {
  const me = new Template9(element)

});

if(isPopup) {
  new Template9(document.querySelector(".template-9"));
}

