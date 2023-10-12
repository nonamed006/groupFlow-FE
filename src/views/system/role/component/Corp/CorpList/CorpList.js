import { Box } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useState } from "react";

import { useEffect } from "react";
import CardMenuBar from "common/component/CardMenuBar";
import { PORT } from "set";
import ListCardTable from "views/admin/corporation/component/ListCard/ListCardTable";
import SearchBar from "common/component/SearchBar";

const CorpList = ({ setCoCd, coCd }) => {

  const [corpList, setCorpList] = useState();
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    fetchCorpList();  // 회사목록 조회
  }, []);

  // 회사목록 조회
  const fetchCorpList = () => {
    let url = `${PORT}/corp`;

    // URL 파라미터 생성
    const params = new URLSearchParams();
    if (keyword !== undefined && keyword !== 'undefined')
      params.append("keyword", keyword);

    // URL에 파라미터 추가
    const paramString = params.toString();
    if (paramString) {
      url += "?" + paramString;
    }

    fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {

        setCorpList(res.data);
      });
  };

  // 검색 버튼 클릭 시
  const handleSearchBtn = () => {
    fetchCorpList();
  };

  return (
    <Box borderRadius="lg" bg="white" h="700px" p="6">
      {/* 목록 상단 */}
      <CardMenuBar
        title={'회사'}
        count={corpList !== undefined ? corpList.length : 0}
        buttonType={false}
      />
       <SearchBar setKeyword={setKeyword} handleSearchBtn={handleSearchBtn} placeholder={'회사명 입력하세요'} btnText={'검색'} />
      {/* 목록 테이블 */}
      <Box w={'100%'} display={'inline-block'} overflowX={"auto"} height={'550px'} overflowY={"auto"} >
        <ListCardTable listData={corpList} setCoCd={setCoCd} coCd={coCd} />
      </Box>

    </Box>
  );
};

export default CorpList;
