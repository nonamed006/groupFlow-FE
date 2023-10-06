import { PORT } from "set";

export const getEmpList = () => {
    fetch(`${PORT}/menu/?searchTypeCd=MUA0002`, { method: 'GET' })
        .then((response) => response.json())
        .then((responseJson) => console.log(responseJson));
}