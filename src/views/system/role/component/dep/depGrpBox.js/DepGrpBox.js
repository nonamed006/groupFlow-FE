import { Box, Text } from '@chakra-ui/react';
import CardMenuBar from 'common/component/CardMenuBar';
import React, { useEffect, useState } from 'react';
import RoleGrpSearchBar from '../../Corp/RoleGrpBox/RoleGrpSearchBar';
import GroupCardList from 'views/system/roleGroup/component/GroupBox/GroupCardList';
import { useInView } from 'react-intersection-observer';
import { UseDrawerOpen } from 'hook/UseDrawerOpen';
import BottomDrawer from 'common/component/BottomDrawer';
import { PORT } from 'set';
import Loading from 'common/Loading';
import CommonAlert from 'common/component/CommonAlert';
import api from 'api/Fetch';

const DepGrpBox = ({ setRgCd, coCd, rgCd, dpCd, dpCdList, isReload, setIsReload }) => {
    const [roleGrpList, setRoleGrpList] = useState([]); // 권한그룹 목록
    const [keyword, setKeyword] = useState();   // 권한그룹 검색어
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
    // 로딩
    const [isLoading, setIsLoading] = useState();
    // 공통 alert
    const [alertInfo, setAlertInfo] = useState({ isOpen: false });


    useEffect(() => {
        if(dpCd !== undefined && dpCd !== 'undefined'){
            isDrawerClose();
            fetchRoleGroup(); // 권한그룹 목록 조회
        }
    }, [dpCd]);

    useEffect(async () => {
        if (inView && !isLastPage) {
            fetchRoleGroup();
        }
    }, [inView]);

    useEffect(() => {
        fetchRoleGroup();
    }, [init]);

    useEffect(async () => {
        roleGrpList.map(async (roleGrp) => {
            if (roleGrp.state === 1) {
                await checkedList.includes(roleGrp.rgCd);
                await checkedItemHandler(roleGrp.rgCd, true);
            }
        });
    }, [roleGrpList]);

    // 권한그룹 목록 조회
    const fetchRoleGroup = async () => {
        setIsLoading(true);
        let res = await api.roleDep.getRoleGrpList(coCd, dpCd, keyword, pageNum);
        if (res.status === 200 && res.pageInfo) {
            let { list, total, isLastPage, hasNextPage } = res.pageInfo;
            setRoleGrpList(pageNum === 1 ? list : [...roleGrpList, ...list]);
            setTotalCount(total);
            setIsLastPage(isLastPage);
            if (hasNextPage)
              setPageNum((prev) => prev + 1);
          } else {
            setRoleGrpList([]);
            setTotalCount(0);
            setIsLastPage(true);
          }
        setIsLoading(false);
        setCheckedList([]);
        //setRgCd(undefined);
    };

// 권한-부서 맵핑 수정 시
const fetchCheckedRoleGrp = async () => {
    
    let arr = [];
    let list = new Object();
    list.rgCdList = checkedList;
    list.dpCdList = dpCdList;
    arr.push(list);

    let res = await api.roleDep.postRoleDepList(list);
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
       // setIsReload(!isReload);
    };
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

// 검색 시
const handleSearchBtn = () => {
    setInit(!init);
}
return (
    <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white" >
        {/* 메뉴상단 */}
        <CardMenuBar title={'권한그룹'} count={totalCount} buttonType={false} />
        {/* 검색바 */}
        <RoleGrpSearchBar
            setKeyword={setKeyword}
            handleSearchBtn={handleSearchBtn}
            code={dpCd}
        />
        {/* 목록 */}
        <Box w={'100%'} display={'inline-block'} overflowX={"auto"} overflowY={"auto"} h={'500px'} >
            <Box minH={'510px'}>
                {
                    roleGrpList.length > 0 ?
                        <GroupCardList
                            checkHandler={checkHandler}
                            checkedList={checkedList}
                            rgCd={rgCd}
                            roleGrpList={roleGrpList} // 해당 회사의 권한 그룹 목록
                            setRgCd={setRgCd}   // 권한그룹 선택
                            code={dpCd}
                            total={true}    // 내 권한그룹의 전체 메뉴 조회 여부
                        />
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
            {
                isLoading ?
                    <Loading />
                    :
                    <Box ref={infiniteScrollRef} h={'1px'} />
            }
        </Box>

        {isDrawer &&
            <BottomDrawer cnt={checkedList.length} handler1={fetchCheckedRoleGrp} isDrawerClose={() => setCheckedList([])} type={4} />
        }
        {
            alertInfo.isOpen &&
            <CommonAlert
                alertInfo={alertInfo}
                setAlertInfo={setAlertInfo}
            />
        }
    </Box>
);
};

export default DepGrpBox;