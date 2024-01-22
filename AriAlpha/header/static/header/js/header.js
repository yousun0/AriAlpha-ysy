// 수정중


class Header {
  constructor(el){
    this.container = el;
    this.init();
    this.container.querySelector("#aptInfoBtn").addEventListener("click", ()=>{
      this.container.classList.toggle("is-open")
    })
  }

  showAptInfo(){

  }

  handleModeControl(e) {
    if(e.target.checked){
      // 다크모드
      // document.querySelector("meta[name=color-scheme]").content = "dark";
      document.documentElement.classList.remove("mode-light")
      document.documentElement.classList.add("mode-dark")
      
    }else{
      // 라이트모드
      // document.querySelector("meta[name=color-scheme]").content = "light";
      document.documentElement.classList.add("mode-light")
      document.documentElement.classList.remove("mode-dark")
    }
  }

  checkSitemapMenuState() {
    const checkbox = this.container.querySelector("#forMultipleMenu")
    if(!checkbox) return;
    if (checkbox.checked) {
      // 체크됐을 때의 동작
      this.container.querySelector(".groupmenu-cart").classList.add("active")
      window.tabManager.block = true;
    } else {
      // 체크 해제됐을 때의 동작
      this.container.querySelector(".groupmenu-cart").classList.remove("active")
      window.tabManager.block = false;
    }
  }

