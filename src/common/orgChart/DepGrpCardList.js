import {
  Box
} from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import DepGrpCard from "./DepGrpCard";

import { PORT } from "set";
import { useInView } from 'react-intersection-observer';

const DepGrpCardList = ({changeYn, corpDepCd, setDepGrp, keyword, search }) => {
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
    (changeYn !== undefined && changeYn !== 'undefined') &&
      handleSearchBtn();
  }, [changeYn]);

  useEffect(() => {
    console.log('init');
    (init !== undefined && init !== 'undefined') &&
      fetchDepGrpList();
  }, [init]);

  // 검색 버튼 클릭 시
  const handleSearchBtn = () => { // 초기화 
    setPageNum(1);
    setTotalCount(0);
    setInit(!init);
  };
      // 조직_그룹 목록 조회
      const fetchDepGrpList = () => {
        let url = `${PORT}/depGrp`;

        // URL 생성
        const params = new URLSearchParams();
        if (corpDepCd !== '' && (corpDepCd !== undefined && corpDepCd !== 'undefined')) {   // 회사 및 부서 선택 후 조회일 때
            params.append('search', 'code');
            params.append('keyword', corpDepCd);
        }
        else {    // 검색 조회일때
            if (search !== '')
                params.append('search', search);
            if (keyword !== '')
                params.append('keyword', keyword);
        }
        params.append('pageNum', pageNum);
        // URL에 파라미터 추가
        const paramString = params.toString();
        if (paramString) {
            url += '?' + paramString;
        }

        fetch(url, {
            method: "GET"
        }).then(res => res.json()).then(res => {
            if (res.result === 'success') { // 성공일 때
                
                if(pageNum===1) setDepGrpList(res.pageInfo.list);
                else setDepGrpList([...depGrpList, ...(res.pageInfo.list)]); // 이전 페이지 데이터 리스트에 추가

                setTotalCount(res.pageInfo.total);  // 총 데이터 수
                setIsLastPage(res.pageInfo.isLastPage); // 마지막 페이지인지
                if(res.pageInfo.hasNextPage){  // 다음페이지가 있다면
                  setPageNum(res.pageInfo.pageNum+1); // 다음페이지 번호 set
                }
              } else{
                setDepGrpList([]);
                setIsLastPage(true);
              }
        });
    };


  return (
    <Box overflowY={"auto"} overflowX={'hidden'}
      boxShadow='lg' bg='white' borderRadius='lg' h={'650px'} p={2}>
 <Box minH={'660px'}>
      {depGrpList&&
	  	depGrpList.map((depGrp) => {
        	return <DepGrpCard depGrp={depGrp} key={depGrp.dpGrpcd} setDepGrp={setDepGrp}/>
      })}</Box>
        <Box ref={infiniteScrollRef}  h={'1px'} bg={'red'}> 제가 보이시나요</Box>
    </Box>
  );
};

export default DepGrpCardList;
