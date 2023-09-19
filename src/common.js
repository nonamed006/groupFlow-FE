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