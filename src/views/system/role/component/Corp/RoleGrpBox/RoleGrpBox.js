import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PORT } from "set";
import { useInView } from 'react-intersection-observer';

import CardMenuBar from "common/component/CardMenuBar";
import GroupCardList from "views/admin/roleGroup/component/GroupBox/GroupCardList";
import RoleGrpSearchBar from "./RoleGrpSearchBar";


const RoleGrpBox = ({ setRgCd, rgCd, coCd, keyword, setKeyword }) => {
    const [roleGrpList, setRoleGrpList] = useState([]); // 권한그룹 목록

    const [init, setInit] = useState(); // 첫로딩, 검색시 초기화

    const [pageNum, setPageNum] = useState(1);  // 요청할 페이지 번호
    const [isLastPage, setIsLastPage] = useState(false);  // 마지막페이지 여부
    const [totalCount, setTotalCount] = useState(); // 총 데이터 갯수
    const [infiniteScrollRef, inView] = useInView();

    // 선택한 권한 그룹 목록
    const [checkedRgCd, setCheckedRgCd] = useState();

    useEffect(() => {
        initPageInfo(); // 권한그룹 목록 조회
    }, [coCd]);

    useEffect(async () => {
        if (inView && !isLastPage) {
            // await setIsLoading(true);
            fetchRoleGroup();
            // await setIsLoading(false);
        }
    }, [inView]);

    useEffect(() => {
        fetchRoleGroup();
    }, [init]);

    // 권한그룹 목록 조회
    const fetchRoleGroup = () => {
        let url = `${PORT}/roleCorp/${coCd}`

        // URL 파라미터 생성
        const params = new URLSearchParams();
        if (keyword !== undefined && keyword !== 'undefined') params.append("grpNm", keyword);
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
                    setRoleGrpList([...roleGrpList, ...res.pageInfo.list]);
                    setTotalCount(res.pageInfo.total);  // 총 데이터 수
                    setIsLastPage(res.pageInfo.isLastPage); // 마지막 페이지인지
                    if (res.pageInfo.hasNextPage) {  // 다음페이지가 있다면
                        setPageNum(res.pageInfo.pageNum + 1); // 다음페이지 번호 set
                    }
                } else {
                    setRoleGrpList([]);
                }
                setRgCd(undefined);
            });
    };


    // 검색 버튼 클릭 시
    const handleSearchBtn = () => {
        // 검색 내용에 따른 목록 조회
        if (coCd !== undefined && coCd !== 'undefined') {
            initPageInfo(); // 권한그룹 목록 조회
        } else {
            alert('회사를 선택하세요');
        }
    };

    // 검색 버튼 클릭 시
    const initPageInfo = () => { // 초기화 
        setRoleGrpList([]);
        setIsLastPage(false);
        setPageNum(1);
        setTotalCount(0);
        setInit(!init);
    };

    // 권한-회사 맵핑 수정 시
    const fetchCheckedRoleGrp = () => {
        let url = `${PORT}/roleCorp/${coCd}`

        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkedRgCd)
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.result === 'success')
                    alert('수정되었습니다');
            });
    };

    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white" >
            {/* 메뉴상단 */}
            <CardMenuBar title={'권한그룹'} count={totalCount} buttonType={false} />
            {/* 검색바 */}
            <RoleGrpSearchBar
                setKeyword={setKeyword}
                handleSearchBtn={handleSearchBtn}
                code={coCd}
            />
            {/* 목록 */}
            {roleGrpList.length > 0 &&
                <Box w={'100%'} display={'inline-block'} overflowX={"auto"} overflowY={"auto"} h={'500px'} >
                    <Box minH={'510px'}>
                        <GroupCardList
                            rgCd={rgCd}
                            roleGrpList={roleGrpList} // 해당 회사의 권한 그룹 목록
                            setRgCd={setRgCd}   // 권한그룹 선택
                            code={coCd}
                            total={true}    // 내 권한그룹의 전체 메뉴 조회 여부
                        />
                    </Box>
                    <Box ref={infiniteScrollRef}  h={'1px'} />
                </Box>
            }
        </Box>

    );
};

export default RoleGrpBox;
