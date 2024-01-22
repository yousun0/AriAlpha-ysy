import {make_search_box_event} from '/static/core/js/common.js';
import {async_test1} from './async_test1_component.js';
import {gridOptions} from "./async_test1_grid.js";

let gridDiv;

export function get_html(screen_id) {
    if (exist_component_data(screen_id)) {
        get_html_from_component(screen_id);
    } else {
        get_html_from_server(screen_id);
    }
}

function get_html_from_server(screen_id) {
    // axios로 요청하여 js 파일 명을 가져와서 script src에 추가한다
    axios.get(`${basePath}/${screen_id}/get_html`)
        .then(response => {
            const webcomponent_id = screen_id.replace(/\//g, '-').toLowerCase();
            const component = document.querySelector(webcomponent_id);
            const html = response.data;
            document.getElementById("main").innerHTML = html;
            component.setHTML(html);
            activeScreenId = screen_id;
            gridDiv = document.querySelector('#myGrid');

            // Promise.all을 사용하여 두 비동기 작업이 모두 완료될 때까지 기다립니다.
            return Promise.all([make_grid(screen_id, 'server'), make_search_box_event()]);
        })
        .then(() => {
            get_data_from_server(screen_id)
                .then(() => {
                    const webcomponent_id = screen_id.replace(/\//g, '-').toLowerCase();
                    const component = document.querySelector(webcomponent_id);
                    get_data_from_component(screen_id, component);
                });
            return Promise.resolve();
        })
        .catch(error => {
            console.log(error)
        });
}

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

function exist_component_data(screen_id) {
    const webcomponent_id = screen_id.replace(/\//g, '-').toLowerCase();

    // 컴포넌트가 없으면 만들기
    if (!customElements.get(webcomponent_id) && document.querySelector(webcomponent_id) == null) {
        // 컴포넌트가 없으면 만들기
        customElements.define(webcomponent_id, async_test1); // 웹 컴포넌트를 정의합니다.
        const test1Element = new async_test1(); // 웹 컴포넌트의 인스턴스를 생성합니다.
        // customElements.define(webcomponent_id, test1);
        // // 커스텀 엘리먼트 인스턴스 생성 및 문서에 추가
        // const test1Element = new test1();
        document.body.appendChild(test1Element);
        return false;
    }
    // 컴포넌트가 있는데 html이 없으면 false, 있으면 true
    else return document.querySelector(webcomponent_id).html !== "";
}

function make_grid() {
    return new Promise((resolve, reject) => {
        // 그리드 이전 남아있는 그리드 틀 삭제 (보이는 부분만 랜더링 되어있는 문제)
        gridDiv.innerHTML = "";

        new agGrid.Grid(gridDiv, gridOptions);
        make_grid_event();
        resolve();
    });
}

function make_grid_event() {
    document.addEventListener('click', function (event) {
        if (!gridDiv.contains(event.target)) {
            gridOptions.api.stopEditing(); // 편집 중인 셀의 포커스를 해제
        }
    });
}

function get_data_from_server(screen_id) {
    return new Promise((resolve, reject) => {
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
                const webcomponent_id = screen_id.replace(/\//g, '-').toLowerCase();
                const component = document.querySelector(webcomponent_id);
                const data = response.data.data;
                component.setGridData(0, data, 0, 0);
                console.log("1번 완료");
                resolve();  // axios의 응답이 완료되면 Promise를 resolve합니다.
            })
            .catch(error => {
                console.log(error);
                reject(error);  // 에러가 발생하면 Promise를 reject합니다.
            });
    });
}

function scroll_position(webcomponent) {
    const [verticalScrollPosition, horizontalScrollPosition] = webcomponent.scrollPositions[0];
    const rowIndex = Math.floor(verticalScrollPosition / gridOptions.rowHeight);

    // 컬럼 Width에 따라 컬럼 위치 계산
    const columnState = gridOptions.columnApi.getColumnState();
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
    if (screen_id !== activeScreenId) return;
    gridOptions.api.showLoadingOverlay();
    if (!webcomponent.status) {
        console.log("아직 데이터가 들어와있지 않음");
        setTimeout(() => {
            get_data_from_component(screen_id, webcomponent);
        }, 100);
        return;
    }
    const data = webcomponent.gridData[0];
    gridOptions.api.setRowData(data);
    gridOptions.api.hideOverlay();
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