import { Box, Text } from '@chakra-ui/react';
import CardMenuBar from 'common/component/CardMenuBar';
import React, { useEffect, useState } from 'react';
import RoleGrpSearchBar from '../../Corp/RoleGrpBox/RoleGrpSearchBar';
import GroupCardList from 'views/system/roleGroup/component/GroupBox/GroupCardList';
import { UseDrawerOpen } from 'hook/UseDrawerOpen';
import BottomDrawer from 'common/component/BottomDrawer';
import api from 'api/Fetch';

const DepGrpBox = ({ setRgCd, coCd, rgCd, dpCd, dpCdList, setIsLoading, setAlertInfo }) => {
    const [roleGrpList, setRoleGrpList] = useState([]); // 권한그룹 목록
    const [keyword, setKeyword] = useState();   // 권한그룹 검색어
    const [init, setInit] = useState(); // 첫로딩, 검색시 초기화

    const [totalCount, setTotalCount] = useState(0); // 총 데이터 갯수

    // 체크박스
    const [isDrawer, drawerCnt, isDrawerOpen, isDrawerClose, setCnt] = UseDrawerOpen();
    const [checkedList, setCheckedList] = useState([]);// 선택한 권한 그룹 목록
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if((coCd !== undefined && coCd !== 'undefined')&&(dpCd !== undefined && dpCd !== 'undefined')){
            isDrawerClose();
            fetchRoleGroup(); // 권한그룹 목록 조회
        }else{
            setRgCd(undefined);
            setRoleGrpList([]);
        }
    }, [dpCd]);

    useEffect(() => {
        fetchRoleGroup();
    }, [init]);

    // 권한그룹 목록 조회
    const fetchRoleGroup = async () => {
        if((coCd === undefined || coCd === 'undefined')&&(dpCd === undefined || dpCd === 'undefined')){return;}
        setIsLoading(true);
        let res = await api.roleDep.getRoleGrpList(coCd, dpCd, keyword);
        if (res.status === 200) {
            setRoleGrpList(res.data);
            setTotalCount(res.data.length);
          } else {
            setRoleGrpList([]);
            setTotalCount(0);
          }
        setRgCd(undefined);
        setIsLoading(false);
        setCheckedList([]);
    };

// 권한-부서 맵핑 수정 시
const fetchCheckedRoleGrp = async () => {
    setIsLoading(true);
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
    setIsLoading(false);
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
    if (dpCd !== undefined && dpCd !== 'undefined') {
        setInit(!init);
        setRgCd(undefined);
    } else {
        setAlertInfo({
            isOpen: true,
            status: 'warning',
            title: '부서를 선택하세요',
            width: 'fit-content'
        });
    }
}
return (
    <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white" >
        {/* 메뉴상단 */}
        <CardMenuBar title={'권한그룹'} count={totalCount} buttonType={false} />
        {/* 검색바 */}
        <RoleGrpSearchBar
            setKeyword={setKeyword}
            handleSearchBtn={handleSearchBtn}
            code={dpCd? dpCd:coCd}
        />
        {/* 목록 */}
        <Box w={'100%'} display={'inline-block'} overflowX={"auto"} overflowY={"auto"} h={'500px'}>
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

        {isDrawer &&
            <BottomDrawer cnt={checkedList.length} handler1={fetchCheckedRoleGrp} isDrawerClose={() => setCheckedList([])} type={4} />
        }
    </Box>
);
};

export default DepGrpBox;