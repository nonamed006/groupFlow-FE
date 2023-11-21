import { Box, Text } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import ListCardTable from "./ListCardTable";
import { useState, useEffect } from "react";
import CardMenuBar from "common/component/CardMenuBar";
import { useInView } from 'react-intersection-observer';
import api from "api/Fetch";
import Loading from "common/Loading";

const ListCard = ({ keyword, useYn, title, setCoCd, changeYn, coCd }) => {
  const [corpList, setCorpList] = useState([]); // 회사데이터 목록
  const [init, setInit] = useState(); // 첫로딩, 검색시 초기화

  const [pageNum, setPageNum] = useState(1);  // 요청할 페이지 번호
  const [isLastPage, setIsLastPage] = useState(false);  // 마지막페이지 여부
  const [totalCount, setTotalCount] = useState(); // 총 데이터 갯수

  const [isLoading, setIsLoading] = useState(true);
  const [infiniteScrollRef, inView] = useInView();

  useEffect(() => {  // 값 초기화
    handleSearchBtn();
  }, [changeYn]);

  useEffect(() => {
    fetchCorpList();
  }, [init]);

  // 검색 버튼 클릭 시
  const handleSearchBtn = () => { // 초기화 
    setPageNum(1);
    setInit(!init);
  };

  useEffect(async () => {
    if (inView && !isLastPage) {
      fetchCorpList();
    }
  }, [inView]);


  // 회사 목록 조회 및 검색
  const fetchCorpList = async () => {
    await setIsLoading(true);
    let res = await api.corp.getCorpList(keyword, useYn, pageNum);

    if (res.status === 200 && res.pageInfo) {
      let { list, total, isLastPage, hasNextPage } = res.pageInfo;
      setCorpList(pageNum === 1 ? list : [...corpList, ...list]);
      setTotalCount(total);
      setIsLastPage(isLastPage);
      if (hasNextPage)
        setPageNum((prev) => prev + 1);
    } else {
      setCorpList([]);
      setTotalCount(0);
    }
    await setIsLoading(false);
    return;
  };

  const handleOnClik = () => {
    setCoCd(0);
  }
  return (
    <Box borderRadius="5px" bg="white" h="700px" p={6} >
      {/* 목록 상단 */}
      <CardMenuBar
        handleOnClik={handleOnClik}
        title={title}
        count={totalCount}
        buttonType={true}
        btnText={'추가'} />
      {/* 목록 테이블 */}
      <Box w={'100%'} display={'inline-block'} overflowX={"hidden"} overflowY={"auto"} h={'600px'} >
        <Box minH={'560px'}>
          {
            corpList.length > 0 ? 
              <ListCardTable listData={corpList} setCoCd={setCoCd} coCd={coCd} />
            :
            <Text
            pt={200}
            align={'center'}
            fontWeight={600}
            color={'lightgray'}
            fontSize={'18px'}
        >
            검색된 데이터가 없습니다.
        </Text>
          }
          
        </Box>
        {isLoading ?
          <Loading />
          :
          <Box ref={infiniteScrollRef} h={'1px'} />
        }
      </Box>



    </Box>
  );
};

export default ListCard;
