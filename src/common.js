// db에서 받아온 날짜에서 시간 제외하고 출력
export const minTimeDate = (date) =>{
    if(date != null){
        let str = date.split(" ");
        return str[0];
    }
}

// 데이터 input에 세팅
export const setInput = (inputForm, data) => {
    console.log(data);
    let form = document.forms[inputForm];
    console.log("formformform",form);
    for(let i=0; i<form.length; i++){
        let frNm = form[0].name;
        form.elements[frNm].value = data[frNm];
    }
}