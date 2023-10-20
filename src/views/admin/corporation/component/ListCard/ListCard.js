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

  const [pageNum, setPageNum] = useState(1);  // 요청할 페이지 번호
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
  const handleSearchBtn = () => { // 초기화 
    setPageNum(1);
    setTotalCount(0);
    setInit(!init);
  };

  useEffect(async () => {
    if (inView && !isLastPage) {
     // await setIsLoading(true);
      fetchCorpList();
      // await setIsLoading(false);
    }
  }, [inView]);


  // 회사 목록 조회 및 검색
  const fetchCorpList = async () => {
    let url = `${PORT}/corp`;
    // URL 파라미터 생성
    const params = new URLSearchParams();
    // 검색
    if (keyword !== "") params.append("keyword", keyword);
    if (useYn !== "") params.append("useYn", useYn);
    // 페이지 요청
    params.append("pageNum", pageNum);

    // URL에 파라미터 추가
    const paramString = params.toString();
    if (paramString) {
      url += "?" + paramString;
    }

    fetch(url, {
      method: "GET",
    }).then((res) => res.json())
      .then((res) => {
        if (res.result === 'success') { // 성공일 때
          setCorpList(pageNum===1?res.pageInfo.list:[...corpList, ...(res.pageInfo.list)]); // 이전 페이지 데이터 리스트에 추가
          setTotalCount(res.pageInfo.total);  // 총 데이터 수
          setIsLastPage(res.pageInfo.isLastPage); // 마지막 페이지인지
          if(res.pageInfo.hasNextPage){  // 다음페이지가 있다면
            setPageNum(res.pageInfo.pageNum+1); // 다음페이지 번호 set
          }
        } else{
          setCorpList([]);
          setIsLastPage(true);
        }
      });
    return;
  };

  const handleOnClik = () => {
    setCoCd(0);
  }
  return (
    <Box borderRadius="lg" bg="white" h="700px" p="6">
      {/* 목록 상단 */}
      <CardMenuBar
        handleOnClik={handleOnClik}
        title={title}
        count={totalCount}
        buttonType={true}
        btnText={'추가'} />
      {/* 목록 테이블 */}
      <Box w={'100%'} display={'inline-block'} overflowX={"auto"} overflowY={"auto"} h={'550px'} >
        <Box minH={'560px'}>
          <ListCardTable listData={corpList} setCoCd={setCoCd} coCd={coCd} />
        </Box>
        
        <Box ref={infiniteScrollRef}  h={'1px'} />
        {isLoading &&
          <SyncLoader />
        }

      </Box>

    </Box>
  );
};

export default ListCard;
