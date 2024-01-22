class WorkflowmenuSetting {
  constructor(container){
    this.container = container
    this.form = this.container.querySelector("form");
    this.init();
  }

  async processMenuItems(menuItems) {
    const elements = []; // 생성된 요소들을 저장할 배열
  
    for (const menuItem of menuItems) {
      const li = document.createElement("li");
      li.className ='checkbox-group'
      switch (menuItem.type) {
        case 'main':
          li.innerHTML = `
            <label for="${menuItem.title}" class="label--input-flex">
              <input type="checkbox"  class="master-checkbox" id="${menuItem.title}" name="groupmenuItem" value="${menuItem.title}">
              <p>${menuItem.title}</p>
            </label>
          `;
  
          if (menuItem.children) {
            const ul = document.createElement("ul");
            ul.className = 'checkbox-group';
            const childElements = await this.processMenuItems(menuItem.children);
            childElements.forEach(childElement => ul.appendChild(childElement));
            li.appendChild(ul); // innerHTML 대신 appendChild 사용
          }
  
          li.querySelectorAll('.master-checkbox').forEach(masterCheckbox => {
            new MasterCheckbox(masterCheckbox, '.child-checkbox');
          });
          break;
  
        case 'submenu-title':
          li.innerHTML = `
            <label for="${menuItem.title}" class="label--input-flex">
              <input type="checkbox"  class="master-checkbox" id="${menuItem.title}" value="${menuItem.title}">
              <p>${menuItem.title}</p>
            </label>
          `
          if (menuItem.children) {
            const ul = document.createElement("ul");
            ul.className = 'checkbox-group';
            const childElements = await this.processMenuItems(menuItem.children);
            childElements.forEach(childElement => ul.appendChild(childElement));
            li.appendChild(ul); // innerHTML 대신 appendChild를 사용
          }
          break;
  
        case 'submenu':
          li.innerHTML = `
          <label for="${menuItem.title}" class="label--input-flex">
            <input type="checkbox"  class="child-checkbox" id="${menuItem.title}" name="groupmenuItem" value="${menuItem.title}">
            <p>${menuItem.title}</p>
          </label>
          `
  
          break;
      }
  
      elements.push(li); // 배열에 요소 추가
    }
  
    return elements; // 배열 반환
  };
  

  async drawMenu(){
    const elements = await this.processMenuItems(nav_data);
    const nav = this.container.querySelector("#source_container");
    
    elements.forEach(el => {
      nav.appendChild(el);
    })
  }


  handleFormSubmit(e){
    e.preventDefault();
  }

  init(){
    this.drawMenu()
    const addButton = this.container.querySelector("#add_menu");
    const removeButton = this.container.querySelector("#remove_menu");
    const sourceList = this.container.querySelector("#source_container");
    const targetList = this.container.querySelector("#target_container");
    
    const transferManager = new TransferFormManager(addButton, removeButton, sourceList, targetList);
    this.form.addEventListener("submit",(e)=>this.handleFormSubmit(e));
    const ListDraggable = new DraggableList('#target_container', "#target_container label");
  }

  
}


window.registerModuleInit('workflowmenu-setting', (element) => {
  const gs = new WorkflowmenuSetting(element)

});

if(isPopup) {
  new WorkflowmenuSetting(document.querySelector(".workflowmenu-setting"));
}