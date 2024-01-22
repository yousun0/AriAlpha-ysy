// 종료될때 component diconnect
export function make_search_box_event() {
    return new Promise((resolve, reject) => {
        document.querySelectorAll('select').forEach((selectElement) => {
            selectElement.addEventListener('change', changed_select);
        });
        document.querySelectorAll('input[type=checkbox]').forEach((checkElement) => {
            checkElement.addEventListener('change', changed_check);
        });
        document.querySelectorAll('input[type=text]').forEach((textBoxElement) => {
            textBoxElement.addEventListener('input', changed_textbox);
        });
        resolve();
    });
}

export function clear_component(screen_id){
    const webcomponent_id = screen_id.replace(/\//g, '-').toLowerCase();
    const component = document.querySelector(webcomponent_id);
    component.disconnect();
}
// 콤보박스 변경 시 DOM에 변경 반영
export function changed_select(event){
    const selectElement = event.target;

    // 모든 <option> 요소들에서 'selected' 속성을 제거합니다.
    Array.from(selectElement.options).forEach(option => {
        option.removeAttribute('selected');
    });

    // 현재 선택된 <option>에 'selected' 속성을 추가합니다.
    selectElement.options[selectElement.selectedIndex].setAttribute('selected', 'selected');
}
// 체크박스 변경 시 DOM에 변경 반영
 export function changed_check(event){
    const checkElement = event.target;

    // 체크박스의 상태를 변경합니다.
    if (checkElement.checked) {
        checkElement.setAttribute('checked', '');
    } else {
        checkElement.removeAttribute('checked');
    }
}
// 텍스트박스 변경 시 DOM에 변경 반영
export function changed_textbox(event){
    const textBoxElement = event.target;
    // 텍스트박스 value를 바뀐 text로 바꾼다
    textBoxElement.setAttribute('value', event.target.value);
}
