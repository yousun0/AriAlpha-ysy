
// tabShowBtn
// tabAllCloseBtn

(async () => {
  const tabPromises = [... document.querySelectorAll("[data-tab]")].map(el => getTab(el));
  const modulePromises = [... document.querySelectorAll("[data-module]")].map(el => getModule(el));

  await Promise.all([...tabPromises, ...modulePromises]);
	
	window.tabManager = new TabManager();
	const modalManager = new ModalManager();

	document.addEventListener("click", function(e) {
		if (e.target.matches("[data-tab-trigger]") || e.target.closest("[data-tab-trigger]")) {
			e.preventDefault();
			if(window.tabManager.block) return;
			const tabSlug = e.target.dataset.tabTrigger || e.target.closest("[data-tab-trigger]").dataset.tabTrigger;
			const targetData = findItemWithSlug([...hideMenu, ...nav_data, ...topNav_data], tabSlug);
			const tabData = { slug: tabSlug, title: targetData.title };
			
			const closetPop = e.target.closest("[data-tab-type='popup']");

			if(isPopup() || (closetPop && closetPop.dataset.tabType==='popup')){
				openWindowPop(closetPop.href, targetData.title)
			}else{
				window.tabManager.openTab(tabData);
			}
			if(e.target.closest(".is-open"))e.target.closest(".is-open").classList.remove("is-open");
			
		}else if(e.target.matches("[data-modal-trigger]") || e.target.closest("[data-modal-trigger]")){
			e.preventDefault();
			const modalSlug = e.target.dataset.modalTrigger || e.target.closest("[data-modal-trigger]").dataset.modalTrigger;
			if(isPopup() || e.target.dataset.modalType==='popup'){
				modalManager.openPopup(modalSlug)
			}else{
				modalManager.openModal(modalSlug);
			}
		}
	});

	document.querySelector(".logo-row").addEventListener("click",()=>{
		window.tabManager.openTab({slug:'dashboard', title:'대시보드'})
	})
	loadLottieIcon();
	
	// window.addEventListener("beforeunload",()=>{
	// 	if(!confirm("정말 이 페이지를 벗어나시겠어요?")) return;
	// })
})();


// window.onbeforeunload = function() {
//   return false;
// };