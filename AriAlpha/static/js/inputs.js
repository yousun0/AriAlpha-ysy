class InputCheck{
  constructor(options){
    this.options=options;
    this.title = options.title
    this.id = options.id
    this.name = options.name ?? options.id
    this.className=options.className
    this.container = null;
    this.input = null;

    this.init();
  }

  init(){
    this.container = document.createElement("label")
    this.container.className=`label--input-flex ${this.className ?? this.className}`
    this.container.htmlFor=this.id;

    const title = this.title ? document.createElement("p") : null;
    if(title) title.textContent = this.title

    this.input = document.createElement("input")
    this.input.type=this.options.type=='radio' ? 'radio' : 'checkbox'
    this.input.id=this.id
    this.input.value = this.id
    this.input.name=this.name
    this.input.checked = this.options.checked;
    this.input.disabled = this.options.disabled;

    this.input.disabled = this.options.disabled;

    this.container.appendChild(this.input)
    if(title) this.container.appendChild(title)
    
    return this.container;
  }
}

class InputText{
  constructor(options){
    this.options= options
    this.title = options.title
    this.id = options.id
    this.name = options.name ?? options.id
    this.className=options.className
    this.container = null;
    this.input = null;
    this.placeholder = options.placeholder;

    this.init();    
    if(options.numberOnly) this.numberEvent()
  }

  numberEvent(){
    // // 숫자가 아닌 문자를 제거
    this.input.addEventListener("input",()=>{
      this.input.value = this.input.value.replace(/[^0-9]/g, '');
      
    })
  }

  init(){
    this.container = document.createElement("label")
    this.container.className=`label--input-flex ${this.className ?? this.className}`
    this.container.htmlFor=this.id;

    const title = this.title ? document.createElement("p") : null;
    if(title) title.textContent = this.title

    this.input = document.createElement("input")
    this.input.type='text'
    this.input.classList.add("pd-xxxs")
    this.input.id=this.id
    this.input.name=this.name
    this.input.placeholder = this.placeholder;
    this.input.disabled = this.options.disabled;
    this.input.value = this.options.value;

    if(title) this.container.appendChild(title)
    this.container.appendChild(this.input)
    
    return this.container;
  }
}

class SelectOptions{
  constructor(options){
    this.title = options.title
    this.id = options.id
    this.name = options.name ?? options.id
    this.container = null;
    this.input = null;
    this.list = options.list ?? []
    this.className = options.className

    this.init()
  }

  init(){
    this.container = document.createElement("label")
    this.container.className=`label--input-flex ${this.className ?? this.className}`
    this.container.htmlFor=this.id;

    const title = this.title ? document.createElement("p") : null;
    if(title) title.textContent = this.title

    this.input = document.createElement("select")
    this.input.id=this.id
    this.input.name=this.name

    this.list.forEach(li=>{
      const option = document.createElement("option")
      option.innerHTML=li
      this.input.appendChild(option)
    })

    if(title) this.container.appendChild(title)
    this.container.appendChild(this.input)
    
    return this.container;
  }
}

class InputMonth{
  constructor(options){
    this.today = new Date();
    this.title = options.title
    this.id = options.id
    this.name = options.name ?? options.id
    this.container = null;
    this.input = null;
    this.showHelper = options.showHelper === false ? false : true;
    this.date = new Date(this.today.getFullYear(), this.today.getMonth(), 1);

    this.init();
  }

  setMonth(){
    this.input.value = `${this.date.getFullYear()}-${String(this.date.getMonth()+1).padStart(2, '0')}`;
  }

  next(){
    this.date = new Date(this.date.setMonth(this.date.getMonth()+1));
    this.setMonth();
  }

  prev(){
    this.date = new Date(this.date.setMonth(this.date.getMonth()-1));
    this.setMonth();
  }
  

