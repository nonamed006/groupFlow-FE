import { PORT } from "set";

export const getEmpList = () => {
    fetch(`${PORT}/emp/getEmp`, { method: 'GET' })
        .then((response) => response.json())
        .then((responseJson) => console.log(responseJson));
}