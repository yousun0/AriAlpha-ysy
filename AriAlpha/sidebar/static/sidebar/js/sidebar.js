// data/nav.js 에 더미로 올린 데이터 확인.
/**
  * interface MenuType = {
  *  title: string;
  *  slug: string; (영문 소문자, 숫자, -, _ 사용, 특문 및 띄어쓰기 X)
  *  icon: string | bool; (animationData 참고)
  *  type: 'main' | 'submenu-title' | 'submenu'
  *  children: 
  * }
  * 
  * menuItems: menuType[]
  * 
*/

class Sidebar {
  constructor(el) {
    this.container = el;
    this.init();
  }

  async processMenuItems(menuItems) {
    const elements = []; // 생성된 요소들을 저장할 배열
  
    for (const menuItem of menuItems) {
      const li = document.createElement("li");
  
      switch (menuItem.type) {
        case 'main':
          li.innerHTML = `
            <button class="btn-l w-full btn-icon bg-transparent">
              <div class="icon size-xxl lottie-icon lottie-fill-primary-middle" data-icon="${menuItem.slug}"></div>
              <h4>${menuItem.title}</h4>
            </button>
          `;
  
          if (menuItem.children) {
            const ul = document.createElement("ul");
            ul.className = 'modal-menu-container';
            const childElements = await this.processMenuItems(menuItem.children);
            childElements.forEach(childElement => ul.appendChild(childElement));
            li.appendChild(ul); // innerHTML 대신 appendChild 사용
          }
  
          // 이벤트 리스너 로직
          const handleMouseClick = (e) => {
            const closestElement = e.target.closest(".modal-menu-container");
            if(closestElement) return;
  
            const isOpened = li.classList.contains("is-open");
            [... li.parentElement.children].forEach(childEl=>{
              childEl.classList.remove("is-open")
            })
  
            if(isOpened) {li.classList.remove("is-open")}
            else{li.classList.add("is-open");}
          }
          
          li.addEventListener("click",handleMouseClick);
  
          break;
  
        case 'submenu-title':
          li.innerHTML = `
            <h4>${menuItem.title}</h4>
          `
          if (menuItem.children) {
            const ul = document.createElement("ul");
            ul.className = 'modal-menu-container';
            const childElements = await this.processMenuItems(menuItem.children);
            childElements.forEach(childElement => ul.appendChild(childElement));
            li.appendChild(ul); // innerHTML 대신 appendChild를 사용
          }
          break;
  
        case 'submenu':
          li.innerHTML = `
            <a href="/tab/${menuItem.slug}.html" data-tab-trigger="${menuItem.slug}">${menuItem.title}</a>
            <a class="icon size-m1"href="/tab/${menuItem.slug}.html" data-tab-trigger="${menuItem.slug}" data-tab-type="popup">
              <svg viewBox="0 0 16 16">
                <path d="M3.16732 1.33301C2.43094 1.33301 1.83398 1.92996 1.83398 2.66634V13.333C1.83398 13.4524 1.84969 13.5682 1.87915 13.6784L7.72451 7.83301H4.59171C4.22352 7.83301 3.92504 7.53453 3.92504 7.16634C3.92504 6.79815 4.22352 6.49967 4.59171 6.49967H9.33398C9.70217 6.49967 10.0007 6.79815 10.0007 7.16634V12.1663C10.0007 12.5345 9.70217 12.833 9.33398 12.833C8.9658 12.833 8.66732 12.5345 8.66732 12.1663V8.77582L2.82196 14.6212C2.93211 14.6506 3.04788 14.6663 3.16732 14.6663H13.834C14.5704 14.6663 15.1673 14.0694 15.1673 13.333V2.66634C15.1673 1.92996 14.5704 1.33301 13.834 1.33301H3.16732Z"/>
              </svg>                  
            </a>
          `
  
          break;
      }
  
      elements.push(li); // 배열에 요소 추가
    }
  
    return elements; // 배열 반환
  };
  

  async drawMenu(){
    const elements = await this.processMenuItems(nav_data);
    const nav = this.container.querySelector(".menu-1")
    
    elements.forEach(el => {
      nav.appendChild(el);
    })
  }
  
  toggleModalNav(bool){
    if(!this.container.classList.contains("is-open") && bool){
      document.querySelector(".modal-sidebar").classList.add("is-active")
    
    }else{
      document.querySelector(".modal-sidebar").classList.remove("is-active")
    }
  }

  sidebarFoldControl(e){
    // 가장 가까운 'button' 요소 찾기
    const button = e.target.closest('button');

    // 'button' 요소가 있고, 이벤트 리스너가 걸린 요소가 맞다면 처리
    if (button) {
      document.querySelector("main .sidebar").classList.toggle("is-open");
    }
  }

  async init() {
    await this.drawMenu();
    this.container.querySelector(".fold-btn").addEventListener("click", this.sidebarFoldControl)
    
    if(!this.container.parentElement.classList.contains("modal-sidebar")){
      this.container.addEventListener("mouseenter",()=>this.toggleModalNav(true));
    }else{
      this.container.addEventListener("mouseleave",()=>this.toggleModalNav(false));
    }

    this.container.querySelectorAll(".mymenu-btn, #alertBtn").forEach(btn=>btn.addEventListener("click",()=>{
      if(btn.parentElement.classList.contains("is-open")){
        btn.parentElement.classList.remove('is-open')
      }else{
        btn.parentElement.classList.add('is-open')
      }
    }))
    // this.container.querySelector(".mymenu-btn").addEventListener("click",()=>{
    //   if(this.container.querySelector(".mymenu-btn").parentElement.classList.contains("is-open")){
    //     this.container.querySelector(".mymenu-btn").parentElement.classList.remove('is-open')
    //   }else{
    //     this.container.querySelector(".mymenu-btn").parentElement.classList.add('is-open')
    //   }
    // })

    this.container.querySelector("#plusTimerBtn").addEventListener("click", () => {
      globalTimer.reset();
      globalTimer.start();
    });

    globalTimer.start();
    globalTimer.updateDisplay(); // 타이머 표시를 업데이트합니다.
  }
}

window.registerModuleInit('sidebar', (element) => {
  new Sidebar(element);
});