import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import { React, useState, useEffect } from "react";
import { PORT } from "set";
import GnbCardList from "./GnbCardList";
import GnbCardBar from "./GnbCardBar";
import api from 'api/Fetch';

const GnbCard = ({
  title,
  //gnbMenuInfo,
  menuInfo,
  //setGnbMenuInfo,
  selectGnbMenuCd,
  setMenuInfo,
  setGnbMenuList,
  setSelectGnbMenuCd,
  search,
  // searchGnbMenuCd,
  // searchMenuNm,
  // onSearchClick
}) => {
  const [ list, setList ] = useState([]); //조회한 메뉴 목록

  /* 메뉴 목록 조회 */
  const gnbMenuList = async () => {
    const responseJson = await api.menu.getGnbMenuList(search);

    if(responseJson.result.toUpperCase() === 'SUCCESS') {
      setList(responseJson.data);
      setGnbMenuList(responseJson.data);
    } else {
      setList([]);
      setGnbMenuList([]);
    }
  }

  /* 선택한 메뉴 정보 조회 */
  const setGnbMenuDetail = async (menuCd) => {
    if(menuCd === menuInfo.menuCd) {  // 같은 GNB 선택했을 때
      setMenuInfo({});                //선택한 메뉴 정보 초기화
      setSelectGnbMenuCd('')          //선택한 GNB menuCd 초기화

      return false;
    }

    setSelectGnbMenuCd(menuCd);       // LNB에서 사용할 GNB menuCd 설정
    const responseJson = await api.menu.getMenuDetail(menuCd);

    if(responseJson.result.toUpperCase() === 'SUCCESS') {
      setMenuInfo(responseJson.voData);
    } else {
      alert(responseJson.resultMsg);
    }
  }

  useEffect(() => {
    gnbMenuList();
  }, [menuInfo, search.onSearchClick]);//onSearchClick

  return (
      <Box borderRadius="lg" bg="white" h='700px'  p="6">
          {/* 목록 상단 */}
        <GnbCardBar title={title} count={list&&list.length}/>
          {/* 목록 테이블(카드형식) */}
        <GnbCardList list={list} menuInfo={menuInfo} setGnbMenuDetail={setGnbMenuDetail} selectGnbMenuCd={selectGnbMenuCd}/>
      </Box>
  );
};
  
  export default GnbCard;
  