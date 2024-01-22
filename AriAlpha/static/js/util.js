// global
window.moduleInits = {};
window.moduleCounters = {};

window.moduleInits = window.moduleInits || {};
window.registerModuleInit = (moduleName, initFunction) => {
  window.moduleInits[moduleName] = initFunction;
};

window.initializeModules = (moduleName, element) => {
  // 해당 모듈에 대한 카운터가 없으면 초기화
  if (!window.moduleCounters[moduleName]) {
    window.moduleCounters[moduleName] = 0;
  }

  // 고유 식별자 생성
  const uniqueId = `${moduleName}-${window.moduleCounters[moduleName]}`;
  element.dataset.moduleId = uniqueId;

  // 모듈별 초기화 함수 실행  
  if (window.moduleInits[moduleName]) {
    window.moduleInits[moduleName](element);
  }

  // 해당 모듈 카운터 증가
  window.moduleCounters[moduleName]++;
};

// 동적 콘텐츠 로딩 후 모듈 초기화
window.loadAdditionalContent = () => {
  // AJAX 호출 및 콘텐츠 추가 로직...
  // ...

  document.querySelectorAll('[data-module]').forEach(el => {
    const module = el.dataset.module;
    if (module) {
      window.initializeModules(module, el);
    }
  });
}

// 특정 html을 새 창 팝업으로 여는 험수입니다.
function openWindowPop(url, name){
  var options = 'top=10, left=10, width=980, height=551, status=no, menubar=no, toolbar=no, resizable=no';
  window.open(url, name, options);
}

// 팝업으로 열린 창인지 확인합니다.
const isPopup = () => self.opener


function findItemWithSlug(array, slug) {
  for (const item of array) {
    if (item.slug === slug) {
      return item;
    }
    
    if (Array.isArray(item.children)) {
      const found = findItemWithSlug(item.children, slug);
      if (found) {
        return found;
      }
    }
  }
  return null; // 일치하는 항목이 없는 경우
}


// selector
const $ = (a) => { let target = document.querySelectorAll(a); let out; if (target.length > 1) out = target; else out = target[0]; return out; }

// js file을 포함하는 코드입니다.
const includeJs = async (jsFilePath) => {
  return new Promise((resolve, reject) => {
    // if (document.querySelector(`script[src="${jsFilePath}"]`)) {
    //   resolve(); // 이미 로드된 경우, 즉시 resolve
    //   return;
    // }

    const js = document.createElement("script");
    js.type = "text/javascript";
    js.src = jsFilePath;

    js.onload = () => resolve(js); // 스크립트 로드 완료 시 스크립트 요소 반환
    js.onerror = () => resolve(new Error(`Failed to load script: ${jsFilePath}`)); // 로드 실패 시

    document.body.appendChild(js);
  });
};

// css file을 포함하는 코드입니다.
const includeCss = (cssFilePath) => {
  return new Promise((resolve) => {
    if (document.querySelector(`link[href="${cssFilePath}"]`)) {
      // 이미 로드되어있으면 불러오지 않음
      resolve();
      return;
    }
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = cssFilePath;

    css.onload = () => resolve();
    css.onerror = () => {
      console.error(`Failed to load CSS file: ${cssFilePath}`);
      resolve(); // 오류가 발생해도 건너뛰기
    };

    if(css) document.head.appendChild(css); // <head>에 추가하는 것이 일반적입니다.
  });
};


