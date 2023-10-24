import {Box} from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import DepGrpCard from "./DepGrpCard";

import { useInView } from 'react-intersection-observer';
import api from "api/Fetch";
import CardListTitle from "./CardListTitle";
const DepGrpCardList = ({ changeYn, corpDep, setDepGrp, keyword, search, setChangeYn }) => {
  const [depGrpList, setDepGrpList] = useState([]); // 사원 목록

  const [pageNum, setPageNum] = useState(1);  // 요청할 페이지 번호
  const [isLastPage, setIsLastPage] = useState(false);  // 마지막페이지 여부
  const [totalCount, setTotalCount] = useState(); // 총 데이터 갯수
  const [init, setInit] = useState(); // 첫로딩, 검색시 초기화

  const [infiniteScrollRef, inView] = useInView();

  useEffect(async () => {
    if (inView && !isLastPage) {
      // await setIsLoading(true);
      fetchDepGrpList();
      // await setIsLoading(false);
    }
  }, [inView]);

  useEffect(() => {
    if(changeYn !== undefined && changeYn !== 'undefined') {
      changeYn === true ? setChangeYn(false):handleSearchBtn();
    }
  }, [changeYn]);

  useEffect(() => {
    (init !== undefined && init !== 'undefined') &&
      fetchDepGrpList();
  }, [init]);

  // 검색 버튼 클릭 시
  const handleSearchBtn = () => { // 초기화 
    setPageNum(1);
    setInit(!init);
  };

  // 조직_그룹 목록 조회
  const fetchDepGrpList = async () => {
    let corpDepCd = (corpDep !== undefined && corpDep !== 'undefined')? corpDep.code : undefined
    let res = await api.depGrp.getDepGepList(corpDepCd , search, keyword, pageNum);
    if (res.status === 200 && res.pageInfo) { // 성공일 때
      let { list, total, isLastPage, hasNextPage } = res.pageInfo;
      setDepGrpList(pageNum === 1 ? list : [...depGrpList, ...list]);
      setTotalCount(total);
      setIsLastPage(isLastPage);
      if (hasNextPage)
        setPageNum((prev) => prev + 1);
    } else {
      setDepGrpList([]);
      setIsLastPage(true);
      setTotalCount(0);
    }
  };


  return (
    <Box>
      
      <CardListTitle corpDepNm={corpDep && corpDep.name} totalCnt={totalCount?totalCount:0}/>
      
      <Box overflowY={totalCount>0?"auto":"hidden"} overflowX={'hidden'} boxShadow='lg' bg='white' borderRadius='lg' h={'590px'} p={2}>
        <Box minH={'600px'}>
          {depGrpList &&
            depGrpList.map((depGrp) => {
              return <DepGrpCard depGrp={depGrp} key={depGrp.dpGrpcd} setDepGrp={setDepGrp} />
            })}
        </Box>
        <Box ref={infiniteScrollRef} h={'1px'} bg={'white'} />
      </Box>
    </Box>
  );
};

export default DepGrpCardList;
