import { PORT } from "set";
import corp from "./corp/CorpApi";
import roleGrp from "./roleGrp/RoleGrpApi";
import roleMenu from "./roleMenu/RoleMenuApi";
import roleCorp from "./roleCorp/RoleCorpApi";

export const getPromise = async ({url, method, body, header}) => {
    return await fetch(`${PORT}/${url}`, { method: method, body: body && body, headers: header && header})
    .then((response) => response.json())
    .then((responseJson) => responseJson);
}

const api ={
    corp,
    roleGrp,
    roleMenu,
    roleCorp
};

export default api;
