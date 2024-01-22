// component_test_main.js
import {test1} from './component_test1.js'
import {test2} from './component_test2.js';
import {test3} from './component_test3.js';
import {test4} from './component_test4.js';
import {test5} from './component_test5.js';
import {test6} from './component_test6.js';
import {test7} from './component_test7.js';
import {test8} from './component_test8.js';
import {test9} from './component_test9.js';
import {test10} from './component_test10.js';
import {test11} from './component_test11.js';
import {test12} from './component_test12.js';
import {test13} from './component_test13.js';
import {test14} from './component_test14.js';
import {test15} from './component_test15.js';
import {test16} from './component_test16.js';
import {test17} from './component_test17.js';
import {test18} from './component_test18.js';
import {test19} from './component_test19.js';
import {test20} from './component_test20.js';
import {test21} from './component_test21.js';
import {test22} from './component_test22.js';
import {test23} from './component_test23.js';
import {test24} from './component_test24.js';
import {test25} from './component_test25.js';
import {test26} from './component_test26.js';
import {test27} from './component_test27.js';
import {test28} from './component_test28.js';
import {test29} from './component_test29.js';
import {test30} from './component_test30.js';
import {test31} from './component_test31.js';
import {test32} from './component_test32.js';
import {test33} from './component_test33.js';
import {test34} from './component_test34.js';
import {test35} from './component_test35.js';
import {test36} from './component_test36.js';
import {test37} from './component_test37.js';
import {test38} from './component_test38.js';
import {test39} from './component_test39.js';
import {test40} from './component_test40.js';
import {test41} from './component_test41.js';
import {test42} from './component_test42.js';
import {test43} from './component_test43.js';
import {test44} from './component_test44.js';
import {test45} from './component_test45.js';
import {test46} from './component_test46.js';
import {test47} from './component_test47.js';
import {test48} from './component_test48.js';
import {test49} from './component_test49.js';
import {test50} from './component_test50.js';
import {gridOptions} from './component_test_grid.js';
import {changed_check, changed_select, changed_textbox} from '/static/Core/js/common.js';

const components = {
    test1: test1,
    test2: test2,
    test3: test3,
    test4: test4,
    test5: test5,
    test6: test6,
    test7: test7,
    test8: test8,
    test9: test9,
    test10: test10,
    test11: test11,
    test12: test12,
    test13: test13,
    test14: test14,
    test15: test15,
    test16: test16,
    test17: test17,
    test18: test18,
    test19: test19,
    test20: test20,
    test21: test21,
    test22: test22,
    test23: test23,
    test24: test24,
    test25: test25,
    test26: test26,
    test27: test27,
    test28: test28,
    test29: test29,
    test30: test30,
    test31: test31,
    test32: test32,
    test33: test33,
    test34: test34,
    test35: test35,
    test36: test36,
    test37: test37,
    test38: test38,
    test39: test39,
    test40: test40,
    test41: test41,
    test42: test42,
    test43: test43,
    test44: test44,
    test45: test45,
    test46: test46,
    test47: test47,
    test48: test48,
    test49: test49,
    test50: test50,
};
// 그리드 갯수만큼 div 생성
let gridDiv;

// 외부에서 접근 가능한 get_html
export function get_html(screen_id) {
    if (exist_component_data(screen_id)) {
        get_html_from_component(screen_id);
    } else {
        get_html_from_server(screen_id);
    }
}

// 서버로부터 html을 가져온다
function get_html_from_server(screen_id) {
    // axios로 요청하여 js 파일 명을 가져와서 script src에 추가한다
    axios.get(`${basePath}/${screen_id}/get_html`)
        .then(response => {
            const html = response.data;
            document.getElementById("main").innerHTML = html;
            activeScreenId = screen_id;
            gridDiv = document.querySelector('#myGrid');

            // Promise.all을 사용하여 두 비동기 작업이 모두 완료될 때까지 기다립니다.
            return Promise.all([make_grid(screen_id, 'server'), make_search_box_event()]);
        })
        .then(() => {
            get_data_from_server(screen_id);
        })
        .catch(error => {
            console.log(error)
        });
}

