import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";

import CustomTable from "../tableList/CustomTable";
import CardMenuBar from "common/component/CardMenuBar";
import { useInView } from 'react-intersection-observer';
import api from "api/Fetch";
import FormInput from "common/component/FormInput";

const UserBox = ({ rgCd, setIsLoading }) => {
    const groupHeader = ['부서명', '부서/직책', '이름(ID)'];
    const [userList, setUserList] = useState([]); // 사용자목록
    const [keyword, setKeyword] = useState();   //  검색어
    const formInputRef = useRef(null);

    const [pageNum, setPageNum] = useState(1);   // 요청할 페이지
    const [isLastPage, setIsLastPage] = useState(false);  // 마지막페이지 여부
    const [totalCount, setTotalCount] = useState(0); // 총 데이터 갯수

    const [init, setInit] = useState(); // 첫로딩, 검색시 초기화
    const [infiniteScrollRef, inView] = useInView();

    useEffect(() => {
        if (rgCd !== undefined && rgCd !== 'undefined') {
            initPageInfo();
        } else {
            initDataInfo();
        }
        onClearSelect();

    }, [rgCd]);

    useEffect(() => {
        rgCd !== undefined && rgCd !== 'undefined' &&
            fetchRoleUserList();
    }, [init]);

    useEffect(() => {
        if (inView && !isLastPage
            && rgCd !== undefined && rgCd !== 'undefined') {
            fetchRoleUserList();
        }
    }, [inView]);

    const onClearSelect = () => {
        if (formInputRef.current) {
            formInputRef.current.reset();
            setKeyword();
        }
    };

    // 권한그룹 코드에 따른 사용자 목록 조회 + 사용자 검색
    const fetchRoleUserList = async () => {
        await setIsLoading(true);
        let res = await api.roleGrp.getRoleGrpUserList(rgCd, keyword, pageNum);
        if (res.status === 200 && res.pageInfo) {
            let { list, total, isLastPage, hasNextPage } = res.pageInfo;
            setUserList(pageNum === 1 ? list : [...userList, ...list]);
            setTotalCount(total);
            setIsLastPage(isLastPage);
            if (hasNextPage)
                setPageNum((prev) => prev + 1);
        } else {
            initDataInfo();
            setTotalCount(0);
        }
        setIsLoading(false);
    };

    const initDataInfo = () => {
        setUserList([]);
        setTotalCount(0);
        setIsLastPage(true);
    }

    // 검색 버튼 클릭 시
    const initPageInfo = () => {
        setPageNum(1);
        setInit(!init);
    };

    return (
        <Box borderRadius="5px" bg="white" h="780px" p="6" backgroundColor="white" display={'inline-block'} w={'500px'}>
            {/* 상단 */}
            <CardMenuBar title={'사용자 목록'} count={totalCount} buttonType={false} />
            {/* 검색바 */}
            <form ref={formInputRef}>
                <FormInput
                    searchBar={true}
                    init={rgCd}
                    title={'이름'}
                    onChange={e => setKeyword(e.target.value)}
                    handleSearchBtn={() => initPageInfo()}
                    placeholder={'검색어를 입력하세요'}
                    btnText={'검색'}
                />
            </form>
            {/* 목록 */}
            <Box overflowY={userList.length > 0 ? 'auto' : 'hidden'} mt={4} height={'550px'} w={'430px'} display={'block'} >
                <Box minH={'560px'}  >
                    {
                        userList.length > 0 ?
                            <CustomTable groupHeader={groupHeader} dataList={userList} />
                            :
                            <Text
                                pt={220}
                                align={'center'}
                                fontWeight={600}
                                color={'lightgray'}
                                fontSize={'18px'}
                            >
                                검색된 데이터가 없습니다.
                            </Text>
                    }

                </Box>
                <Box ref={infiniteScrollRef} h={'1px'} bg={'white'} />
            </Box>
        </Box>

    );
};

export default UserBox;
