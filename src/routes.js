import React, { useEffect, useState } from "react";

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

const componentMap = {
  'MU230005': MU230005,
  'MU230006': MU230006,
  'MU230007': MU230007,
  'MU230008': MU230008,
  'MU230009': MU230009,
  'MU230010': MU230010,
  'MU230012': MU230012,
  'MU230013': MU230015,
  'MU230014': MU230015,
  'MU230015': MU230015,
  'MU230035': MU230035,
}
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
    const search = {
      useYn: 'Y'
    }
    //const responseJson = await api.menu.getLnbMenuList(search);
    const responseJson = await api.roleMenu.getRoleMenuListByDpGrpCd('DG230006');
    console.log('routes');
    const data = responseJson.data;
    setComponent(data);
    const sys = {
      code: 'MU230001',
      name: '시스템 설정',
      icon: <Image src={`/img/menu/FI230012.png`}/>,
      layout: '/MU000000',
      path: '/MU230001/',
      upper: '',
      items: [
        {
          code: 'MU230002',
          name: '조직관리',
          layout: '/MU000000',
          path: '/MU230001/MU230002/',
          upper: 'MU230001',
          items: [
            {
              code: 'MU230005',
              name: '회사관리',
              layout: '/MU000000',
              path: '/MU230001/MU230002/MU230005/',
              upper: 'MU230002',
              component: componentMap['MU230005'],
              items: []
            },
            {
              code: 'MU230006',
              name: '부서관리',
              layout: '/MU000000',
              path: '/MU230001/MU230002/MU230006/',
              upper: 'MU230002',
              component: componentMap['MU230006'],
              items: []
            }
          ]
        },
        {
          code: 'MU230003',
          name: '사원관리',
          layout: '/MU000000',
          path: '/MU230001/MU230003/',
          upper: 'MU230001',
          items: [
            {
              code: 'MU230007',
              name: '사원관리',
              layout: '/MU000000',
              path: '/MU230001/MU230003/MU230007/',
              upper: 'MU230003',
              component: componentMap['MU230007'],
              items: []
            },
          ]
        },
        {
          code: 'MU230004',
          name: '권한관리',
          layout: '/MU000000',
          path: '/MU230001/MU230004/',
          upper: 'MU230001',
          items: [
            {
              code: 'MU230008',
              name: '메뉴관리',
              layout: '/MU000000',
              path: '/MU230001/MU230004/MU230008/',
              upper: 'MU230004',
              component: componentMap['MU230008'],
              items: []
            },
            {
              code: 'MU230009',
              name: '권한그룹설정',
              layout: '/MU000000',
              path: '/MU230001/MU230004/MU230009/',
              upper: 'MU230004',
              component: componentMap['MU230009'],
              items: []
            },
            {
              code: 'MU230010',
              name: '권한 설정',
              layout: '/MU000000',
              path: '/MU230001/MU230004/MU230010/',
              upper: 'MU230004',
              component: componentMap['MU230010'],
              items: []
            }
          ]
        }
      ]
    }
    data.push(sys);
    return data;
  }
}
const setComponent = (items) => {
  items.forEach(item => {
    item.code = item.menu_cd;
    item.name = item.menu_nm;
    item.path = item.menu_path;
    item.upper = item.upper_cd;
    if(item.file_type) {
      item.icon = <Image src={(item.file_type === 'FIA0001' ? item.file_path + '/' + item.modi_nm : `${PORT}/menu/icon-${item.fileCd}`)}/>;
    }
    item.layout = '/MU000000';
    if(componentMap[item.menu_cd]) {
      item.component = componentMap[item.menu_cd];
    }

    if(item.items.length > 0) {
      setComponent(item.items);
    }
  });
}

//getRoute();
const Routes = await component.getRoute();

export default Routes;


/*
const routes = [
  {
    code: "MU230001",
    name: "시스템 설정",
    layout: "/system",
    icon: (
      <Icon as={MdPhonelinkSetup} width="20px" height="20px" color="inherit" />
    ),
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
            items: []
          },
          {
            code: "MU230006",
            upper: "MU230002",
            name: "부서관리",
            layout: "/system",
            path: "/department",
            component: Department,
            items: []
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
            items: []
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
            items: []
          },
          {
            code: "MU230009",
            upper: "MU230004",
            name: "권한 그룹 설정",
            layout: "/system",
            path: "/gr",
            component: RoleGroup,
            items: []
          },
          {
            code: "MU230010",
            upper: "MU230004",
            name: "권한 설정",
            layout: "/system",
            path: "/roleSet",
            component: RoleSet,
            items: []
          },
        ],
      },
    ],
  },

  {
    name: "로그인",
    layout: "/auth",
    path: "/login",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: LogInCentered,
    items: []
  },
  {
    name: "GROUP FLOW",
    layout: "/system",
    path: "/home",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: HomePage,
    items: []
  },
  {
    name: "전자결재",
    layout: "/system",
    path: "/approval",
    icon: <Icon as={MdCreate} width="20px" height="20px" color="inherit" />,
    component: Approval,
  },
  {
    name: "인사관리",
    layout: "/system",
    path: "/hr",
    icon: (
      <Icon
        as={MdOutlinePersonOutline}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: Hr,
  },
  {
    name: "회계관리",
    layout: "/system",
    path: "/accounting",
    icon: <Icon as={MdDvr} width="20px" height="20px" color="inherit" />,
    component: Accounting,
  },
  {
    name: "임직원업무관리",
    layout: "/system",
    path: "/executives",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: Executives,
  },
];

export default routes;*/

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
