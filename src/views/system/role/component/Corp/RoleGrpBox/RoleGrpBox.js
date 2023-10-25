import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';

import CardMenuBar from "common/component/CardMenuBar";
import GroupCardList from "views/admin/roleGroup/component/GroupBox/GroupCardList";
import RoleGrpSearchBar from "./RoleGrpSearchBar";

import BottomDrawer from "common/component/BottomDrawer";
import { UseDrawerOpen } from "hook/UseDrawerOpen";
import api from "api/Fetch";
import CommonAlert from "common/component/CommonAlert";

const RoleGrpBox = ({ setRgCd, rgCd, coCd, keyword, setKeyword }) => {
    const [roleGrpList, setRoleGrpList] = useState([]); // 권한그룹 목록

    const [init, setInit] = useState(); // 첫로딩, 검색시 초기화

    // 페이지네이션
    const [pageNum, setPageNum] = useState(1);  // 요청할 페이지 번호
    const [isLastPage, setIsLastPage] = useState(false);  // 마지막페이지 여부
    const [totalCount, setTotalCount] = useState(); // 총 데이터 갯수
    const [infiniteScrollRef, inView] = useInView();

    // 체크박스
    const [isDrawer, drawerCnt, isDrawerOpen, isDrawerClose, setCnt] = UseDrawerOpen();
    const [checkedList, setCheckedList] = useState([]);// 선택한 권한 그룹 목록
    const [isChecked, setIsChecked] = useState(false);

    const [alertInfo, setAlertInfo] = useState({
		isOpen: false
	});
    
    useEffect(() => {
        isDrawerClose();
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
    const fetchRoleGroup = async () => {
        let res = await api.roleCorp.getRoleGrpList(coCd, keyword, pageNum);
        if (res.status === 200 && res.pageInfo ) {
            let { list, total, isLastPage, hasNextPage } =  res.pageInfo;
            setRoleGrpList(pageNum === 1 ? list : [...roleGrpList, ...list]);
            setTotalCount(total);
            setIsLastPage(isLastPage);
            if (hasNextPage)
                setPageNum((prev)=>prev+1);
        } else {
            setRoleGrpList([]);
            setIsLastPage(true);
            setTotalCount(0);
        }
        setCheckedList([]);
        setRgCd(undefined);
    };

    useEffect(async () => {
        roleGrpList.map(async (roleGrp) => {
            if (roleGrp.state === 1) {
                await checkedList.includes(roleGrp.rgCd);
                await checkedItemHandler(roleGrp.rgCd, true);
            }
        });
    }, [roleGrpList]);

    useEffect(() => {
        checkedList.length > 0 && isDrawerOpen();
    }, [checkedList]);

    // 검색 버튼 클릭 시
    const handleSearchBtn = () => {
        // 검색 내용에 따른 목록 조회
        if (coCd !== undefined && coCd !== 'undefined') {
            initPageInfo(); // 권한그룹 목록 조회
        } else {
            setAlertInfo({
                isOpen: true,
                status: 'warning',
                title: '회사를 선택하세요',
                width: 'fit-content'
            });
        }
    };

    // 검색 버튼 클릭 시
    const initPageInfo = () => { // 초기화 
        setPageNum(1);
        setInit(!init);
    };

    // 권한-회사 맵핑 수정 시
    const fetchCheckedRoleGrp = async () => {
        let res = await api.roleCorp.putRoleCorpList(coCd, checkedList);
        console.log(res);
        if (res.status === 200) {
            checkedList.length === 0 && isDrawerClose();
            setAlertInfo({
                isOpen: true,
                status: 'success',
                title: res.resultMsg,
                width: 'fit-content'
            });
        } else {
            setAlertInfo({
                isOpen: true,
                status: 'error',
                title: '수정 실패',
                detail: res.resultMsg,
                width: 'fit-content'
            });
        }
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
        <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white">
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
                            checkHandler={checkHandler}
                            checkedList={checkedList}
                            rgCd={rgCd}
                            roleGrpList={roleGrpList} // 해당 회사의 권한 그룹 목록
                            setRgCd={setRgCd}   // 권한그룹 선택
                            code={coCd}
                            total={true}    // 내 권한그룹의 전체 메뉴 조회 여부
                        />
                    </Box>
                    <Box ref={infiniteScrollRef} h={'1px'} />
                </Box>
            }
            {isDrawer &&
                <BottomDrawer cnt={checkedList.length} handler1={fetchCheckedRoleGrp} isDrawerClose={() => setCheckedList([])} type={4} />
            }
             {alertInfo.isOpen &&
				<CommonAlert
					alertInfo={alertInfo}
					setAlertInfo={setAlertInfo}
				/>
			}
        </Box>


    );
};

export default RoleGrpBox;
