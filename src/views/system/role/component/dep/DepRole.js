import { Grid, GridItem } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import DepList from './depList/DepList';
import DepGrpBox from './depGrpBox.js/DepGrpBox';
import { PORT } from 'set';
import MenuBox from 'views/system/roleGroup/component/MenuBox/MenuBox';

const DepRole = () => {
    const [roleGrpList, setRoleGrpList] = useState([]); // 권한그룹 목록
    const [totalCount, setTotalCount] = useState(0); // 총 데이터 갯수
    const [checkedList, setCheckedList] = useState([]);// 선택한 권한 그룹 목록
    const [rgCd, setRgCd] = useState();
    const [cdCd, setCoCd] = useState();
    const [dpCd, setDpCd] = useState();

    const [keyword, setKeyword] = useState();   // 권한그룹 검색어
    const [isReload, setIsReload] = useState(false);

    const [pageNum, setPageNum] = useState(1);  // 요청할 페이지 번호
    const [isLastPage, setIsLastPage] = useState(false);  // 마지막페이지 여부

    const [dpCdList, setDpCdList] = useState([]);

    useEffect(() => {
        fetchRoleGroup();
    }, [isReload])
    

    // 권한그룹 목록 조회
    const fetchRoleGroup = (clickDpCd, clickCoCd) => {
        let url = `${PORT}/roleDep/${clickCoCd}/${clickDpCd}`

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
                    setRoleGrpList(pageNum===1?res.pageInfo.list:[...roleGrpList, ...res.pageInfo.list]); // 이전 페이지 데이터 리스트에 추가
                    setTotalCount(res.pageInfo.total);  // 총 데이터 수
                    setIsLastPage(res.pageInfo.isLastPage); // 마지막 페이지인지
                    if (res.pageInfo.hasNextPage) {  // 다음페이지가 있다면
                        setPageNum(res.pageInfo.pageNum + 1); // 다음페이지 번호 set
                    }
                } else {
                    setRoleGrpList([]);
                    setIsLastPage(true);
                   
                }
                setCheckedList([]);
                //setRgCd(undefined);
            });
    };

     // 검색 버튼 클릭 시
     const handleSearchBtn = () => {
        // 검색 내용에 따른 목록 조회
        if (dpCd !== undefined && dpCd !== 'undefined') {
            fetchRoleGroup(dpCd); // 권한그룹 목록 조회
            initPageInfo();
        } else {
            alert('부서를 선택하세요');
        }
    };

    // 검색 버튼 클릭 시
    const initPageInfo = () => { // 초기화 
        setPageNum(1);
        setTotalCount(0);
    };

    return (
        <Grid
            h="500px"
            templateRows="repeat(11, 1fr)"
            templateColumns="repeat(7, 1fr)"
            gap={5}
        >

            {/* 부서 목록 */}
            <GridItem colSpan={2} rowSpan={5}>
                <DepList 
                    setDpCd={setDpCd}
                    setCoCd={setCoCd}
                    fetchRoleGroup={fetchRoleGroup}
                    setIsReload={setIsReload}
                    setDpCdList={setDpCdList}
                />
            </GridItem>
            {/* 권한그룹 목록 */}
            <GridItem colSpan={2} rowSpan={5}>
                <DepGrpBox 
                    setRgCd = {setRgCd}
                    dpCd={dpCd}
                    setDpCd={setDpCd}
                    setKeyword={setKeyword}
                    roleGrpList={roleGrpList}
                    totalCount={totalCount}
                    handleSearchBtn={handleSearchBtn}
                    checkedList={checkedList}
                    setCheckedList={setCheckedList}
                    dpCdList={dpCdList}
                    setIsReload={setIsReload}
                    isReload={isReload}
                />
            </GridItem>
            {/* 메뉴 목록 */}
            <GridItem colSpan={3} rowSpan={5}>
                <MenuBox
                    rgCd={rgCd} // 선택되는 권한그룹 코드
                    type={'dpCd'}   // 권한맵핑 기준
                    code={dpCd} // 회사/부서/조직 코드
                    grpNm={keyword} // 검색할 권한그룹명
                    modify={false}
                />
            </GridItem>
        </Grid>
    );
};

export default DepRole;