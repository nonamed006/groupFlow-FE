import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import CardMenuBar from "common/component/CardMenuBar";
import GroupCardList from "views/system/roleGroup/component/GroupBox/GroupCardList";
import RoleGrpSearchBar from "./RoleGrpSearchBar";

import BottomDrawer from "common/component/BottomDrawer";
import { UseDrawerOpen } from "hook/UseDrawerOpen";
import api from "api/Fetch";

const RoleGrpBox = ({ setRgCd, rgCd, coCd, keyword, setKeyword, setAlertInfo, setIsLoading }) => {
    const [roleGrpList, setRoleGrpList] = useState([]); // 권한그룹 목록

    const [init, setInit] = useState(); // 첫로딩, 검색시 초기화
    const [totalCount, setTotalCount] = useState(0); // 총 데이터 갯수

    // 체크박스
    const [isDrawer, drawerCnt, isDrawerOpen, isDrawerClose, setCnt] = UseDrawerOpen();
    const [checkedList, setCheckedList] = useState([]);// 선택한 권한 그룹 목록
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        isDrawerClose();
        initPageInfo(); // 권한그룹 목록 조회
    }, [coCd]);

    useEffect(() => {
        fetchRoleGroup();
    }, [init]);

    // 권한그룹 목록 조회
    const fetchRoleGroup = async () => {
        await setIsLoading(true);
        let res = await api.roleCorp.getRoleGrpList(coCd, keyword);
        if (res.status === 200) {
            setRoleGrpList(res.data);
            setTotalCount(res.data.length);
        } else {
            setRoleGrpList([]);
            setTotalCount(0);
        }
        setCheckedList([]);
        setRgCd(undefined);
        await setIsLoading(false);
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
        setInit(!init);
    };

    // 권한-회사 맵핑 수정 시
    const fetchCheckedRoleGrp = async () => {
        setIsLoading(true);
        let res = await api.roleCorp.putRoleCorpList(coCd, checkedList);
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

    return (
        <Box borderRadius="5px" bg="white" h="700px" p="6" backgroundColor="white">
            {/* 메뉴상단 */}
            <CardMenuBar title={'권한그룹'} count={totalCount} buttonType={false} />
            {/* 검색바 */}
            <RoleGrpSearchBar
                setKeyword={setKeyword}
                handleSearchBtn={handleSearchBtn}
                code={coCd}
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
                                code={coCd}
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


        </Box >


    );
};

export default RoleGrpBox;
