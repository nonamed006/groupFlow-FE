import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import { React, useState, useEffect } from "react";
import { PORT } from "set";
import GnbCardList from "./GnbCardList";
import GnbCardBar from "./GnbCardBar";

const GnbCard = ({
  title,
  gnbMenuInfo,
  setGnbMenuInfo,
  setGnbMenuList,
  searchGnbMenuCd,
  searchMenuNm,
  onSearchClick
}) => {
  const [ list, setList ] = useState([]); //조회한 메뉴 목록

  /* 메뉴 목록 조회 */
  const gnbMenuList = async () => {
    const params = {
      searchGnbMenuCd: searchGnbMenuCd,
      searchMenuNm: searchMenuNm
    }
    const queryString = new URLSearchParams(params).toString();
    await fetch(`${PORT}/menu/?${queryString}`, { method: 'GET', })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result === 'SUCCESS') {
          setList(responseJson.data);
          setGnbMenuList(responseJson.data);
        } else {
          alert(responseJson.resultMsg);
          setList([]);
          setGnbMenuList([]);
        }
      });
  }

  /* 선택한 메뉴 정보 조회 */
  const setGnbMenuDetail = async (menuCd) => {
    if(menuCd === gnbMenuInfo.menuCd) {
      setGnbMenuInfo({});

      return false;
    }
    await fetch(`${PORT}/menu/find-${menuCd}`, {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.result === 'SUCCESS') {
            setGnbMenuInfo(responseJson.voData);
          } else {
            alert(responseJson.resultMsg);
          }
        }
      );
  }

  useEffect(() => {
    gnbMenuList();
  }, [gnbMenuInfo, onSearchClick]);

  return (
      <Box borderRadius="lg" bg="white" h="fit-content"  p="6">
          {/* 목록 상단 */}
        <GnbCardBar title={title} count={list&&list.length}/>
          {/* 목록 테이블(카드형식) */}
        <GnbCardList list={list} gnbMenuInfo={gnbMenuInfo} setGnbMenuDetail={setGnbMenuDetail}/>
      </Box>
  );
};
  
  export default GnbCard;
  