import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";
import Corporation from "views/admin/corporation";
import Department from "views/admin/department";
import Employee from "views/admin/employee";
// Auth Imports
import LogInCentered from "views/auth/login";
import Menu from "views/system/menu";
import RoleGroup from "views/admin/roleGroup";
import RoleSet from "views/system/role";

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

const routes = [
  {
    code: "MU230001",
    name: "시스템 설정",
    layout: "/system",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    items: [
      {
        code: "MU230002",
        upper: "MU230001",
        name: "조직관리",
        layout: "/system",
        items: [
          {
            code: "MU230005",
            upper: "MU230002",
            name: "회사관리",
            layout: "/system",
            path: "/corporation",
            component: Corporation,
          },
          {
            code: "MU230006",
            upper: "MU230002",
            name: "부서관리",
            layout: "/system",
            path: "/department",
            component: Department,
          },
        ],
      },
      {
        code: "MU230003",
        upper: "MU230001",
        name: "사원관리",
        layout: "/system",
        items: [
          {
            code: "MU230007",
            upper: "MU230003",
            name: "사원관리",
            layout: "/system",
            path: "/employee",
            component: Employee,
          },
        ],
      },
      {
        code: "MU230004",
        upper: "MU230001",
        name: "권한관리",
        layout: "/system",
        items: [
          {
            code: "MU230008",
            upper: "MU230004",
            name: "메뉴관리",
            layout: "/system",
            path: "/menu",
            component: Menu,
          },
          {
            code: "MU230009",
            upper: "MU230004",
            name: "권한 그룹 설정",
            layout: "/system",
            path: "/gr",
            component: RoleGroup,
          },
          {
            code: "MU230010",
            upper: "MU230004",
            name: "권한 설정",
            layout: "/system",
            path: "/roleSet",
            component: RoleSet,
          },
        ],
      },
    ],
  },
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },

  {
    name: "로그인",
    layout: "/auth",
    path: "/login",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: LogInCentered,
  },

  
];

export default routes;

/* 디비 메뉴 데이터
insert into menu(menu_cd, upper_cd, file_cd, menu_nm, use_yn, sort, depth, type_cd, menu_path, del_yn, cdt)
values('MU230001', '', 'FI230001', '시스템 설정', true, 1, 1, 'MUA0001', '', false, now()),
('MU230002', 'MU230001', '', '조직관리', true, 1, 2, 'MUA0001', '', false, now()),
('MU230003', 'MU230001', '', '사원관리', true, 2, 2, 'MUA0001', '', false, now()),
('MU230004', 'MU230001', '', '권한관리', true, 3, 2, 'MUA0001', '', false, now()),
('MU230005', 'MU230002', '', '회사관리', true, 1, 3, 'MUA0001', '', false, now()),
('MU230006', 'MU230002', '', '부서관리', true, 2, 3, 'MUA0001', '', false, now()),
('MU230007', 'MU230003', '', '사원관리', true, 1, 3, 'MUA0001', '', false, now()),
('MU230008', 'MU230004', '', '메뉴설정', true, 1, 3, 'MUA0001', '', false, now()),
('MU230009', 'MU230004', '', '권한그룹설정', true, 2, 3, 'MUA0001', '', false, now()),
('MU230010', 'MU230004', '', '권한설정', true, 3, 3, 'MUA0001', '', false, now());
*/