// 조회조건 영역 이벤트 리스너 추가
function make_search_box_event() {
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

// 컴포넌트로부터 html을 가져온다
function get_html_from_component(screen_id) {
    const webcomponent_id = screen_id.replace(/\//g, '-').toLowerCase();
    const component = document.querySelector(webcomponent_id);
    document.getElementById("main").innerHTML = component.html;
    activeScreenId = screen_id;
    gridDiv = document.querySelector('#myGrid');
    // Promise.all을 사용하여 두 비동기 작업이 모두 완료될 때까지 기다린다.
    return Promise.all([make_grid(screen_id, 'component'), make_search_box_event()])
        .then(() => {
            get_data_from_component(screen_id, component);
        });
}

// 컴포넌트가 있는지 확인
function exist_component_data(screen_id) {
    const webcomponent_id = screen_id.replace(/\//g, '-').toLowerCase();

    // 컴포넌트가 없으면 만들기
    if (!customElements.get(webcomponent_id) && document.querySelector(webcomponent_id) == null) {
        // 컴포넌트가 없으면 만들기
        let componentId = webcomponent_id.split('-')[1]; // "test1"부터 "test10"까지의 문자열을 얻습니다.
        let component = components[componentId]; // 해당 컴포넌트를 찾습니다.
        customElements.define(webcomponent_id, component); // 웹 컴포넌트를 정의합니다.
        const test1Element = new component(); // 웹 컴포넌트의 인스턴스를 생성합니다.
        // customElements.define(webcomponent_id, test1);
        // // 커스텀 엘리먼트 인스턴스 생성 및 문서에 추가
        // const test1Element = new test1();
        document.body.appendChild(test1Element);
        return false;
    }
    // 컴포넌트가 있는데 html이 없으면 false, 있으면 true
    else return document.querySelector(webcomponent_id).html !== "";
}

// 그리드 생성
function make_grid(screen_id, data_location) {
    return new Promise((resolve, reject) => {
        // 그리드 이전 남아있는 그리드 틀 삭제 (보이는 부분만 랜더링 되어있는 문제)
        gridDiv.innerHTML = "";

        new agGrid.Grid(gridDiv, gridOptions);
        make_grid_event();
        resolve();
    });
}

// 그리드 밖에서 관여되는 그리드 이벤트
function make_grid_event() {
    document.addEventListener('click', function (event) {
        if (!gridDiv.contains(event.target)) {
            gridOptions.api.stopEditing(); // 편집 중인 셀의 포커스를 해제
        }
    });
}

// 서버로부터 get_data
function get_data_from_server(screen_id) {
    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    axios.post(`${basePath}/${screen_id}/get_data`, {
        "dancode": "9999",
        "yyyymm": "202012"
    }, {
        headers: {
            'X-CSRFToken': csrfToken,
        }
    })
        .then(response => {
            const data = response.data.data;
            // ag grid data 바인딩
            //gridOptions.api.setRowData(data);
            gridOptions.api.setRowData(data);
            console.log(data);
            console.log("data from server");
        })
        .catch(error => {
            console.log(error);
        });
}

// 그리드 및 스크롤 바 원위치로 이동
function scroll_position(webcomponent) {
    const [verticalScrollPosition, horizontalScrollPosition] = webcomponent.scrollPositions[0];
    const rowIndex = Math.floor(verticalScrollPosition / gridOptions.rowHeight);

    // 컬럼 Width에 따라 컬럼 위치 계산
    const columnState = gridOptions.columnApi.getColumnState();
    console.log(columnState);
    let accumulatedWidth = 0;
    let columnIndex = 0;

    for (let i = 0; i < columnState.length; i++) {
        accumulatedWidth += columnState[i].width;
        if (horizontalScrollPosition < accumulatedWidth) {
            columnIndex = i;
            break;
        }
    }

    // 스크롤 위치 컬럼, 로우로 변경 이동
    gridOptions.api.ensureIndexVisible(rowIndex, 'top');
    gridOptions.api.ensureColumnVisible(columnState[columnIndex].colId, 'start');
    let scrollElement_h = document.querySelector('.ag-body-vertical-scroll-viewport');
    let scrollElement_w = document.querySelector('.ag-body-horizontal-scroll-viewport');
    setTimeout(() => {
        // 수직 스크롤 위치 설정
        scrollElement_h.scrollTop = verticalScrollPosition;
        // 수평 스크롤 위치 설정
        scrollElement_w.scrollLeft = horizontalScrollPosition;
    }, 1);

}

// 컴포넌트로부터 get_data
function get_data_from_component(screen_id, webcomponent) {

    const data = webcomponent.gridData[0];
    gridOptions.api.setRowData(data);
    webcomponent.gridData = [];
    scroll_position(webcomponent);
    //gridDiv.scrollLeft = horizontalScrollPosition;
    console.log("data from component");

}

// 외부에서 접근 가능한 다른 탭으로 이동할때 (화면 전환될때) 데이터 컴포넌트에 저장
export function save_data_to_component(screen_id) {
    // Get the web component
    const webcomponent_id = screen_id.replace(/\//g, '-').toLowerCase();
    const component = document.querySelector(webcomponent_id);

    // Save the innerHTML to the web component's html variable
    const html = document.getElementById("main").innerHTML;
    component.setHTML(html);

    let allData = [];
    gridOptions.api.forEachNode(function (rowNode, index) {
        allData.push(rowNode.data);
    });
    const verticalScrollPosition = gridOptions.api.getVerticalPixelRange().top;
    const horizontalScrollPosition = gridOptions.api.getHorizontalPixelRange().left;
    console.log("위 : " + verticalScrollPosition + " / 왼쪽 : " + horizontalScrollPosition)
    component.setGridData(0, allData, verticalScrollPosition, horizontalScrollPosition);


}

// DB에 데이터 저장
function save_data_to_db(screen_id) {


}

//저장할때 컴포넌트 초기화
function initial_exist_component(screen_id) {

    const webcomponent_id = screen_id.replace(/\//g, '-').toLowerCase();

    // Find the existing web component and remove it
    const existingComponent = document.querySelector(webcomponent_id);
    if (existingComponent) {
        existingComponent.remove();
    }

    // Define a new web component and add it to the document
    customElements.define(webcomponent_id, test1);
    const test1Element = new test1();
    document.body.appendChild(test1Element);


}

// 콤보박스 변경 시 DOM에 변경 반영

// 종료될때 외부에서 접근 가능한 함수
export function clear_click(screen_id) {

}