  async processMenuItems(menuItems) { 
    const elements = [];

    for(const menuItem of menuItems){
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.className = "btn-l w-auto btn-icon bg-transparent";
      button.innerHTML = `
      <div class="icon size-xxl lottie-icon lottie-fill-primary-middle" data-icon="${menuItem.icon}">
      </div>
      <h4>${menuItem.title}</h4>`;
  
      li.appendChild(button);
      // $(".header--nav_container").appendChild(button);
      const div = document.createElement("div");
      switch (menuItem.type){
        case 'groupMenu':
          div.className='modal-group-menu';
          div.innerHTML = `
          <ul></ul>
          `
          
          menuItem.children.forEach(childItem=>{
            const gmLi = document.createElement("li")
            gmLi.innerHTML = `
              <a href="/tab/${childItem.slug}.html" data-tab-trigger="${childItem.slug}" data-tab-type="${childItem.type}">${childItem.title}</a>
            `
            div.querySelector("ul").appendChild(gmLi);
          })
          
          break;
        case 'sitemap':
          div.className='sitemap'
          div.innerHTML=`
            <ul>
              <li>
                <h4>전체메뉴</h4>
                <ul class="sitemap-index-container">
                </ul>
              </li>
              <li>
                <h4>다중메뉴선택</h4>
                <label for="forMultipleMenu" class="toggle-bar" >
                  <input type="checkbox" id="forMultipleMenu" checked>
                  <div class="toggle-bg"></div>
                  <div class="toggle-thumb"></div>
                </label>
              </li>
            </ul>
            <div>
              <div class="menu-scroller">
                
                <ul class="sitemap-menu-container">
                </ul>
              </div>
              <div class="groupmenu-cart active">
                <h4>내 메뉴 담기</h4>
                <div class="group-mode-off">
                  <button class="btn-tertiary-l w-full" id="changeMultipleMode">다중메뉴 선택하기</button>
                  <p class="description text-center">다중메뉴를 선택 후 탭화면으로 옮기면 담아둔 메뉴가 탭에 모두 표시됩니다.</p>
                </div>
                <div class="group-mode-on">
                  <div class="group-mode-cart">
                    <ol class="draggable-menu-list">
                    </ol>
                  </div>
                  <div class="group-mode-controller">
                    <button class="btn-primary-l w-full" id="moveToTab">탭화면으로 옮기기</button>
                    <button class="btn-secondary w-full" id="registerGroupMenu">나의 그룹메뉴 등록</button>
                    <p class="description text-center"">다중메뉴를 선택 후 탭화면으로 옮기면 담아둔 메뉴가 탭에 모두 표시됩니다.</p>
                  </div>
                </div>
              </div>
            </div>
          `;
          const groupModeToggle = div.querySelector("#forMultipleMenu");
            // 체크박스 상태 확인 및 처리 로직
          // 체크박스 상태 변경 감지
          groupModeToggle.addEventListener('change', ()=>this.checkSitemapMenuState());
          
          div.querySelector("#changeMultipleMode").addEventListener("click",()=>{
            groupModeToggle.checked = true
            this.checkSitemapMenuState()
          })

          div.querySelector("#moveToTab").addEventListener("click",()=>{
            if(!this.draggableGroupmenu || !window.tabManager) return;
            const items = this.draggableGroupmenu.getItems();
            items.forEach(async(item)=>{
              await window.tabManager.openTab({
                slug: item.dataset.tabSlug,
                title: item.dataset.tabName
              })
            })
            div.querySelector("#moveToTab").closest(".is-open").classList.remove("is-open")
            this.draggableGroupmenu.removeItems();
          })

          div.querySelector("#registerGroupMenu").addEventListener("click",()=>{
            if(!this.draggableGroupmenu) return;
            //그룹메뉴 등록 로직
          })
          
          

          nav_data.forEach((navItem)=>{
            const indexContainer = div.querySelector(".sitemap-index-container");
            const menuContainer = div.querySelector(".sitemap-menu-container")

            const indexLi = document.createElement("li");
            indexLi.innerHTML = `
              <a href="#sitemap_${navItem.slug}">${navItem.title}</a>
            `

            const menuLi = document.createElement("li");
            menuLi.id=`sitemap_${navItem.slug}`
            menuLi.innerHTML = `
              <h4>${navItem.title}</h4>
              <ul></ul>
            `

            navItem.children.forEach((childItem)=>{
              const childLi = document.createElement("li");
              childLi.innerHTML = `
                <h5>${childItem.title}</h5>
                <ul></ul>
              `

              childItem.children.forEach((chiItem)=>{
                const chiLi = document.createElement("li")
                chiLi.innerHTML = `
                  <a href="/tab/${chiItem.slug}.html" data-tab-trigger="${chiItem.slug}" >${chiItem.title}</a>
                  <a class="icon size-m3" href="/tab/${chiItem.slug}.html" data-tab-trigger="${chiItem.slug}" data-tab-type="popup">
                    <svg viewBox="0 0 16 16">
                      <path d="M3.16732 1.33301C2.43094 1.33301 1.83398 1.92996 1.83398 2.66634V13.333C1.83398 13.4524 1.84969 13.5682 1.87915 13.6784L7.72451 7.83301H4.59171C4.22352 7.83301 3.92504 7.53453 3.92504 7.16634C3.92504 6.79815 4.22352 6.49967 4.59171 6.49967H9.33398C9.70217 6.49967 10.0007 6.79815 10.0007 7.16634V12.1663C10.0007 12.5345 9.70217 12.833 9.33398 12.833C8.9658 12.833 8.66732 12.5345 8.66732 12.1663V8.77582L2.82196 14.6212C2.93211 14.6506 3.04788 14.6663 3.16732 14.6663H13.834C14.5704 14.6663 15.1673 14.0694 15.1673 13.333V2.66634C15.1673 1.92996 14.5704 1.33301 13.834 1.33301H3.16732Z"/>
                    </svg>                  
                  </a>
                `
                childLi.querySelector("ul").appendChild(chiLi)
                chiLi.addEventListener("click",()=>{
                  if(window.tabManager.block){
                    const container = this.container.querySelector(".group-mode-cart .draggable-menu-list");
                    const li = document.createElement("li")
                    li.className = 'draggable-menu-item'
                    li.dataset.tabName=chiItem.title
                    li.dataset.tabSlug=chiItem.slug
                    li.innerHTML = `
                    <button class="btn-draggable btn-icon-l">
                      <div class="icon size-m3"><svg class="fill-grayscale-40" viewBox="0 0 24 24" ><path class="st0" d="M5,9c0-0.6,0.4-1,1-1h12c0.6,0,1,0.4,1,1s-0.4,1-1,1H6C5.4,10,5,9.6,5,9z M18,14H6c-0.6,0-1,0.4-1,1s0.4,1,1,1h12c0.6,0,1-0.4,1-1S18.6,14,18,14z"/></svg></div>
                    </button>
                    <p>${chiItem.title}</p>
                    <button class="btn-del-item icon-circle bg-error size-m4">
                      <div class="icon size-m3"><svg viewBox="0 0 16 16" ><path d="M2.30078 7.9998C2.30078 7.61321 2.61418 7.2998 3.00078 7.2998H13.0008C13.3874 7.2998 13.7008 7.61321 13.7008 7.9998C13.7008 8.3864 13.3874 8.6998 13.0008 8.6998H3.00078C2.61418 8.6998 2.30078 8.3864 2.30078 7.9998Z" /></svg></div>
                    </button>
                    `
                    li.querySelector(".btn-del-item").addEventListener("click",()=>li.remove());
                    container.appendChild(li)
                  }
                })
              })

              menuLi.querySelector("ul").appendChild(childLi);
            })
            
            indexContainer.appendChild(indexLi)
            menuContainer.appendChild(menuLi);
          })

        break;
        case 'popup':
          break;
        }
        li.appendChild(div);
      
      li.addEventListener("click", (e)=>{
        if(e.target.closest(".sitemap") || e.target.closest(".draggable-menu-item")){
          return;
        }

        const isOpened = li.classList.contains("is-open");
        [... li.parentElement.children].forEach(childEl=>{
          childEl.classList.remove("is-open")
        })
        
        if(isOpened) {
          li.classList.remove("is-open")
          window.tabManager.block = false;
        }
        else{
          li.classList.add("is-open");
          this.checkSitemapMenuState();
        }
      })
      elements.push(li); // 배열에 요소 추가
    }
    return elements;
  }
  
  async drawHeaderNav(){
    // 
    const elements = await this.processMenuItems(topNav_data);
    const nav = $(".header--nav_container");

    elements.forEach(el => nav.appendChild(el))
  }

  toggleHeaderInfo(){
    document.documentElement.classList.toggle("header-info-open")
    $(".main--header_container").classList.toggle("is-open")
  }

  async init(){
    $("#toggleMode").addEventListener("change",this.handleModeControl);
    $("#headerInfoClose").addEventListener("click", () => this.toggleHeaderInfo())
    await this.drawHeaderNav();
    this.draggableGroupmenu = new DraggableList(".group-mode-cart .draggable-menu-list", ".draggable-menu-item");
    // console.log(draggableGroupmenu.getItems())
  }
}

window.registerModuleInit('header', (element) => {
  new Header(element);
});