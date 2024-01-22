document.addEventListener("DOMContentLoaded", function () {
    // document.querySelectorAll('.tab_menu').forEach(tab => {
    //     tab.addEventListener('click', event => {
    //         const screen_id = event.target.getAttribute('id');
    //         onTabClick(screen_id);
    //     });
    // });
    document.querySelectorAll('button').forEach(tab => {
        tab.addEventListener('click', event => {
            const screen_id = event.target.getAttribute('id');
            onTabClick(screen_id);
        });
    });
});
let importedModule = null;
let activeScreenId = null;

function clearClick(active_screen_id) {
    if (active_screen_id == null) return;
    if (importedModule) {
        importedModule.save_data_to_component(active_screen_id);
    }
    activeScreenId = null;
    // document.getElementById("main").innerHTML = "";
}

function onTabClick(screen_id) {
    if (activeScreenId === screen_id) return;
    clearClick(activeScreenId);
    console.log(activeScreenId + " " + screen_id);

    axios.get(`${basePath}/${screen_id}/get_js_file_name`,)
        .then(response => {
            const js_file_name = response.data.js_file_name;
            return import("/static/" + js_file_name);
        })
        .then(module => {
            importedModule = module;
            console.log(screen_id);
            module.get_html(screen_id);
        })
        .catch(error => {
            console.log(error);
        });
}
