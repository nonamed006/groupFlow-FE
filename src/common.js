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
    