// HTML 모듈을 불러오는 코드입니다.
const fetchAndParseHtml = async (path, selector) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${path}`);
  }
  const html = await response.text();
  const parser = new DOMParser().parseFromString(html, 'text/html');
  return parser.body.querySelector(selector);
};

/**
 * tab VS module
 * tab은 팝업으로 열 수 있고, 페이지로 구성될 수 있습니다.
 */

// tab 폴더의 탭 템플릿들을 불러오는 코드입니다.
// 사용: document.querySelectorAll("[data-tab]").forEach(el=>getTab(el));
const getTab = async (el) => {
  const tab = el.dataset.tab;
  if (!tab) return;

  try {
    // tab/tab.html 의 body 내부에 id가 #pageContent 인 div를 통째로 가져와 data-tab 이 있는 div에 삽입합니다.
    const htmlDom = await fetchAndParseHtml(`/${tab}/`, '#pageContent');
    await includeCss(`/static/${tab}/css/${tab}.css`);

    const newTabElement = htmlDom;
    el.appendChild(htmlDom);
    

    const jsResult = await includeJs(`/static/${tab}/js/${tab}.js`);

    if (jsResult && htmlDom) {
      window.initializeModules(tab, newTabElement); // 스크립트 로드 성공 시 초기화
    }

    return el;
  } catch (e) {
    console.error(e);
  }
};

const getModal = async (el) => {
  const modal = el.dataset.modal;
  if (!modal) return;

  try {
    // modal/modal.html 의 body 내부에 id가 #pageContent 인 div를 통째로 가져와 data-modal 이 있는 div에 삽입합니다.
    const htmlDom = await fetchAndParseHtml(`/index/${modal}/`, '#pageContent');
    await includeCss(`/static/home/css/modal/modal.css`);

    const newTabElement = htmlDom;
    el.appendChild(htmlDom);
    

    const jsResult = await includeJs(`/static/home/js/modal/${modal}.js`);

    if (jsResult && htmlDom) {
      window.initializeModules(modal, newTabElement); // 스크립트 로드 성공 시 초기화
    }

    return el;
  } catch (e) {
    console.error(e);
  }
};

// module 폴더에 있는 코드 조각을 불러오는 코드입니다.
// 사용: document.querySelectorAll("[data-module]").forEach(el=>getModule(el));
const getModule = async (el) => {
  const module = el.dataset.module;
  if (!module) return;

  try {
    const htmlDom = await fetchAndParseHtml(`/${module}/`, '#moduleContent');
    await includeCss(`/static/${module}/css/${module}.css`);

    // 새로운 요소 생성 및 원본 요소 대체
    const newModuleElement = htmlDom;
    el.parentNode.replaceChild(newModuleElement, el);
    const jsResult = await includeJs(`/static/${module}/js/${module}.js`);

    if (jsResult) {
      window.initializeModules(module, newModuleElement); // 스크립트 로드 성공 시 초기화
    }
    // JavaScript 파일 로드
    
  } catch (e) {
    console.error(e);
  }
};


class TabManager {
  constructor() {
    this.block = false;
    this.tabs = new Map();
    this.activeTab = null;
    this.tabListContainer = null;
    this.tabContentContainer = null;
    this.initialized = false;
  }

  async initializeDashboardToTabStructure() {
    const mainContainer = document.querySelector('.contents--inner_container');

    const newTab = document.createElement("main")
    newTab.className='tab-container'
    newTab.innerHTML = `
      <div class="tab-navigator">
        <div class="tab-controller left-side">
          <div >
            <button class="btn-primary-m" id="tabShowBtn">전체보기</button>
            <div class="group-menu-container " id="tablist"><a>hihi</a></div>
          </div>
          <button class="btn-circle" id="prevTabBtn">
            <div class="icon size-s fill-invert">
              <svg viewBox="0 0 8 8">
                <path d="M5.3,7.8c-0.1,0-0.3,0-0.4-0.1L1.6,4.4c-0.2-0.2-0.2-0.5,0-0.7L5,0.3c0.2-0.2,0.5-0.2,0.7,0s0.2,0.5,0,0.7l-3,3
    l3,3c0.2,0.2,0.2,0.5,0,0.7C5.6,7.8,5.4,7.8,5.3,7.8z"/>
              </svg>                    
            </div>
          </button>
          <button class="btn-circle" id="nextTabBtn">
            <div class="icon size-s fill-invert">
              <svg viewBox="0 0 8 8" >
                <path d="M2.7,7.8c-0.1,0-0.3,0-0.4-0.1C2.1,7.5,2.1,7.2,2.3,7l3-3l-3-3c-0.2-0.2-0.2-0.5,0-0.7s0.5-0.2,0.7,0l3.3,3.3
    c0.2,0.2,0.2,0.5,0,0.7L3,7.7C2.9,7.8,2.8,7.8,2.7,7.8z"/>
              </svg>                    
            </div>
          </button>
        </div>
        <div class="tab-menus-container">
        <ul class="tab-menus">
        </ul>
        </div>
        <div class="tab-controller right-side">
          <button class="btn-primary-m bg-error" id="tabAllCloseBtn">전체닫기</button>
        </div>
      </div>
      <div class="tab-holder">
      </div>
    `;

    newTab.querySelector("#tabAllCloseBtn").addEventListener("click",()=>this.closeAllTabs());
    this.tabListContainer = newTab.querySelector(".tab-menus")
    this.tabContentContainer = newTab.querySelector(".tab-holder")
    
    newTab.querySelector("#tabShowBtn").addEventListener("click",()=>{
      newTab.querySelector("#tablist").classList.toggle("active");
    })
    newTab.querySelector("#prevTabBtn").addEventListener("click",()=>this.prev());
    newTab.querySelector("#nextTabBtn").addEventListener("click",()=>this.next());

    this.initialized = true;

    

    this.openTab({slug:'dashboard', title:'대시보드'})
    mainContainer.parentNode.replaceChild(newTab, mainContainer);
    const tabDraggable = new DraggableList('.tab-menus', ".tab-menu");
    return newTab;
  }

  async openTab(tabData) {
    const { slug, title } = tabData;

    if (!this.initialized) {
      this.initializeDashboardToTabStructure();
    }

    if(!slug || !title) return;

    
    if (!this.tabs.has(slug)) {
      // 새 탭 추가
      const newTab = new Tab(slug, title, this);
      this.tabs.set(slug, newTab);
      await newTab.init();
      this.switchToTab(slug)
    }else{
      this.switchToTab(slug);
    }
  }

  switchToTab(slug) {
    if (this.activeTab) {
      const currentActiveContent = document.querySelectorAll(`[data-tabslug="${this.activeTab}"]`);
      currentActiveContent.forEach(curr=>{
        curr.classList.remove("active");
      })
    }

    const nextActiveContent = document.querySelectorAll(`[data-tabslug="${slug}"]`);
    nextActiveContent.forEach(curr=>curr.classList.add("active"))
    this.activeTab = slug;
  }

  getPreviousTabName(slug) {
    const prevTab= this.tabListContainer.querySelector(`[data-tabslug="${slug}"]`).previousElementSibling;
    return prevTab ? prevTab.dataset.tabslug : null;
  }

  getNextTabName(slug) {
    const nextTab= this.tabListContainer.querySelector(`[data-tabslug="${slug}"]`).nextElementSibling;
    return nextTab ? nextTab.dataset.tabslug : null;
  }

  next(){
    const nextTab = this.getNextTabName(this.activeTab);
    if(nextTab) this.switchToTab(nextTab);
  }

  prev(){
    const prevTab = this.getPreviousTabName(this.activeTab);
    if(prevTab) this.switchToTab(prevTab);
  }

  async closeTab(slug) {
    if (this.tabs.has(slug) && await new ModalManager().confirm("정말 이 탭을 닫으시겠습니까?")) {
      const tabElement = this.tabListContainer.querySelector(`[data-tabslug="${slug}"]`);
      const tabContentElement = this.tabContentContainer.querySelector(`[data-tabslug="${slug}"]`);
      const prevTab = this.getPreviousTabName(slug);
      
      if (tabElement) {
        this.tabListContainer.removeChild(tabElement);
      }

      if (tabContentElement) {
        this.tabContentContainer.removeChild(tabContentElement);
      }
      
      if (this.activeTab === slug) {
        // 다른 탭으로 전환 로직, 첫 번째 탭으로 전환
        this.activeTab = null;
        this.tabs.delete(slug);
        this.switchToTab(prevTab);
        
      }
    }
  }

  async closeAllTabs() {
    try {
      const result = await new ModalManager().confirm("정말 모든 탭을 닫으시겠습니까?");
      if (result) {
          this.tabs.forEach((tab, slug) => {
          if(tab.tabName === 'dashboard') return;
          const tabElement = this.tabListContainer.querySelector(`[data-tabslug="${slug}"]`);
          const tabContentElement = this.tabContentContainer.querySelector(`[data-tabslug="${slug}"]`);
    
          if (tabElement) {
            this.tabListContainer.removeChild(tabElement);
          }
    
          if (tabContentElement) {
            this.tabContentContainer.removeChild(tabContentElement);
          }

          this.tabs.delete(slug);
        });
    
        this.switchToTab('dashboard');
      } 
    } catch (error) {
      console.error("모달 처리 중 에러 발생:", error);
    }
  }
}


class Tab {
  constructor(slug, title, tabManager) {
    this.tabName = slug;
    this.tabTitle = title;
    this.tabManager = tabManager;
    // 
    this.container = document.createElement("div");
    this.isEditing = false;
    
    this.tabNavigator = null;
    this.tabContent = null;
    this.tabInfo = null;
  }
  setActive() {
    document.querySelectorAll(".tab-navigator .tab-menus li").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".tab-holder >div").forEach(el => el.classList.remove("active"));
    this.tabNavigator.classList.add("active");
    this.container.classList.add("active");
  }


  createNaviElement() {
    const naviContainer = document.createElement("li");
    naviContainer.className = "tab-menu";
    naviContainer.dataset.tabslug = this.tabName;
    naviContainer.innerHTML = `
      <span>${this.tabTitle}</span>
      <button class="tab-close-btn">
        <div class="icon size-s">
          <svg viewBox="0 0 16 16" >
            <path d="M1.46867 1.44328C1.8592 1.05276 2.49236 1.05276 2.88289 1.44328L8.17578 6.73618L13.4687 1.44328C13.8592 1.05276 14.4924 1.05276 14.8829 1.44328C15.2734 1.83381 15.2734 2.46697 14.8829 2.8575L9.58999 8.15039L14.8829 13.4433C15.2734 13.8338 15.2734 14.467 14.8829 14.8575C14.4924 15.248 13.8592 15.248 13.4687 14.8575L8.17578 9.5646L2.88289 14.8575C2.49236 15.248 1.8592 15.248 1.46867 14.8575C1.07815 14.467 1.07815 13.8338 1.46867 13.4433L6.76157 8.15039L1.46867 2.8575C1.07815 2.46697 1.07815 1.83381 1.46867 1.44328Z" fill="#898989"/>
          </svg>                    
        </div>
      </button>
    `

    naviContainer.querySelector(".tab-close-btn").addEventListener("click",(e)=>{
      e.stopPropagation();
      this.tabManager.closeTab(this.tabName)
    })

    naviContainer.addEventListener("click",(e)=>{
      this.tabManager.switchToTab(this.tabName);
    })
    return naviContainer;
  }

  createInfoElement() {
    const infoContainer = document.createElement("div");
    infoContainer.className = "tab-info";
    infoContainer.dataset.targetTab = this.tabName;
    infoContainer.innerHTML = `
    <div>
      <button class="refresh bg-grayscale-40 btn-m" id="refreshBtn">
        <div class="icon size-m3">
          <svg viewBox="0 0 24 24" class="fill-invert">
            <path d="M13.9154 0.962267C14.4012 0.699662 15.008 0.880644 15.2706 1.3665L18.2162 6.81626C18.3562 7.07541 18.3749 7.38313 18.2672 7.65732C18.1595 7.93151 17.9364 8.14426 17.6575 8.23882L11.988 10.1604C11.465 10.3377 10.8972 10.0574 10.72 9.53434C10.5427 9.01128 10.823 8.44354 11.346 8.26625L15.0971 6.99486C14.1713 6.54672 13.1325 6.2957 12.0342 6.2957C8.14607 6.2957 4.99414 9.44763 4.99414 13.3357C4.99414 17.2238 8.14607 20.3758 12.0342 20.3758C15.9223 20.3758 19.0742 17.2238 19.0742 13.3357C19.0742 12.7835 19.5219 12.3357 20.0742 12.3357C20.6265 12.3357 21.0742 12.7835 21.0742 13.3357C21.0742 18.3284 17.0269 22.3758 12.0342 22.3758C7.0415 22.3758 2.99414 18.3284 2.99414 13.3357C2.99414 8.34306 7.0415 4.2957 12.0342 4.2957C13.0046 4.2957 13.9397 4.44883 14.8163 4.73215L13.5111 2.31748C13.2485 1.83162 13.4295 1.22487 13.9154 0.962267Z"/>
          </svg>
        </div>
      </button>
      <h4>${this.tabTitle}</h4>
      <button class="tab-popup">
        <div class="icon size-l">
          <svg viewBox="0 0 24 24" class="fill-primary-middle">
            <path d="M7.90682 6.89343C7.90682 5.66704 8.901 4.67285 10.1274 4.67285H18.5141C19.7405 4.67285 20.7347 5.66704 20.7347 6.89343V15.2051C20.7347 16.4315 19.7405 17.4257 18.5141 17.4257H16.8794V16.0257H18.5141C18.9673 16.0257 19.3347 15.6583 19.3347 15.2051V6.89343C19.3347 6.44024 18.9673 6.07285 18.5141 6.07285H10.1274C9.6742 6.07285 9.30682 6.44024 9.30682 6.89343V7.86943H7.90682V6.89343ZM3.88281 10.9106C3.88281 9.6842 4.877 8.69001 6.10339 8.69001H13.8383C15.0647 8.69001 16.0589 9.6842 16.0589 10.9106V18.5807C16.0589 19.8071 15.0647 20.8013 13.8383 20.8013H6.10339C4.877 20.8013 3.88281 19.8071 3.88281 18.5807V10.9106ZM6.10339 10.09C5.6502 10.09 5.28281 10.4574 5.28281 10.9106V18.5807C5.28281 19.0339 5.6502 19.4013 6.10339 19.4013H13.8383C14.2915 19.4013 14.6589 19.0339 14.6589 18.5807V10.9106C14.6589 10.4574 14.2915 10.09 13.8383 10.09H6.10339Z" />
          </svg>
        </div>
      </button>
      <button class="tab-memo">
        <div class="icon size-l">
          <svg viewBox="0 0 24 24" class="fill-primary-middle">
            <path d="M5.83398 4.90684C5.83398 4.54785 6.125 4.25684 6.48398 4.25684H18.5165C18.8755 4.25684 19.1665 4.54785 19.1665 4.90684V16.0378C19.1665 16.2039 19.1029 16.3638 18.9887 16.4845L15.153 20.5394C15.0302 20.6692 14.8594 20.7428 14.6807 20.7428H6.48398C6.125 20.7428 5.83398 20.4517 5.83398 20.0927V4.90684ZM7.13398 5.55684V19.4427H14.0307V16.0378C14.0307 15.6788 14.3218 15.3878 14.6807 15.3878H17.8665V5.55684H7.13398ZM17.0069 16.6878H15.3307V18.4597L17.0069 16.6878ZM8.72364 8.02953C8.72364 7.67055 9.01466 7.37953 9.37364 7.37953H12.6988C13.0578 7.37953 13.3488 7.67055 13.3488 8.02953C13.3488 8.38852 13.0578 8.67953 12.6988 8.67953H9.37364C9.01466 8.67953 8.72364 8.38852 8.72364 8.02953ZM8.67676 10.8442C8.67676 10.4852 8.96777 10.1942 9.32676 10.1942H15.9771C16.3361 10.1942 16.6271 10.4852 16.6271 10.8442C16.6271 11.2032 16.3361 11.4942 15.9771 11.4942H9.32676C8.96777 11.4942 8.67676 11.2032 8.67676 10.8442ZM8.67676 13.6589C8.67676 13.2999 8.96777 13.0089 9.32676 13.0089H15.9771C16.3361 13.0089 16.6271 13.2999 16.6271 13.6589C16.6271 14.0179 16.3361 14.3089 15.9771 14.3089H9.32676C8.96777 14.3089 8.67676 14.0179 8.67676 13.6589ZM8.67676 16.4736C8.67676 16.1146 8.96777 15.8236 9.32676 15.8236H12.652C13.0109 15.8236 13.302 16.1146 13.302 16.4736C13.302 16.8326 13.0109 17.1236 12.652 17.1236H9.32676C8.96777 17.1236 8.67676 16.8326 8.67676 16.4736Z" />
          </svg>
        </div>
      </button>
      <button class="tab-star">
        <div class="icon size-l">
          <svg viewBox="0 0 24 24" class="fill-primary-middle">
            <path class="stroke-only" d="M11.6659 4.62081C11.7762 4.39879 12.0929 4.39879 12.2032 4.62081L14.3876 9.01725C14.4313 9.10517 14.5152 9.16615 14.6124 9.18053L19.4686 9.89943C19.7139 9.93573 19.8117 10.2369 19.6347 10.4105L16.1284 13.8465C16.0583 13.9152 16.0262 14.0139 16.0426 14.1107L16.8595 18.9514C16.9008 19.1959 16.6446 19.3821 16.4248 19.2673L12.0735 16.9944C11.9864 16.949 11.8827 16.949 11.7957 16.9944L7.44431 19.2673C7.22457 19.3821 6.96835 19.1959 7.0096 18.9514L7.82656 14.1107C7.84289 14.0139 7.81083 13.9152 7.74072 13.8465L4.23447 10.4105C4.05741 10.2369 4.15527 9.93573 4.40051 9.89943L9.25679 9.18053C9.3539 9.16615 9.43784 9.10517 9.48152 9.01725L11.6659 4.62081Z" stroke="none" fill="none"/>
            <path d="M11.5845 4.33198C11.9338 3.62892 12.9368 3.62892 13.2861 4.33198L15.3891 8.56469L20.0645 9.25682C20.8411 9.37179 21.151 10.3256 20.5903 10.8751L17.2147 14.1832L18.0012 18.8437C18.1318 19.6178 17.3205 20.2073 16.6246 19.8438L12.4353 17.6556L8.24597 19.8438C7.55012 20.2073 6.73874 19.6178 6.86939 18.8437L7.65592 14.1832L4.28024 10.8751C3.71954 10.3256 4.02946 9.37179 4.80605 9.25682L9.48148 8.56469L11.5845 4.33198ZM12.4353 5.54128L10.5643 9.30686C10.426 9.58527 10.1602 9.77838 9.85269 9.82391L5.69326 10.4397L8.69639 13.3827C8.91843 13.6002 9.01995 13.9127 8.96822 14.2193L8.26849 18.3654L11.9955 16.4187C12.271 16.2747 12.5996 16.2747 12.8751 16.4187L16.6021 18.3654L15.9024 14.2193C15.8506 13.9127 15.9522 13.6002 16.1742 13.3827L19.1773 10.4397L15.0179 9.82391C14.7104 9.77838 14.4446 9.58527 14.3062 9.30686L12.4353 5.54128Z"/>
          </svg>
        </div>
      </button>
      </div>
    <div class="tab-view-control">
      <button type="button" class="btn-quaternary" id="add_menu">
        <div class="icon icon-circle bg-view size-m2 ">
          <svg viewBox="0 0 12 12"><path d="M3.48848 0.489191C3.19558 0.782079 3.19557 1.25695 3.48846 1.54985L7.93935 6.00091L3.48847 10.4518C3.19558 10.7447 3.19558 11.2196 3.48847 11.5124C3.78136 11.8053 4.25624 11.8053 4.54913 11.5124L9.53033 6.53125C9.82322 6.23836 9.82322 5.76349 9.53034 5.4706L4.54914 0.489211C4.25625 0.196312 3.78138 0.196304 3.48848 0.489191Z" /></svg>
        </div>
        조회
      </button>
      <button type="button" class="btn-quaternary" id="add_menu">
        <div class="icon icon-circle bg-default size-m2 ">
          <svg viewBox="0 0 12 12"><path d="M3.48848 0.489191C3.19558 0.782079 3.19557 1.25695 3.48846 1.54985L7.93935 6.00091L3.48847 10.4518C3.19558 10.7447 3.19558 11.2196 3.48847 11.5124C3.78136 11.8053 4.25624 11.8053 4.54913 11.5124L9.53033 6.53125C9.82322 6.23836 9.82322 5.76349 9.53034 5.4706L4.54914 0.489211C4.25625 0.196312 3.78138 0.196304 3.48848 0.489191Z" /></svg>
        </div>
        인쇄
      </button>
      <button type="button" class="btn-quaternary" id="add_menu">
        <div class="icon icon-circle bg-new size-m2 ">
          <svg viewBox="0 0 12 12"><path d="M3.48848 0.489191C3.19558 0.782079 3.19557 1.25695 3.48846 1.54985L7.93935 6.00091L3.48847 10.4518C3.19558 10.7447 3.19558 11.2196 3.48847 11.5124C3.78136 11.8053 4.25624 11.8053 4.54913 11.5124L9.53033 6.53125C9.82322 6.23836 9.82322 5.76349 9.53034 5.4706L4.54914 0.489211C4.25625 0.196312 3.78138 0.196304 3.48848 0.489191Z" /></svg>
        </div>
        신규
      </button>
      <button type="button" class="btn-quaternary" id="add_menu">
        <div class="icon icon-circle bg-new size-m2 ">
          <svg viewBox="0 0 12 12"><path d="M3.48848 0.489191C3.19558 0.782079 3.19557 1.25695 3.48846 1.54985L7.93935 6.00091L3.48847 10.4518C3.19558 10.7447 3.19558 11.2196 3.48847 11.5124C3.78136 11.8053 4.25624 11.8053 4.54913 11.5124L9.53033 6.53125C9.82322 6.23836 9.82322 5.76349 9.53034 5.4706L4.54914 0.489211C4.25625 0.196312 3.78138 0.196304 3.48848 0.489191Z" /></svg>
        </div>
        수정
      </button>
      <button type="button" class="btn-quaternary" id="add_menu">
        <div class="icon icon-circle bg-warn size-m2 ">
          <svg viewBox="0 0 12 12"><path d="M3.48848 0.489191C3.19558 0.782079 3.19557 1.25695 3.48846 1.54985L7.93935 6.00091L3.48847 10.4518C3.19558 10.7447 3.19558 11.2196 3.48847 11.5124C3.78136 11.8053 4.25624 11.8053 4.54913 11.5124L9.53033 6.53125C9.82322 6.23836 9.82322 5.76349 9.53034 5.4706L4.54914 0.489211C4.25625 0.196312 3.78138 0.196304 3.48848 0.489191Z" /></svg>
        </div>
        저장
      </button>
      <button type="button" class="btn-quaternary" id="add_menu">
        <div class="icon icon-circle bg-error size-m2 ">
          <svg viewBox="0 0 12 12"><path d="M3.48848 0.489191C3.19558 0.782079 3.19557 1.25695 3.48846 1.54985L7.93935 6.00091L3.48847 10.4518C3.19558 10.7447 3.19558 11.2196 3.48847 11.5124C3.78136 11.8053 4.25624 11.8053 4.54913 11.5124L9.53033 6.53125C9.82322 6.23836 9.82322 5.76349 9.53034 5.4706L4.54914 0.489211C4.25625 0.196312 3.78138 0.196304 3.48848 0.489191Z" /></svg>
        </div>
        삭제
      </button>
    </div>
    `
    return infoContainer;
  }

  async createContentElement() {
    const tabContent = document.createElement("div");
    tabContent.className = "tab-wrapper";
    tabContent.dataset.tab = this.tabName;
    await getTab(tabContent);
    return tabContent;
  }

  refresh(){

  }

  popup(){
    openWindowPop(`/tab/${this.tabName}.html`, this.tabTitle)
  }

  memo(){
    
  }

  starred(){
    const starBtn = this.container.querySelector(".tab-star")
    if(starBtn.classList.contains("active")){
      // 즐겨찾기 해제 로직
      starBtn.classList.remove("active")
    }else{
      // 즐겨찾기 추가 로직
      starBtn.classList.add("active")
    }
  }

  async init() {
    this.tabInfo = this.createInfoElement();
    this.tabContent = await this.createContentElement();
    this.tabNavigator = this.createNaviElement();

    this.container.appendChild(this.tabInfo);
    this.container.appendChild(this.tabContent);
    this.container.dataset.tabslug=this.tabName;

    document.querySelector(".tab-holder").appendChild(this.container);
    document.querySelector(".tab-navigator .tab-menus").appendChild(this.tabNavigator);
    this.container.querySelector(".tab-popup").addEventListener("click", ()=>this.popup());
    this.container.querySelector(".tab-star").addEventListener("click", ()=>this.starred());
    this.container.querySelector(".tab-memo").addEventListener("click", ()=>this.memo());
    const inputs = this.container.querySelectorAll("input");
    if(inputs){
      inputs.forEach(input=>input.addEventListener("input",()=>{
        if(this.isEditing) return;
        this.isEditing = true;
        this.tabNavigator.classList.add("is-editing")
      }))
    }

    return this;
  }
}

class ModalManager {
  constructor(){
    this.activeModal = [];
    this.overlay = null;
    this.container = null;
    this.initialized = false;
  }

  drawContainer (slug) {
    this.overlay = document.createElement("div")
    this.overlay.className = `modal-overlay modal-${slug}`
    this.container = document.createElement("div");
    this.container.className = `modal-container modal modal-${slug}`
    this.container.dataset.modal = slug;

    this.overlay.addEventListener("click", () =>this.close());

    document.body.appendChild(this.overlay)
    document.body.appendChild(this.container)
  }

  openPopup(slug){
    openWindowPop(`/static/home/templates/modal/${slug}.html`);
    
  }

  async openModal(slug){
    this.drawContainer(slug);
    const contents =await getModal(this.container);
    contents.querySelector("#closeModal")?.addEventListener("click", () =>this.close());
    this.container.appendChild(contents);
  }

  alert(message){
    this.drawContainer('alert')
    return new Promise((resolve) => {
      const contents = document.createElement('div');
      contents.innerHTML =`
        <div class="modal-message-container">
          <p>${message}</p>
          <div class="flex-btn-row">
            <button class="btn-primary-l"  id="closeModal">확인</button>
          </div>
        </div>
      `
      contents.querySelector("#closeModal")?.addEventListener("click", () =>{
        resolve(true);
        this.close()

      });
      this.container.appendChild(contents);
    });
    
  }

  confirm(message) {
    this.drawContainer('confirm');
    return new Promise((resolve) => {
      const contents = document.createElement('div');
      contents.innerHTML = `
        <div class="modal-message-container">
          <p>${message}</p>
          <div class="flex-btn-row">
            <button class="btn-primary-l" id="confirm_confirm">확인</button>
            <button class="btn-secondary-l" id="confirm_cancel">취소</button>
          </div>
        </div>
      `;

      contents.querySelector("#confirm_confirm").addEventListener("click", () => {
        resolve(true);
        this.close();
        // customEvent
      });

      contents.querySelector("#confirm_cancel").addEventListener("click", () => {
        resolve(false);
        this.close();
      });

      this.overlay.addEventListener("click", () => {
        resolve(false);
        this.close();
      });

      this.container.appendChild(contents);
    });
  }


  close(){
    this.container.remove();
    this.overlay.remove();
  }
}

// 타이머
class Timer {
  constructor(selector, duration, callback) {
    this.selector = selector;
    this.duration = duration;
    this.timeLeft = duration;
    this.callback = callback;
    this.interval = null;
  }

  start() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateDisplay();
      } else {
        clearInterval(this.interval);
        if (this.callback) {
          this.callback();
        }
      }
    }, 1000);
  }

  reset() {
    this.timeLeft = this.duration;
    this.updateDisplay();
  }

  updateDisplay() {
    const displayElements = document.querySelectorAll(this.selector);
    displayElements.forEach(el => {
      el.textContent = this.formatTime(this.timeLeft);
    });
  }

  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }  
}

const globalTimer = new Timer('#authTimer', 10 * 60, () => {
  //시간 종료, 자동 로그아웃
});

class DraggableList {
  constructor(containerSelector, itemSelector) {
    this.container = document.querySelector(containerSelector);
    this.itemSelector = itemSelector;
    this.draggedItem = null;
    this.isDragging = false;
    this.isMouseDown = false; // 마우스 버튼이 눌려 있는지 여부를 추적
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.originalIndex = -1;
    this.init();
  }

  init() {
    this.container.addEventListener('mousedown', (e)=>this.handleMouseDown(e));
    document.addEventListener('mousemove', (e)=>this.handleMouseMove(e));
    document.addEventListener('mouseup', (e)=>this.handleMouseUp(e));
  }

  getItems(){
    return this.container.querySelectorAll(this.itemSelector);
  }

  removeItems(){
    this.container.querySelectorAll(this.itemSelector).forEach(item=>item.remove())
    return this.container.querySelectorAll(this.itemSelector);
  }
  
  handleMouseDown(e) {
    const listItem = e.target.closest(this.itemSelector);
    if (listItem) {
      this.originalIndex = Array.from(this.container.children).indexOf(listItem);

      const rect = listItem.getBoundingClientRect();
      this.offsetX = e.clientX - rect.left;
      this.offsetY = e.clientY - rect.top;

      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;

      this.draggedItem = listItem;
      this.isDragging = false;
      this.isMouseDown = true; // 마우스 버튼이 눌림
    }
  }

  handleMouseMove(e) {
    if (this.draggedItem && !this.isDragging && this.isMouseDown) {
      const dx = Math.abs(e.clientX - this.dragStartX);
      const dy = Math.abs(e.clientY - this.dragStartY);
      if (dx > 5 || dy > 5) {
        this.startDragging(e);
      }
    }

    if (this.isDragging) {
      const x = e.clientX - this.offsetX;
      const y = e.clientY - this.offsetY;
      this.draggedItem.style.left = `${x}px`;
      this.draggedItem.style.top = `${y}px`;

      let potentialIndex = this.findClosestIndex(e.clientX, e.clientY, this.draggedItem.offsetWidth, this.draggedItem.offsetHeight);
      if (potentialIndex === this.originalIndex) {
        potentialIndex = -1;
      }
      const dragDirection = this.getDragDirection(e);
      this.adjustSpacing(potentialIndex, dragDirection);
    }
  }

  handleMouseUp(e) {
    if (this.draggedItem && this.isDragging) {
      this.finishDragging(e);
    }
    this.isMouseDown = false; // 마우스 버튼이 떼짐
  }

  getDragDirection(e) {
    const dx = Math.abs(e.clientX - this.dragStartX);
    const dy = Math.abs(e.clientY - this.dragStartY);
    return dy > dx ? 'vertical' : 'horizontal';
  }

  startDragging(e) {
    const rect = this.draggedItem.getBoundingClientRect();
    this.draggedItem.classList.add('dragging');
    this.draggedItem.style.position = 'absolute';
    this.draggedItem.style.left = `${rect.left}px`;
    this.draggedItem.style.top = `${rect.top}px`;
    this.draggedItem.style.width = `${rect.width}px`;
    this.draggedItem.style.zIndex = '1000';
    document.body.appendChild(this.draggedItem);

    this.isDragging = true;
    this.adjustSpacing(-1);
  }

  finishDragging(e) {
    this.isDragging = false;
    let dropIndex = this.findClosestIndex(e.clientX, e.clientY, this.draggedItem.offsetWidth, this.draggedItem.offsetHeight);

    if (dropIndex !== -1) {
      if (dropIndex > this.originalIndex) {
        dropIndex--;
      }
      this.container.insertBefore(this.draggedItem, this.container.children[dropIndex]);
    } else {
      this.container.insertBefore(this.draggedItem, this.container.children[this.originalIndex]);
    }

    this.resetDraggedItem();
    this.adjustSpacing(-1);
  }


  resetDraggedItem() {
    if (this.draggedItem) {
      this.draggedItem.classList.remove('dragging');
      this.draggedItem.style.position = '';
      this.draggedItem.style.top = '';
      this.draggedItem.style.left = '';
      this.draggedItem.style.width = '';
      this.draggedItem.style.zIndex = '';
      this.draggedItem = null;
    }
  }

  adjustSpacing(potentialIndex, dragDirection) {
    Array.from(this.container.children).forEach((item, index) => {
      item.style.marginBottom = ''; // Reset bottom margin
      item.style.marginRight = ''; // Reset right margin
  
      if (index === potentialIndex) {
        if (dragDirection === 'vertical') {
          item.style.marginBottom = '40px'; // Add bottom margin for vertical drag
        } else {
          item.style.marginRight = '40px'; // Add right margin for horizontal drag
        }
      }
    });
  }
  

  findClosestIndex(mouseX, mouseY, draggedWidth, draggedHeight) {
    const listItems = Array.from(this.container.querySelectorAll(this.itemSelector + ':not(.dragging)'));
    return listItems.findIndex((item, index) => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const itemCenterY = rect.top + rect.height / 2;
      const inHorizontalRange = mouseX - draggedWidth / 2 < itemCenterX;
      const inVerticalRange = mouseY - draggedHeight / 2 < itemCenterY;
      return inHorizontalRange && inVerticalRange;
    });
  }
}


class CrossContainerDraggableList {
  constructor(containerSelector, itemSelector) {

    this.containers = document.querySelectorAll(containerSelector);
    this.itemSelector = itemSelector;
    this.draggedItem = null;
    this.isDragging = false;
    this.isMouseDown = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.originalContainer = null;
    this.originalIndex = -1;
    this.init();
  }

  init() {
    this.containers.forEach(container => {
      container.addEventListener('mousedown', this.handleMouseDown.bind(this));
    });
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  handleMouseDown(e) {
    const listItem = e.target.closest(this.itemSelector);
    if (listItem) {
      this.originalContainer = listItem.parentElement;
      this.originalIndex = Array.from(this.originalContainer.children).indexOf(listItem);

      const rect = listItem.getBoundingClientRect();
      this.offsetX = e.clientX - rect.left;
      this.offsetY = e.clientY - rect.top;

      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;

      this.draggedItem = listItem;
      this.isDragging = false;
      this.isMouseDown = true;
    }
  }

  handleMouseMove(e) {
    if (this.draggedItem && !this.isDragging && this.isMouseDown) {
      const dx = Math.abs(e.clientX - this.dragStartX);
      const dy = Math.abs(e.clientY - this.dragStartY);
      if (dx > 5 || dy > 5) {
        this.startDragging(e);
      }
    }

    if (this.isDragging) {
      this.moveItem(e);
    }
  }

  handleMouseUp(e) {
    if (this.isDragging) {
      this.finishDragging(e);
      this.isDragging = false;
    }
    this.isMouseDown = false;
  
    this.resetDraggedItem();
  }
  getDragDirection(e) {
    const dx = Math.abs(e.clientX - this.dragStartX);
    const dy = Math.abs(e.clientY - this.dragStartY);
    return dy > dx ? 'vertical' : 'horizontal';
  }

  startDragging(e) {
    this.placeholder = document.createElement('div');
    this.placeholder.classList.add('placeholder');
    this.placeholder.style.height = `${this.draggedItem.offsetHeight}px`;
  
    this.originalContainer.insertBefore(this.placeholder, this.draggedItem.nextSibling);
  
    const rect = this.draggedItem.getBoundingClientRect();
    this.draggedItem.classList.add('dragging');
    this.draggedItem.style.position = 'absolute';
    this.draggedItem.style.left = `${rect.left}px`;
    this.draggedItem.style.top = `${rect.top}px`;
    this.draggedItem.style.width = `${rect.width}px`;
    this.draggedItem.style.zIndex = '1000';
    document.body.appendChild(this.draggedItem);
  
    this.isDragging = true;
  
    this.adjustSpacingForContainer(this.originalContainer);
  }
  

  moveItem(e) {
    if (!this.draggedItem) return;

    const x = e.clientX - this.offsetX;
    const y = e.clientY - this.offsetY;
    this.draggedItem.style.left = `${x}px`;
    this.draggedItem.style.top = `${y}px`;
  
    const currentContainer = this.determineContainer(e.clientX, e.clientY);
    if (currentContainer && this.placeholder.parentNode !== currentContainer) {
      this.adjustSpacingForContainer(currentContainer);
    }
  }

  finishDragging(e) {
    this.isDragging = false;
  
    const dropContainer = this.determineContainer(e.clientX, e.clientY);
  
    if (dropContainer && dropContainer !== this.originalContainer) {
      this.moveItemToContainer(this.draggedItem, dropContainer);
    } else if (!dropContainer || dropContainer === this.originalContainer) {
      this.originalContainer.insertBefore(this.draggedItem, this.originalIndex >= 0 ? this.originalContainer.children[this.originalIndex] : null);
    }
  
    this.resetDraggedItem();
  }
  

  determineContainer(x, y) {
    return Array.from(this.containers).find(container => {
      const rect = container.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    });
  }

  adjustSpacingForContainer(container) {
    if (!container) return;

    document.querySelectorAll('.placeholder').forEach(placeholder => {
      placeholder.remove();
    });

    
    const placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');
    container.appendChild(placeholder);

    
    placeholder.style.height = `${this.draggedItem.offsetHeight}px`;

    
    const closestIndex = this.findClosestIndexWithinContainer(this.draggedItem.getBoundingClientRect(), container);
    if (closestIndex !== -1) {
      
      container.insertBefore(placeholder, container.children[closestIndex]);
    } else {
      
      container.appendChild(placeholder);
    }
  }

  moveItemToContainer(item, container) {
    
    if (item.parentNode) {
      item.parentNode.removeChild(item);
    }
  
    const placeholder = container.querySelector('.placeholder');
    if (placeholder) {
      container.insertBefore(item, placeholder);
      placeholder.remove(); 
    } else {
      
      container.appendChild(item);
    }
  
    
    this.originalContainer = container;
    this.originalIndex = Array.from(container.children).indexOf(item);
  }
  findClosestIndexWithinContainer(itemRect, container) {
    const containerRect = container.getBoundingClientRect();
    const centerY = itemRect.top + itemRect.height / 2 - containerRect.top;
    let closestIndex = -1;
    let closestDistance = Number.MAX_VALUE;

    Array.from(container.children).forEach((child, index) => {
      if (!child.classList.contains(this.itemSelector.replace('.', ''))) {
        return;
      }

      const childRect = child.getBoundingClientRect();
      const childCenterY = childRect.top + childRect.height / 2 - containerRect.top;
      const distance = Math.abs(centerY - childCenterY);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    
    if (closestIndex !== -1) {
      const lastChildRect = container.children[container.children.length - 1].getBoundingClientRect();
      if (centerY > lastChildRect.top + lastChildRect.height / 2 - containerRect.top) {
        closestIndex = -1; 
      }
    }

    return closestIndex;
  }


  resetDraggedItem() {
    

    document.querySelectorAll('.placeholder').forEach(placeholder => {
      placeholder.remove();
    });
  
    if (this.draggedItem) {
  
      if (this.draggedItem && !this.draggedItem.parentNode) {
        this.originalContainer.appendChild(this.draggedItem);
      }
      
      this.draggedItem.classList.remove('dragging');
      this.draggedItem.style.position = '';
      this.draggedItem.style.top = '';
      this.draggedItem.style.left = '';
      this.draggedItem.style.width = '';
      this.draggedItem.style.zIndex = '';
      this.draggedItem = null;
    }
  

    this.isDragging = false;
    this.isMouseDown = false;
  }
  
}


const loadLottieIcon = () => {
  document.querySelectorAll("[data-icon]").forEach(iconElement=>{
    const anim = lottie.loadAnimation({
      container: iconElement,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: animationData[iconElement.dataset.icon], // the animation data
    });
  
    anim.goToAndStop(29, true)
    
    const handleMouseEnter = () =>{
      anim.playSegments([0, 29], true)
      
    }
  
    const handleMouseLeave = () => {
      anim.goToAndStop(0, true)
    }
    iconElement.parentElement.addEventListener("mouseenter",handleMouseEnter);
    iconElement.parentElement.addEventListener("mouseleave",handleMouseLeave);
  })
}

class Pagination {
  constructor(container, data, itemsPerPage, renderCallback) {
    this.container = container;
    this.data = data;
    this.itemsPerPage = itemsPerPage;
    this.renderCallback = renderCallback;
    this.currentPage = 1;
    this.render();
  }

 
  // 페이지네이션 컨트롤 렌더링
  // 페이지네이션 컨트롤 렌더링
  renderPaginationControls() {
    const pageCount = Math.ceil(this.data.length / this.itemsPerPage);
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-controls';

    // 이전 버튼 추가
    const prevButton = this.createNavigationButton('<', () => this.changePage(-1));
    paginationContainer.appendChild(prevButton);

    // 페이지 번호 버튼 추가
    this.createPageNumberButtons(paginationContainer, pageCount);

    // 다음 버튼 추가
    const nextButton = this.createNavigationButton('>', () => this.changePage(1));
    paginationContainer.appendChild(nextButton);

    this.container.innerHTML = '';
    this.container.appendChild(paginationContainer);
    this.updateActiveButton(); // 활성화된 버튼 업데이트
  }


  createPageNumberButtons(container, pageCount) {
    for (let i = 1; i <= pageCount; i++) {
      const pageButton = this.createButton(i, this.currentPage === i, () => {
        this.currentPage = i;
        this.renderPage();
      });
      container.appendChild(pageButton);
    }
  }
  
  createNavigationButton(text, onClick) {
    const button = document.createElement('button');
    button.innerHTML = text === '<' ? 
    `<svg width="12" height="12" viewBox="0 0 12 12"><path d="M8.51152 0.489191C8.80442 0.782079 8.80443 1.25695 8.51154 1.54985L4.06065 6.00091L8.51153 10.4518C8.80442 10.7447 8.80442 11.2196 8.51153 11.5124C8.21864 11.8053 7.74376 11.8053 7.45087 11.5124L2.46967 6.53125C2.17678 6.23836 2.17678 5.76349 2.46966 5.4706L7.45086 0.489211C7.74375 0.196312 8.21862 0.196304 8.51152 0.489191Z" fill="white"/></svg>`
    :`<svg width="12" height="12" viewBox="0 0 12 12"><path d="M3.48848 0.489191C3.19558 0.782079 3.19557 1.25695 3.48846 1.54985L7.93935 6.00091L3.48847 10.4518C3.19558 10.7447 3.19558 11.2196 3.48847 11.5124C3.78136 11.8053 4.25624 11.8053 4.54913 11.5124L9.53033 6.53125C9.82322 6.23836 9.82322 5.76349 9.53034 5.4706L4.54914 0.489211C4.25625 0.196312 3.78138 0.196304 3.48848 0.489191Z" fill="white"/></svg>`;
    button.addEventListener('click', onClick);
    if ((text === '<' && this.currentPage === 1) || (text === '>' && this.currentPage === Math.ceil(this.data.length / this.itemsPerPage))) {
      button.disabled = true;
    }
    return button;
  }

  // 이전/다음 페이지 이동
  changePage(step) {
    const newPage = this.currentPage + step;
    if (newPage >= 1 && newPage <= Math.ceil(this.data.length / this.itemsPerPage)) {
      this.currentPage = newPage;
      this.renderPage();
    }
  }

  // 버튼 생성 함수
  createButton(text, isActive, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.toggle('active', isActive);
    button.addEventListener('click', onClick);
    return button;
  }

  // 활성화된 버튼 업데이트
  updateActiveButton() {
    const buttons = this.container.querySelectorAll('.pagination-controls button');
    buttons.forEach((button, index) => {
      if (index === this.currentPage) { // 현재 페이지에 해당하는 버튼에 'active' 클래스 적용
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }

  // 현재 페이지 데이터 가져오기
  getCurrentPageData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end);
  }

  // 페이지 데이터 렌더링
  renderPage() {
    const currentPageData = this.getCurrentPageData();
    this.renderCallback(currentPageData);
    this.updateActiveButton();
  }

  // 초기 렌더링
  render() {
    this.renderPaginationControls();
    this.renderPage();
  }
}


class Accordion {
  constructor(container, data) {
    this.container = container;
    this.data = data;
    this.render();
  }

  // 아코디언 생성
  render() {
    this.container.innerHTML = '';
    this.data.forEach((item,index) => {
      const itemContainer = document.createElement('div');
      itemContainer.className = 'accordion-item';

      const title = document.createElement('div');
      title.className = 'accordion-title';
      title.innerHTML = `
        <span class="order">${index + 1}</span>
        <span class="category">${faqType.filter(type=>type.id==item.category)[0]?.title}</span>
        <span class="title">${item.title}</span>
        <div class="icon size-m2 fold-icon">
          <svg viewBox="0 0 16 17">
          <path  d="M1.32009 5.69975C1.64601 5.32445 2.21445 5.28442 2.58974 5.61033L7.99962 10.3084L13.4095 5.61033C13.7848 5.28442 14.3532 5.32445 14.6792 5.69975C15.0051 6.07504 14.965 6.64348 14.5897 6.96939L8.58974 12.1799C8.25124 12.4739 7.748 12.4739 7.40951 12.1799L1.4095 6.96939C1.03421 6.64348 0.99418 6.07504 1.32009 5.69975Z" fill="#898989"/>
          </svg>
        </div>
      `;
      title.addEventListener('click', () => this.toggleItem(itemContainer));

      const content = document.createElement('div');
      content.className = 'accordion-content';
      content.id = item.id;
      content.innerHTML = item.contents.replace(/\n/g, '<br>');

      itemContainer.appendChild(title);
      itemContainer.appendChild(content);
      this.container.appendChild(itemContainer);
    });
  }

  // 아코디언 토글
  toggleItem(itemContainer) {
    itemContainer.classList.toggle("active")
    // const allContents = this.container.querySelectorAll('.accordion-content');
    // allContents.forEach(content => {
    //   if (content.id === id) {
    //     content.style.display = content.style.display === 'none' ? 'block' : 'none';
    //   } else {
    //     content.style.display = 'none';
    //   }
    // });
  }
}

class PostList {
  constructor(container, postData, itemsPerPage) {
    this.container = container;
    this.paginationContainer = this.container.querySelector(".pagination-container")
    this.postData = postData;
    this.itemsPerPage = itemsPerPage;
    this.pagination = new Pagination(
      this.paginationContainer,
      this.postData,
      this.itemsPerPage,
      this.renderPosts.bind(this)
    );
  }

  // 게시물 목록 렌더링
  renderPosts(posts) {
    const postsList = document.createElement('ul');
    postsList.className = 'posts-list';

    posts = [{
      index:'순번',
      title:'제목',
      contents:'내용',
      category:'분류',
      author:'작성자',
      publishedAt:'작성시간'
    },... posts]
    posts.forEach((post, index) => {
      const postItem = document.createElement('li');
      postItem.className = 'post-item';

      postItem.innerHTML = `
        <div class='post-item--checkbox'>
          <input type="checkbox" name="postEditList" id="post-item--${post.index}">
        </div>
        <div class='post-item--index'>${post.index}</div>
        <div class='post-item--title'><a href="">${post.title}</a></div>
        <div class='post-item--contents'><a href="">${post.contents}</a></div>
        <div class='post-item--category'>${index == 0 ? post.category : findItemWithSlug([...hideMenu, ...nav_data, ...topNav_data], post.category)?.title}</div>
        <div class='post-item--author'>${post.author}</div>
        <div class='post-item--datetime'>${post.publishedAt}</div>
      `
      postsList.appendChild(postItem);
    });

    // 기존 게시물 목록이 있다면 삭제
    const existingPostsList = this.container.querySelector('.posts-list');
    if (existingPostsList) {
      this.container.removeChild(existingPostsList);
    }

    // 새 게시물 목록 추가
    this.container.appendChild(postsList);
  }
}
class MasterCheckbox {
  constructor(masterCheckboxElement, childCheckboxesSelector) {
    this.masterCheckbox = masterCheckboxElement;
    this.childCheckboxes = Array.from(masterCheckboxElement.closest('.checkbox-group').querySelectorAll(childCheckboxesSelector));

    // 중간 마스터 체크박스들 찾기
    this.subMasterCheckboxes = this.childCheckboxes.filter(cb => cb.classList.contains('master-checkbox'));

    // 마스터 체크박스 이벤트 리스너 설정
    this.masterCheckbox.addEventListener('change', () => {
      this.toggleChildCheckboxes();
    });

    // 각 자식 체크박스에 대한 이벤트 리스너 설정
    this.childCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        this.updateMasterCheckbox();
        this.updateSubMasterCheckboxes();
      });
    });
  }

  toggleChildCheckboxes() {
    const isChecked = this.masterCheckbox.checked;
    // Only toggle the state of enabled child checkboxes
    this.childCheckboxes.forEach(checkbox => {
      if (!checkbox.disabled) {
        checkbox.checked = isChecked;
      }
    });
  
    // Ensure sub-master checkboxes are not in an indeterminate state if they are disabled
    this.subMasterCheckboxes.forEach(subMaster => {
      if (!subMaster.disabled) {
        subMaster.indeterminate = false;
      }
    });
  }

  updateSubMasterCheckboxes() {
    this.subMasterCheckboxes.forEach(subMaster => {
      // Only consider enabled checkboxes when updating sub-master checkboxes
      const childCheckboxes = Array.from(subMaster.closest('.checkbox-group').querySelectorAll('.child-checkbox')).filter(cb => !cb.disabled);
  
      const allChecked = childCheckboxes.length > 0 && childCheckboxes.every(checkbox => checkbox.checked);
      const noneChecked = childCheckboxes.length > 0 && childCheckboxes.every(checkbox => !checkbox.checked);
  
      if (allChecked) {
        subMaster.checked = true;
        subMaster.indeterminate = false;
      } else if (noneChecked) {
        subMaster.checked = false;
        subMaster.indeterminate = false;
      } else if (childCheckboxes.length) {
        subMaster.indeterminate = true;
      }
    });
  }

  updateSubMasterCheckboxes() {
    this.subMasterCheckboxes.forEach(subMaster => {
      const childCheckboxes = Array.from(subMaster.closest('.checkbox-group').querySelectorAll('.child-checkbox'));
      const allChecked = childCheckboxes.every(checkbox => checkbox.checked);
      const noneChecked = childCheckboxes.every(checkbox => !checkbox.checked);

      if (allChecked) {
        subMaster.checked = true;
        subMaster.indeterminate = false;
      } else if (noneChecked) {
        subMaster.checked = false;
        subMaster.indeterminate = false;
      } else {
        subMaster.indeterminate = true;
      }
    });
  }
}

class TransferFormManager {
  constructor(addButton, removeButton, sourceList, targetList) {
    this.addButton = addButton;
    this.removeButton = removeButton;
    this.sourceList = sourceList;
    this.targetList = targetList;

    this.initialize();
  }

  initialize() {
    this.addButton.addEventListener('click', () => {
      this.sourceList.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        if (!checkbox.classList.contains('master-checkbox')) {
          this.addItemToTargetList(checkbox);
        }
      });
    });

    this.removeButton.addEventListener('click', () => {
      this.targetList.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
        this.removeItemFromTargetList(checkbox);
      });
    });
  }

  addItemToTargetList(checkbox) {
    const label = checkbox.closest('label');
    const clonedLabel = label.cloneNode(true);
    const clonedCheckbox = clonedLabel.querySelector('input[type="checkbox"]');

    clonedCheckbox.name = 'targetListCheckbox';
    clonedCheckbox.checked = false;
    const uniqueId = `target-${Math.random().toString(36).substr(2, 9)}`;
    clonedCheckbox.id = uniqueId; 
    clonedLabel.setAttribute('for', uniqueId); 

    this.targetList.appendChild(clonedLabel);
    label.classList.add('active');
    label.querySelector("input[type=checkbox]").checked=false;
    label.querySelector("input[type=checkbox]").disabled=true;
  }

  removeItemFromTargetList(checkbox) {
    const label = checkbox.closest('label');
    const checkboxValue = checkbox.value;

    const sourceCheckbox = Array.from(this.sourceList.querySelectorAll('input[type="checkbox"]'))
      .find(input => input.value === checkboxValue)?.closest('label');
    
    if (sourceCheckbox) {
      sourceCheckbox.classList.remove('active');
      sourceCheckbox.querySelector("input[type=checkbox]").disabled=false;
    }

    label.remove();
  }
}



