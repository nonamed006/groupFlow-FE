import { PORT } from "set";
import corp from "./corp/CorpApi";
import roleGrp from "./roleGrp/RoleGrpApi";
import roleMenu from "./roleMenu/RoleMenuApi";
import roleCorp from "./roleCorp/RoleCorpApi";
import depGrp from "./depGrp/DepGrpApi";
import { getCookie } from "common/common";

const header = {
    'Content-Type': "application/json; charset=utf-8",
    'Authorization': getCookie("Authorization")
}

export const getPromise = async ({url, method, body}) => {
    return await fetch(`${PORT}/${url}`, { method: method, body: body && body, headers: header, credentials: 'include'}) 
    .then((response) => response.json())
    .then((responseJson) => responseJson);
}

const api ={
    corp,
    roleGrp,
    roleMenu,
    roleCorp,
    depGrp
};

export default api;
