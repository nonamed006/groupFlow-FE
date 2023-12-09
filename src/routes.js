import React, { useEffect, useMemo, useState } from "react";

import { Icon, Image } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdCreate,
  MdOutlineShoppingCart,
  MdPhonelinkSetup,
  MdOutlinePersonOutline,
  MdDvr,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Corporation from "views/admin/corporation";
import Department from "views/admin/department";
import Employee from "views/admin/employee";
// Auth Imports
import LogInCentered from "views/auth/login";
import Menu from "views/system/menu";
import RoleGroup from "views/system/roleGroup";
import RoleSet from "views/system/role";
import HomePage from "views/system/home";
import Approval from "views/system/approval";
import Hr from "views/system/humanResources";
import Accounting from "views/system/accounting";
import Executives from "views/system/executives";
import api from "api/Fetch";
import { PORT } from "set";

import MU230005 from "views/routes/MU230005";
import MU230006 from "views/routes/MU230006";
import MU230007 from "views/routes/MU230007";
import MU230008 from "views/routes/MU230008";
import MU230009 from "views/routes/MU230009";
import MU230010 from "views/routes/MU230010";
import MU230012 from "views/routes/MU230012";
import MU230013 from "views/routes/MU230013";
import MU230015 from "views/routes/MU230015";
import MU230035 from "views/routes/MU230035";
import { useSelector } from "react-redux";
import { getCookie } from "common/common";

const componentMap = {
  MU230001: MU230035,
  MU230002: MU230035,
  MU230003: MU230035,
  MU230004: MU230035,
  MU230005: MU230005,
  MU230006: MU230006,
  MU230007: MU230007,
  MU230008: MU230008,
  MU230009: MU230009,
  MU230010: MU230010,
  MU230011: MU230035,
  MU230012: MU230035,
  MU230013: MU230035,
  MU230014: MU230035,
  MU230015: MU230035,
  MU230016: MU230035,
  MU230017: MU230035,
  MU230018: MU230035,
  MU230019: MU230035,
  MU230020: MU230035,
  MU230021: MU230035,
  MU230022: MU230035,
  MU230023: MU230035,
  MU230024: MU230035,
  MU230025: MU230035,
  MU230026: MU230035,
  MU230027: MU230035,
  MU230028: MU230035,
  MU230029: MU230035,
  MU230030: MU230035,
  MU230031: MU230035,
  MU230032: MU230035,
  MU230033: MU230035,
  MU230034: MU230035,
  MU230035: MU230035,
  MU230036: MU230035,
};
// 원본 horizon-ui
// https://horizon-ui.com/
// 참고문서
// https://horizon-ui.com/components
// https://horizon-ui.com/documentation/docs/introduction
// https://chakra-ui.com/getting-started

/*
  route.js에 대한 설명
  url : layout/path
  path : 기능이랑 무방
  icon : navbar 좌측 icon
  (중요)component : 바탕(layout)에 들어올 component -> 폴더 안의 index.js로 작동하기 때문에 폴더단위로 작업
  (중요)layout : 바탕이 되는 화면(? url). 관련 route 설정은 index.js
  (중요)redirect시 url(상단설명참조)기준으로 이동
*/

const component = {
  getRoute: async () => {
    const responseJson = await api.roleMenu.getRoleMenuListByDpGrpCd();
    if (responseJson.status !== 200) {
      return [];
    }

    const data = responseJson.data;
    setComponent(data);
    return data;
  },
};
const setComponent = (items) => {
  if (!items) {
    return false;
  }
  items.forEach((item) => {
    item.code = item.menu_cd;
    item.name = item.menu_nm;
    item.path = item.menu_path;
    item.upper = item.upper_cd;
    if (item.file_type) {
      item.icon = (
        <Image
          src={
            item.file_type === "FIA0001"
              ? item.file_path + "/" + item.modi_nm
              : `${PORT}/menu/icon-${item.file_cd}`
          }
        />
      );
    }
    item.layout = "/MU000000";
    if (componentMap[item.menu_cd]) {
      item.component = componentMap[item.menu_cd];
    }

    if (item.items.length > 0) {
      setComponent(item.items);
    }
  });
};

const RoleRoutes = async () => {
  const responseJson = await api.roleMenu.getRoleMenuListByDpGrpCd();
  if (responseJson.status !== 200) {
    return [];
  }

  const data = responseJson.data;
  setComponent(data);

  return data;
};

export default RoleRoutes;
