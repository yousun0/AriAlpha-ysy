const handleGlobalFontSize = (e) => {
  document.documentElement.style.setProperty('--global-font-size', `${e.target.value}px`)
}
document.querySelector("#globalFontSize").addEventListener("input", handleGlobalFontSize)