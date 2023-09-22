import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import { React, useState, useEffect } from "react";
import { PORT } from "set";
import GnbCardList from "./GnbCardList";
import GnbCardBar from "./GnbCardBar";

const GnbCard = ({title, menuInfo, setMenuInfo, setMenuList, searchGnbMenuCd, searchMenuNm, onSearchClick}) => {
  const [ list, setList ] = useState([]); //조회한 메뉴 목록

  /* 메뉴 목록 조회 */
  const gnbMenuList = async () => {
    const params = {
      searchGnbMenuCd: searchGnbMenuCd,
      searchMenuNm: searchMenuNm
    }
    console.log(searchGnbMenuCd);
    const queryString = new URLSearchParams(params).toString();
    await fetch(`${PORT}/menu/?${queryString}`, { method: 'GET', })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if(responseJson.result === 'SUCCESS') {
          setList(responseJson.data);
          setMenuList(responseJson.data);
        } else {
          alert(responseJson.resultMsg);
          setList([]);
          setMenuList([]);
        }
      });
  }

  /* 선택한 메뉴 정보 조회 */
  const setMenuDetail = async (menuCd) => {
    await fetch(`${PORT}/menu/find-${menuCd}`, {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.result === 'SUCCESS') {
            setMenuInfo(responseJson.voData);
          } else {
            alert(responseJson.resultMsg);
          }
        }
      );
  }

  useEffect(() => {
    gnbMenuList();
  }, [menuInfo, onSearchClick]);

  return (
      <Box borderRadius="lg" bg="white" h="fit-content"  p="6">
          {/* 목록 상단 */}
        <GnbCardBar title={title} count={list&&list.length}/>
          {/* 목록 테이블(카드형식) */}
        <GnbCardList list={list} menuInfo={menuInfo} setMenuDetail={setMenuDetail}/>
      </Box>
  );
};
  
  export default GnbCard;
  