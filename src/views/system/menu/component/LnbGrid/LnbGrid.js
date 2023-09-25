import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import LnbGridBar from "./LnbGridBar";
import LnbGridList from "./LnbGridList";
import { PORT } from "set";

const LnbGrid = ({
  title,
  gnbMenuInfo,
  lnbMenuInfo,
  setLnbMenuInfo,
  setLnbMenuList,
  searchGnbMenuCd,
  searchLnbMenuCd,
  searchMenuNm,
  onSearchClick
}) => {
  const [ list, setList ] = useState([]);

  /* 메뉴 목록 조회 */
  const lnbMenuList = async () => {
    const params = {
      // searchGnbMenuCd: searchGnbMenuCd,
      searchLnbMenuCd: searchLnbMenuCd,
      searchMenuNm: searchMenuNm
    }
    const queryString = new URLSearchParams(params).toString();
    const menuCd = gnbMenuInfo.menuCd ? gnbMenuInfo.menuCd : (searchGnbMenuCd ? searchGnbMenuCd : '');
    console.log(menuCd);
    await fetch(`${PORT}/menu/lnb-${menuCd}?${queryString}`, { method: 'GET', })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if(responseJson.result === 'SUCCESS') {
          setList(responseJson.data);
          setLnbMenuList(responseJson.data);
        } else {
          alert(responseJson.resultMsg);
          setList([]);
          setLnbMenuList([]);
        }
      });
  }

  /* 선택한 메뉴 정보 조회 */
  const setMenuDetail = async (menuCd) => {
    await fetch(`${PORT}/menu/find-${menuCd}`, {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.result === 'SUCCESS') {
            setLnbMenuInfo(responseJson.voData);
          } else {
            alert(responseJson.resultMsg);
          }
        }
      );
  }

  useEffect(() => {
    lnbMenuList();
  }, [gnbMenuInfo, onSearchClick]);

  return(
      <Box borderRadius="lg" bg="white" h="fit-content"  p="6">
        <LnbGridBar title={title} count={list&&list.length}/>
        <LnbGridList list={list} setMenuDetail={setMenuDetail}/>
      </Box>
  );
}

export default LnbGrid;