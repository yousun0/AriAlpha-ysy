if(isPopup()){
  document.querySelectorAll("input").forEach((input)=>{
    input.addEventListener("input", (e) => {
      const targetClasslist = window.opener.document.documentElement.classList;
      const befTheme = [... targetClasslist].find(t=>t.includes('theme'));
      if(befTheme) targetClasslist.remove(befTheme)
      window.opener.document.documentElement.classList.add(`theme_${input.id}`)
    })
  })
}