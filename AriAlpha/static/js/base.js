const protocol = window.location.protocol; // 'http:' or 'https:'
const hostname = window.location.hostname; // '127.0.0.1' or your domain
const port = window.location.port;         // '8000' or ''

var basePath;


const dbName = 'GridDataDB';
const storeName = 'GridDataStore';

if (hostname === "127.0.0.1" || hostname === "localhost") {
  // For development environment
  basePath = `${protocol}//${hostname}:${port}`;
} else {
  // For production environment
  basePath = `${protocol}//203.235.27.210`;
}


// js 파일을 동적으로 로드하는 함수
function loadJSDynamically(screen_id){
    return new Promise((resolve, reject) => {
        // 이미 띄워져있는 메뉴 눌러지면 아무것도 안함
    var existingScript = document.getElementById('dynamic_js');
    if(existingScript && existingScript.name === screen_id){
        return;
    }

    //axios로 요청하여 js 파일 명을 가져와서 script src에 추가한다
    axios.get(basePath + "/" + screen_id + "/get_js_file_name",)
        .then(function(response){
        var js_file_name = response.data.js_file_name;
        var script = document.createElement('script');
        script.src = "/static/" + js_file_name;

        loadJSAndRemovePreviousJS();

        script.id = "dynamic_js";
        script.name = screen_id;
        document.head.appendChild(script);

        script.onload = function() {
            console.log("loadJSAndRemovePreviousJS");
            getHTML_active_screen(screen_id);
            resolve();
        };
    });

    }).catch(function(error){
        console.log(error);
        reject(error);
    });
}

// js 파일을 불러 온 뒤, 이전에 동적 로드된 js 파일을 삭제한다.
function loadJSAndRemovePreviousJS(){
    // 이전에 동적으로 로드된 js 파일을 삭제한다.
    var previous_script = document.querySelector('#dynamic_js');
    if(previous_script != null){
        previous_script.remove();
    }
}

// get_html을 호출한다.
function getHTML_active_screen(screen_id){
    get_html(screen_id);
}
// get_parameter를 호출한다.
function getParameter_active_screen(){
    //각 소메뉴의 js에 있는 함수
    get_parameter();
}

// get_data를 호출한다.
function getData_active_screen(){
    //각 소메뉴의 js에 있는 함수
    get_data();
}

function initIndexedDB() {
  return new Promise((resolve, reject) => {
    // 데이터베이스 열기
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      console.error('IndexedDB initialization error:', event.target.error);
      reject(event.target.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      // 객체 저장소 생성
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };
  });
}

// 기타 필요 로직들 추가