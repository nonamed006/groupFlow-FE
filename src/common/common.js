// db에서 받아온 날짜에서 시간 제외하고 출력
export const minTimeDate = (date) =>{
    if(date != null){
        let str = date.split(" ");
        return str[0];
    }
}

// 데이터 input에 세팅
export const setInput = (inputForm, data) => {
    let form = document.forms[inputForm];
    for(let i=0; i<form.length; i++){
        let frNm = form[i].name;
        if(frNm != ""){
            form.elements[frNm].value = data[frNm];
        }
    }
}

// 타임스탬프 yyyy-mm-ddT00:00:00.000+00:00 -> 날짜 yyyy-mm-dd 형식으로 변환
export const formatDate = (date) => {  
    let originalDate = new Date(date);
    let year = originalDate.getFullYear();
    let month = String(originalDate.getMonth() + 1).padStart(2, '0'); 
    let day = String(originalDate.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
}


//쿠키 set
export const setCookie = (cookie_name, value, time) => {
    var exdate = new Date();
    exdate.setDate(exdate.getTime() + time);
    // 설정 일수만큼 현재시간에 만료값으로 지정
  
    var cookie_value = escape(value) + ((time == null) ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
    //httpOnly 설정
    document.cookie = cookie_name + "; httpOnly";
  }

//쿠키 get
export const getCookie = (cookie_name) => {
    var x, y;
    var val = document.cookie.split(';');
  
    for (var i = 0; i < val.length; i++) {
      x = val[i].substr(0, val[i].indexOf('='));
      y = val[i].substr(val[i].indexOf('=') + 1);
      x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
      if (x == cookie_name) {
        return unescape(y); // unescape로 디코딩 후 값 리턴
      }
    }
}

//쿠키 삭제
export const deleteCookie = (cookie_name) => {
    document.cookie = cookie_name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}
    