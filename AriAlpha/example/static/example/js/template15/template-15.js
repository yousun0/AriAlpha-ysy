class Template15 {
  constructor(container){
    this.container = container
    // 페이지네이션과 게시물 목록을 초기화하고 렌더링
    this.schemeContainer = this.container.querySelector(".tab-filter-container >div");
    const myGridElement = container.querySelectorAll('.grid-table');
    myGridElement.forEach((el)=>{
      agGrid.createGrid(el, gridData[el.dataset.gridData]);
    })

    this.scheme={}
    this.init()
    this.tabEvent();
    this.filterTabEvent();
    
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
      new SelectOptions({
        title: '구분',
        id: 'sortby',
        name: 'sortby',
        list: [
          'combo box',
          'combo box'
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
      new SelectOptions({
        title: '구분',
        id: 'sortby',
        name: 'sortby',
        list: [
          'combo box',
          'combo box'
        ]
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
  section3(){
    this.schemeContainer.section3 = this.container.querySelector(".tab-filter-container[data-scheme='section3'] >div");

    this.scheme.section3 = [
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
      new SelectOptions({
        title: '구분',
        id: 'sortby',
        name: 'sortby',
        list: [
          'combo box',
          'combo box'
        ]
      }),
    ]

    this.scheme.section3.forEach(sche => {
      // sche가 배열인 경우
      if (Array.isArray(sche)) {
        const wrapperDiv = document.createElement('div');
        sche.forEach(item => {
          wrapperDiv.appendChild(item.container);
        });
        this.schemeContainer.section3.appendChild(wrapperDiv);
      }
      // sche가 클래스 인스턴스인 경우
      else {
        this.schemeContainer.section3.appendChild(sche.container);
      }
    });
    
  }

  filterTabEvent(){
    const targetNav= this.container.querySelectorAll(".template-filter-tab .template-filter-tab-navs");
    const targetContainer = this.container.querySelectorAll(".template-filter-tab-contents-container .tab-filter-container");

    targetNav.forEach((nav)=>{
      nav.addEventListener("click",()=>{
        targetNav.forEach(container=>container.classList.remove("active"))
        targetContainer.forEach(container=>container.classList.remove("active"))
        nav.classList.add("active")
        this.container.querySelector(`.template-filter-tab-contents-container .tab-filter-container[data-template-tab="${nav.dataset.templateTab}"]`).classList.add("active")
      })
    })
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
    this.section1()
    this.section2()
    this.section3()
  }
  
}


window.registerModuleInit('template-15', (element) => {
  const me = new Template15(element)

});

if(isPopup) {
  new Template15(document.querySelector(".template-15"));
}

