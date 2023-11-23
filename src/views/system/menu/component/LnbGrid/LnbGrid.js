import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import LnbGridList from "./LnbGridList";
import api from 'api/Fetch';
import CardMenuBar from "common/component/CardMenuBar";

const LnbGrid = ({
  title,
  menuInfo,
  setMenuInfo,
  selectGnbMenuCd,
  search,
  isSave
}) => {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  /* 메뉴 목록 조회 */
  const lnbMenuList = async () => {
    search = {
      ...search,
      searchGnbMenuCd: search.searchGnbMenuCd ? search.searchGnbMenuCd : selectGnbMenuCd
    }
    const responseJson = await api.menu.getLnbMenuList(search);

    if (responseJson.status === 200) {
      setList(responseJson.data);
      setCount(responseJson.voData.count);
    } else {
      setList([]);
    }
  }

  /* 선택한 메뉴 정보 조회 */
  const setMenuDetail = async (menuCd) => {
    const responseJson = await api.menu.getMenuDetail(menuCd);
    
    if (responseJson.result.toUpperCase() === "SUCCESS") {
      setMenuInfo(responseJson.voData);
    } else {
      alert(responseJson.resultMsg);
    }
  };

  useEffect(() => {
    lnbMenuList();
  }, [selectGnbMenuCd, search.onSearchClick, isSave]);

  return (
    <Box borderRadius="lg" bg="white" h="700px" p="6">
      <CardMenuBar
        title={title}
        count={count}
        buttonType={false}
      />
      <LnbGridList list={list} setMenuDetail={setMenuDetail} />
    </Box>
  );
};

export default LnbGrid;
