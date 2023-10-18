import { Box } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useState } from "react";

import { useEffect } from "react";
import CardMenuBar from "common/component/CardMenuBar";
import { PORT } from "set";
import ListCardTable from "views/admin/corporation/component/ListCard/ListCardTable";
import SearchBar from "common/component/SearchBar";
import { useInView } from 'react-intersection-observer';
import { SyncLoader } from "react-spinners"

const CorpList = ({ setCoCd, coCd }) => {

  const [corpList, setCorpList] = useState([]); // 회사데이터 목록
  const [keyword, setKeyword] = useState(); // 검색어

  const [pageNum, setPageNum] = useState(1);   // 요청할 페이지
  const [isLastPage, setIsLastPage] = useState(false);  // 마지막페이지 여부
  const [totalCount, setTotalCount] = useState(); // 총 데이터 갯수

  const [init, setInit] =useState(); // 첫로딩, 검색시 초기화
  const [isLoading, setIsLoading] = useState(false);
  const [infiniteScrollRef, inView] = useInView();

  useEffect( () => {
    fetchCorpList();
  }, [init]);

  useEffect(async () => {
    if (inView && !isLastPage ) {
     // await setIsLoading(true);
      fetchCorpList();
      //setIsLoading(false);
    }
  }, [inView]);


  // 회사 목록 조회 및 검색
  const fetchCorpList = async () => {
    let url = `${PORT}/corp`;

    // URL 파라미터 생성
    const params = new URLSearchParams();
    if (keyword !== undefined && keyword !== 'undefined') params.append("keyword", keyword);
    params.append("pageNum", pageNum);
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
        if (res.result === 'success') {
          setCorpList([...corpList, ...(res.pageInfo.list)]);
          setTotalCount(res.pageInfo.total);
          setIsLastPage(res.pageInfo.isLastPage);
         if(res.pageInfo.hasNextPage){  // 다음페이지가 있다면
            setPageNum(res.pageInfo.pageNum+1); // 다음페이지 번호 set
          }
        } else{
          setCorpList([]);
          setIsLastPage(true);
        }
      });
  };

  // 검색 버튼 클릭 시
  const handleSearchBtn =  () => { // 초기화 
    setCorpList([]);
    setIsLastPage(false);
    setPageNum(1);
    setTotalCount(0);
    setInit(!init);
    setCoCd(undefined);
  };

  return (
    <Box borderRadius="lg" bg="white" h="700px" p="6" w={'500px'}>
      {/* 목록 상단 */}
      <CardMenuBar
        title={'회사'}
        count={totalCount}
        buttonType={false}
      />
      <SearchBar setKeyword={setKeyword} handleSearchBtn={handleSearchBtn} placeholder={'회사명 입력하세요'} btnText={'검색'} />
      {/* 목록 테이블 */}
      <Box w={'100%'} display={'inline-block'} overflowY={"auto"} height={'550px'} >
        <Box  minH={'560px'} >
            <ListCardTable listData={corpList} setCoCd={setCoCd} coCd={coCd} />
        </Box>
        <Box ref={infiniteScrollRef}  h={'1px'} />
        {/* {!isLoading ?
            <Box ref={infiniteScrollRef}  h={'1px'} />
          :<SyncLoader />
        } */}
      </Box>

    </Box>
  );
};

export default CorpList;
