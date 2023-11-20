import { PORT } from "set";
import corp from "./corp/CorpApi";
import dep from "./dep/DepApi";
import roleGrp from "./roleGrp/RoleGrpApi";
import roleMenu from "./roleMenu/RoleMenuApi";
import roleCorp from "./roleCorp/RoleCorpApi";
import depGrp from "./depGrp/DepGrpApi";
import { getCookie } from "common/common";
import roleEmp from "./roleEmp/RoleEmpApi";
import menu from "./menu/MenuApi";
import role from "./role/RoleApi";
import roleDep from "./roleDep/RoleDepApi";
// const header = {
//   "Content-Type": "application/json; charset=utf-8",
//   Authorization: getCookie("Authorization"),
// };

export const getPromise = async ({ url, method, headers, body }) => {
  if (!headers) {
    // header 받아온거 없으면 기본 application/json
    headers = {
      "Content-Type": "application/json; charset=utf-8",
    };
  }
  headers["Authorization"] = getCookie("Authorization");

  return await fetch(`${PORT}/${url}`, {
    method: method,
    body: body && body,
    headers: headers,
    credentials: "include",
  })
    .then((response) => response.json())
    .then((responseJson) => responseJson);
};

//return await fetch(`${PORT}/${url}`, {
//  method: method,
//  body: body && body,
//  headers: headers,
//  credentials: "include",
//})
//  .then((response) => response.json())
//  .then((responseJson) => {
//    if (responseJson.status !== 200) {
//      throw new Error(responseJson.resultMsg);
//    } else {
//      return responseJson;
//    }
//  })
//  .catch((error) => {
//    return error.message;
//    console.log(error);
//  });
//};

const api = {
  corp,
  roleGrp,
  roleMenu,
  roleCorp,
  depGrp,
  roleEmp,
  dep,
  menu,
  role,
  roleDep
};

export default api;
