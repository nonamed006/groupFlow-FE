import { PORT } from "set";
import corp from "./corp/CorpApi";
import roleGrp from "./roleGrp/RoleGrpApi";
import roleMenu from "./roleMenu/RoleMenuApi";

export const getPromise = async ({url, method, body, header}) => {
    return await fetch(`${PORT}/${url}`, { method: method, body: body && body, headers: header && header})
    .then((response) => response.json())
    .then((responseJson) => responseJson);
}

const api ={
    corp,
    roleGrp,
    roleMenu
};

export default api;
