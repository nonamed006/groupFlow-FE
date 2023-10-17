import { Box } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import ListCardTable from "./ListCardTable";
import { useState, useEffect } from "react";
import CardMenuBar from "common/component/CardMenuBar";
import { useInView } from 'react-intersection-observer';
import { SyncLoader } from "react-spinners"
import { PORT } from "set";
const ListCard = ({ keyword, useYn, title, setCoCd, changeYn, coCd }) => {
  const [corpList, setCorpList] = useState([]); // 회사데이터 목록
  const [init, setInit] = useState(); // 첫로딩, 검색시 초기화

  const [currentPage, setCurrentPage] = useState(1);   // 현재페이지
  const [isLastPage, setIsLastPage] = useState(false);  // 마지막페이지 여부
  const [totalCount, setTotalCount] = useState(); // 총 데이터 갯수

  const [isLoading, setIsLoading] = useState(false);
  const [infiniteScrollRef, inView] = useInView();

  useEffect(() => {  // 값 초기화
    handleSearchBtn();
  }, [changeYn]);

  useEffect(() => {
    fetchCorpList();
  }, [init]);

  // 검색 버튼 클릭 시
  const handleSearchBtn = async () => { // 초기화 
    setCorpList([]);
    setIsLastPage(false);
    setCurrentPage(1);
    setTotalCount(0);
    setInit(!init);
  };

  useEffect(async () => {
    if (inView && !isLastPage) {
      await setIsLoading(true);
      fetchCorpList();
      await setIsLoading(false);
    }
  }, [inView]);


  // 회사 목록 조회 및 검색
  const fetchCorpList = async () => {
    let url = `${PORT}/corp`;
    // URL 파라미터 생성
    const params = new URLSearchParams();
    if (keyword !== "") params.append("keyword", keyword);
    if (useYn !== "") params.append("useYn", useYn);
    params.append("pageNum", currentPage);
    // URL에 파라미터 추가
    const paramString = params.toString();
    if (paramString) {
      url += "?" + paramString;
    }

    fetch(url, {
      method: "GET",
    }).then((res) => res.json())
      .then((res) => {
        if (res.result === 'success') {
          setCorpList([...corpList, ...(res.pageInfo.list)]);
          setTotalCount(res.pageInfo.total);
          setIsLastPage(res.pageInfo.isLastPage);
          setCurrentPage((currentPage) => currentPage + 1);
        }
      });
    return;
  };

  return (
    <Box borderRadius="lg" bg="white" h="700px" p="6">
      {/* 목록 상단 */}
      <CardMenuBar
        handelOnClik={setCoCd}
        title={title}
        count={totalCount}
        buttonType={true}
        btnText={'추가'} />
      {/* 목록 테이블 */}
      <Box w={'100%'} display={'inline-block'} overflowX={"auto"} overflowY={"auto"} h={'550px'} >
        <Box minH={'560px'}>
          <ListCardTable listData={corpList} setCoCd={setCoCd} coCd={coCd} />
        </Box>

        <Box ref={infiniteScrollRef} bg={'white'} w={'100%'} h={'1px'}></Box>
        {isLoading &&
          <SyncLoader />
        }

      </Box>

    </Box>
  );
};

export default ListCard;
