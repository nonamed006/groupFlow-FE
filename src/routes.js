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
  MU230005: MU230005,
  MU230006: MU230006,
  MU230007: MU230007,
  MU230008: MU230008,
  MU230009: MU230009,
  MU230010: MU230010,
  MU230011: MU230015,
  MU230012: MU230012,
  MU230013: MU230015,
  MU230014: MU230015,
  MU230015: MU230015,
  MU230032: MU230035,
  MU230035: MU230035,
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
    // const sys = {
    //   code: 'MU230001',
    //   name: '시스템 설정',
    //   icon: <Image src={`/img/menu/FI230012.png`}/>,
    //   layout: '/MU000000',
    //   path: '/MU230001/',
    //   upper: '',
    //   items: [
    //     {
    //       code: 'MU230002',
    //       name: '조직관리',
    //       layout: '/MU000000',
    //       path: '/MU230001/MU230002/',
    //       upper: 'MU230001',
    //       items: [
    //         {
    //           code: 'MU230005',
    //           name: '회사관리',
    //           layout: '/MU000000',
    //           path: '/MU230001/MU230002/MU230005/',
    //           upper: 'MU230002',
    //           component: componentMap['MU230005'],
    //           items: []
    //         },
    //         {
    //           code: 'MU230006',
    //           name: '부서관리',
    //           layout: '/MU000000',
    //           path: '/MU230001/MU230002/MU230006/',
    //           upper: 'MU230002',
    //           component: componentMap['MU230006'],
    //           items: []
    //         }
    //       ]
    //     },
    //     {
    //       code: 'MU230003',
    //       name: '사원관리',
    //       layout: '/MU000000',
    //       path: '/MU230001/MU230003/',
    //       upper: 'MU230001',
    //       items: [
    //         {
    //           code: 'MU230007',
    //           name: '사원관리',
    //           layout: '/MU000000',
    //           path: '/MU230001/MU230003/MU230007/',
    //           upper: 'MU230003',
    //           component: componentMap['MU230007'],
    //           items: []
    //         },
    //       ]
    //     },
    //     {
    //       code: 'MU230004',
    //       name: '권한관리',
    //       layout: '/MU000000',
    //       path: '/MU230001/MU230004/',
    //       upper: 'MU230001',
    //       items: [
    //         {
    //           code: 'MU230008',
    //           name: '메뉴관리',
    //           layout: '/MU000000',
    //           path: '/MU230001/MU230004/MU230008/',
    //           upper: 'MU230004',
    //           component: componentMap['MU230008'],
    //           items: []
    //         },
    //         {
    //           code: 'MU230009',
    //           name: '권한그룹설정',
    //           layout: '/MU000000',
    //           path: '/MU230001/MU230004/MU230009/',
    //           upper: 'MU230004',
    //           component: componentMap['MU230009'],
    //           items: []
    //         },
    //         {
    //           code: 'MU230010',
    //           name: '권한 설정',
    //           layout: '/MU000000',
    //           path: '/MU230001/MU230004/MU230010/',
    //           upper: 'MU230004',
    //           component: componentMap['MU230010'],
    //           items: []
    //         }
    //       ]
    //     }
    //   ]
    // }
    // data.push(sys);
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
              : `${PORT}/menu/icon-${item.fileCd}`
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
