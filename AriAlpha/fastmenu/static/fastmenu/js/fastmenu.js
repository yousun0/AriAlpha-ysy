const drawSideMenu = () => {
  sideMenu_data.forEach(menu=>{
    const button = document.createElement("button");
    button.className = 'btn-m btn-icon';
    button.innerHTML = `
    <div class="icon-circle ">
      ${fillIcon[menu.icon]}
      </div>
    </div>
    <a class="sp2" href="/tab/${menu.slug}.html" data-tab-trigger="${menu.slug}">
      ${menu.title}
    </a>
    `

    $(".sidemenu-menu1").appendChild(button);
  })
}
drawSideMenu();
document.querySelector(".right-sidebar .fold-btn").addEventListener("click", handleFoldControl)