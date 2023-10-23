import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PORT } from "set";

import CustomTable from "../tableList/CustomTable";
import CardMenuBar from "common/component/CardMenuBar";
import SearchBar from "common/component/SearchBar";
import { useInView } from 'react-intersection-observer';

const UserBox = ({ rgCd }) => {
    const groupHeader = ['부서명', '부서/직책', '이름(ID)'];
    const [userList, setUserList] = useState([]); // 사용자목록
    const [keyword, setKeyword] = useState();   //  검색어

    const [pageNum, setPageNum] = useState(1);   // 요청할 페이지
    const [isLastPage, setIsLastPage] = useState(false);  // 마지막페이지 여부
    const [totalCount, setTotalCount] = useState(0); // 총 데이터 갯수

    const [init, setInit] = useState(); // 첫로딩, 검색시 초기화
    const [isLoading, setIsLoading] = useState(false);
    const [infiniteScrollRef, inView] = useInView();

    useEffect(() => {
        if( rgCd !== undefined && rgCd !== 'undefined' ){
            initPageInfo();
            setKeyword();
        }
    }, [rgCd]);

    useEffect(() => {
        rgCd !== undefined && rgCd !== 'undefined' &&
            fetchRoleUserList();
    }, [init]);

    useEffect( () => {
        if (inView && !isLastPage 
            && rgCd !== undefined && rgCd !== 'undefined') {
            // await setIsLoading(true);
            fetchRoleUserList();
            //setIsLoading(false);
        }
    }, [inView]);

    // 권한그룹 코드에 따른 사용자 목록 조회 + 사용자 검색
    const fetchRoleUserList = () => {
        let url = `${PORT}/roleGrp/${rgCd}`;

        // URL 파라미터 생성
        const params = new URLSearchParams();
        if (keyword !== undefined && keyword !== 'undefined'){
            params.append("keyword", keyword);
        }
        params.append("pageNum", pageNum);
        // URL에 파라미터 추가
        const paramString = params.toString();
        if (paramString)
            url += "?" + paramString;
        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.result === 'success') {
                    setUserList([...userList, ...res.pageInfo.list]);
                    setTotalCount(res.pageInfo.total);
                    setIsLastPage(res.pageInfo.isLastPage);
                    if (res.pageInfo.hasNextPage) {  // 다음페이지가 있다면
                        setPageNum(res.pageInfo.pageNum + 1); // 다음페이지 번호 set
                    }
                } else {
                    setUserList([]);
                    setIsLastPage(true);
                }
            });
    };

    // 검색 버튼 클릭 시
    const initPageInfo = () => {
        setUserList([]);
        setIsLastPage(false);
        setPageNum(1);
        setTotalCount(0);
        setInit(!init);
    };

    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white" display={'inline-block'}>
            {/* 상단 */}
            <CardMenuBar title={'사용자 목록'} count={totalCount} buttonType={false} />
            {/* 검색바 */}
            <SearchBar init={rgCd} textLabel={'이름'} setKeyword={setKeyword} handleSearchBtn={initPageInfo} placeholder={'검색어를 입력하세요'} btnText={'검색'} />

            {/* 목록 */}
            <Box overflowY={'auto'} mt={4} height={'550px'} >
                <Box minH={'560px'} >
                    <CustomTable groupHeader={groupHeader} dataList={userList} />
                </Box>
                <Box ref={infiniteScrollRef} h={'1px'} bg={'white'}/>
            </Box>
        </Box>

    );
};

export default UserBox;
