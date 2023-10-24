import { Box } from '@chakra-ui/react';
import CardMenuBar from 'common/component/CardMenuBar';
import React, { useState } from 'react';
import RoleGrpSearchBar from '../../Corp/RoleGrpBox/RoleGrpSearchBar';
import GroupCardList from 'views/admin/roleGroup/component/GroupBox/GroupCardList';
import { useInView } from 'react-intersection-observer';
import { UseDrawerOpen } from 'hook/UseDrawerOpen';
import BottomDrawer from 'common/component/BottomDrawer';
import { PORT } from 'set';

const DepGrpBox = ({setRgCd, rgCd, dpCd, keyword, setKeyword, isReload, setIsReload}) => {
    const [roleGrpList, setRoleGrpList] = useState([]); // 권한그룹 목록

    const [totalCount, setTotalCount] = useState(0); // 총 데이터 갯수
    const [infiniteScrollRef, inView] = useInView();
    const [pageNum, setPageNum] = useState(1);  // 요청할 페이지 번호
    const [isLastPage, setIsLastPage] = useState(false);  // 마지막페이지 여부

    const [isDrawer, drawerCnt, isDrawerOpen, isDrawerClose, setCnt] = UseDrawerOpen();
    const [checkedList, setCheckedList] = useState([]);// 선택한 권한 그룹 목록
    const [isChecked, setIsChecked] = useState(false);
    


    // 검색 버튼 클릭 시
    const handleSearchBtn = () => {
        // 검색 내용에 따른 목록 조회
        if (dpCd !== undefined && dpCd !== 'undefined') {
            //initPageInfo(); // 권한그룹 목록 조회
        } else {
            alert('회사를 선택하세요');
        }
    };


    // 권한그룹 목록 조회
    const fetchRoleGroup = () => {
        let url = `${PORT}/roleCorp/${dpCd}`

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
                setRgCd(undefined);
            });
    };

    // 권한-회사 맵핑 수정 시
    const fetchCheckedRoleGrp = () => {
        let url = `${PORT}/roleDep/${dpCd}`

        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkedList)
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.result === 'success')
                    checkedList.length === 0 && isDrawerClose();
                    alert('수정되었습니다');
            });
    };

    // 체크리스트 추가 및 삭제
    const checkedItemHandler = async (value, isChecked) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, value]);
            return;
        }
        if (!isChecked && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((item) => item !== value));
            return;
        }
        return;
    };

    // 체크박스 핸들러
    const checkHandler = (e, value) => {
        setIsChecked(!isChecked);
        checkedItemHandler(value, e.target.checked);
    };

    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white" w={'450px'}>
            {/* 메뉴상단 */}
            <CardMenuBar title={'권한그룹'} count={totalCount} buttonType={false} />
            {/* 검색바 */}
            <RoleGrpSearchBar
                setKeyword={setKeyword}
                handleSearchBtn={handleSearchBtn}
                code={dpCd}
            />
            {/* 목록 */}
            {roleGrpList.length > 0 &&
                <Box w={'100%'} display={'inline-block'} overflowX={"auto"} overflowY={"auto"} h={'500px'} >
                    <Box minH={'510px'}>
                        <GroupCardList
                            checkHandler={checkHandler}
                            checkedList={checkedList}
                            rgCd={rgCd}
                            roleGrpList={roleGrpList} // 해당 회사의 권한 그룹 목록
                            setRgCd={setRgCd}   // 권한그룹 선택
                            dpCd={dpCd}
                            total={true}    // 내 권한그룹의 전체 메뉴 조회 여부
                        />
                    </Box>
                    <Box ref={infiniteScrollRef} h={'1px'} />
                </Box>
            }
            {isDrawer &&
                <BottomDrawer cnt={checkedList.length} handler={fetchCheckedRoleGrp} isDrawerClose={()=>setCheckedList([])} type={4} />
            }
        </Box>
    );
};

export default DepGrpBox;