// global login step
let loginStep = 0;
const loginFullStep = document.querySelectorAll("[data-step]").length - 1; //스텝이 총 몇 개인지 (0부터 시작) 

//DB에서 해당 계정의 인증 실패 횟수를 받아와서 업데이트.
let authNum = 0;

// user인지 확인 로직
const isUser = async () => {
  // 폼 데이터를 FormData 객체로 생성
  let loginForm = document.getElementById("loginForm");
  let formData = new FormData(loginForm);

  try{
    const response = await axios.post(loginForm.action, formData);
    return response.data;
  } catch(error){
    console.log(error);
    return null;
  }

  // return null
  //또는 null
}

const processAuth = async() => {
  //인증번호 확인 로직

  //await

  return true
  // return false
  // 또는 false
}

const stepManager = (dir) => {
  // dir: 1 또는 -1
  if(loginStep == 0 && dir < 0) return;
  if(loginStep == loginFullStep && dir > 0) return;
  document.querySelector(`[data-step-index="${loginStep}"]`).classList.remove("active");

  loginStep += dir;
  document.querySelector(`[data-step-index="${loginStep}"]`).classList.add("active");

  // success화면 표시 후 setTimeout -> submit

}

const handleNextStep = async(step) => {
  // step없을 경우 다음 함수를 실행하지 않음
  if(!step) return;
  
  switch(step){
    case 'login' : 
      // 로그인 스텝일 경우
      // 아이디 비밀번호 확인 로직 -> isUser
      const userInfo = await isUser();
      if(userInfo) {
        // 다음 스텝으로
        stepManager(1);
        
        const globalTimer = new Timer('#leftAuthTime', 3 * 60, () => {
          console.log('타이머 종료!');
        });
        globalTimer.start();
        document.querySelector("#extendTime").addEventListener("click",()=>globalTimer.reset());
        
      }else {
        // 로그인이 일치하지 않음 경고문구
        new ModalManager().alert("일치하는 사용자 정보가 없습니다.")
      }
      break;
    case 'auth' :
      // 인증 스텝일경우
      const userAuth = await processAuth();
      if(userAuth) {
        // 인증 토큰 -> 허브로
        stepManager(1);

        // 로티 불러오기
        const anim = lottie.loadAnimation({
          container: document.querySelector('#successLottie'),
          renderer: 'svg',
          loop: false,
          autoplay: true,
          animationData: animationData.loginSuccess, // the animation data
        });

        const timer = setTimeout(()=>{
          window.location.href="/hub/"
        },1500)

      }else{
        authNum ++;
        if(authNum > 2){
          //인증제한
          new ModalManager().alert("인증번호 횟수가 초과되었습니다. 관리자에게 문의해주세요.");
          return;
        }
        new ModalManager().alert("인증번호가 일치하지 않습니다.")
      }
      break;
  }

}

(()=>{
  const loginForm = $("#loginForm");
  const nextStepBtns = document.querySelectorAll(".btn-form-next");
  console.log(nextStepBtns)

  /**
   * 로그인 / 확인(인증번호) : '.btn-form-next'를 가지고 있는 버튼
   * 해당 버튼을 눌렀을 때 다음 스텝(인증화면 또는 허브 화면)으로 진입할 수 있게 해주는 로직
   * 버튼의 가장 가까운 부모 step의 dataset.step으로 어떤 스텝인지 확인
   */
  nextStepBtns.forEach((btn)=>btn.addEventListener("click",()=>handleNextStep(btn.closest("[data-step]")?.dataset.step)));
  

  loginForm.addEventListener("submit", (e) => {
    // 휴대폰 인증번호 확인 로직...

    
    e.preventDefault();
    //window.location.href="hub.html"
  })

})()