  init(){
    this.container = document.createElement("label")
    this.container.className='label--input-flex'
    this.container.htmlFor=this.id;

    const title = this.title ? document.createElement("p") : null;
    if(title) title.textContent = this.title

    const prevBtn = document.createElement("button")
    prevBtn.innerHTML=`
    <div class="icon icon-circle bg-primary-middle size-m2 ">
      <svg viewBox="0 0 12 12"><path d="M8.51152 0.489191C8.80442 0.782079 8.80443 1.25695 8.51154 1.54985L4.06065 6.00091L8.51153 10.4518C8.80442 10.7447 8.80442 11.2196 8.51153 11.5124C8.21864 11.8053 7.74376 11.8053 7.45087 11.5124L2.46967 6.53125C2.17678 6.23836 2.17678 5.76349 2.46966 5.4706L7.45086 0.489211C7.74375 0.196312 8.21862 0.196304 8.51152 0.489191Z" fill="white"/></svg>
    </div>
    `

    this.input = document.createElement("input")
    this.input.type="month"
    this.input.id=this.id
    this.input.name=this.name
    
    const nextBtn = document.createElement("button")
    nextBtn.innerHTML = `
    <div class="icon icon-circle bg-primary-middle size-m2 ">
      <svg viewBox="0 0 12 12"><path d="M3.48848 0.489191C3.19558 0.782079 3.19557 1.25695 3.48846 1.54985L7.93935 6.00091L3.48847 10.4518C3.19558 10.7447 3.19558 11.2196 3.48847 11.5124C3.78136 11.8053 4.25624 11.8053 4.54913 11.5124L9.53033 6.53125C9.82322 6.23836 9.82322 5.76349 9.53034 5.4706L4.54914 0.489211C4.25625 0.196312 3.78138 0.196304 3.48848 0.489191Z" fill="white"/></svg>
    </div>
    `

    prevBtn.addEventListener("click",()=>this.prev());
    nextBtn.addEventListener("click",()=>this.next());

    if(title) this.container.appendChild(title)

    if(this.showHelper) this.container.appendChild(prevBtn)
    this.container.appendChild(this.input)
    if(this.showHelper) this.container.appendChild(nextBtn)

    this.setMonth();

    return this.container;
  }
}

class InputDate{
  constructor(options){
    this.today = new Date();
    this.title = options.title
    this.id = options.id
    this.name = options.name ?? options.id
    this.container = null;
    this.input = null;
    this.showHelper = options.showHelper === false ? false : true;
    this.date = new Date();

    this.init();
  }

  setDate(){
    this.input.value = `${this.date.getFullYear()}-${String(this.date.getMonth()+1).padStart(2, '0')}-${String(this.date.getDate()).padStart(2, '0')}`;
  }

  next(){
    this.date = new Date(this.date.setDate(this.date.getDate()+1));
    this.setDate();
  }

  prev(){
    this.date = new Date(this.date.setDate(this.date.getDate()-1));
    this.setDate();
  }
  

  init(){
    this.container = document.createElement("label")
    this.container.className='label--input-flex'
    this.container.htmlFor=this.id;

    const title = this.title ? document.createElement("p") : null;
    if(title) title.textContent = this.title

    const prevBtn = document.createElement("button")
    prevBtn.innerHTML=`
    <div class="icon icon-circle bg-primary-middle size-m2 ">
      <svg viewBox="0 0 12 12"><path d="M8.51152 0.489191C8.80442 0.782079 8.80443 1.25695 8.51154 1.54985L4.06065 6.00091L8.51153 10.4518C8.80442 10.7447 8.80442 11.2196 8.51153 11.5124C8.21864 11.8053 7.74376 11.8053 7.45087 11.5124L2.46967 6.53125C2.17678 6.23836 2.17678 5.76349 2.46966 5.4706L7.45086 0.489211C7.74375 0.196312 8.21862 0.196304 8.51152 0.489191Z" fill="white"/></svg>
    </div>
    `

    this.input = document.createElement("input")
    this.input.type="date"
    this.input.id=this.id
    this.input.name=this.name
    
    const nextBtn = document.createElement("button")
    nextBtn.innerHTML = `
    <div class="icon icon-circle bg-primary-middle size-m2 ">
      <svg viewBox="0 0 12 12"><path d="M3.48848 0.489191C3.19558 0.782079 3.19557 1.25695 3.48846 1.54985L7.93935 6.00091L3.48847 10.4518C3.19558 10.7447 3.19558 11.2196 3.48847 11.5124C3.78136 11.8053 4.25624 11.8053 4.54913 11.5124L9.53033 6.53125C9.82322 6.23836 9.82322 5.76349 9.53034 5.4706L4.54914 0.489211C4.25625 0.196312 3.78138 0.196304 3.48848 0.489191Z" fill="white"/></svg>
    </div>
    `

    prevBtn.addEventListener("click",()=>this.prev());
    nextBtn.addEventListener("click",()=>this.next());

    if(title) this.container.appendChild(title)

    if(this.showHelper) this.container.appendChild(prevBtn)
    this.container.appendChild(this.input)
    if(this.showHelper) this.container.appendChild(nextBtn)

    this.setDate();

    return this.container;
  }
}