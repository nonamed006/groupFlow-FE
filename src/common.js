// db에서 받아온 날짜에서 시간 빼고 출력
export const minTimeDate = (date) =>{
    if(date != null){
        let str = date.split(" ");
        return str[0];
    }
}