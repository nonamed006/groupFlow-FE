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
import Test from "views/admin/test";
import Department from "views/admin/department";

// Auth Imports
import SignInCentered from "views/auth/signIn";

// 원본 horizon-ui
// https://horizon-ui.com/
// 참고문서
// https://horizon-ui.com/components
// https://horizon-ui.com/documentation/docs/introduction

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
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: RTL,
  },
  {
    name: "TEST",
    layout: "/admin",
    path: "/test",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Test,
  },
  {
    name: "부서관리",
    layout: "/admin",
    path: "/department",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Department,
  },
];

export default routes;
