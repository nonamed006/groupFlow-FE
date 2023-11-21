import { Box, Text } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useEffect, useState } from "react";
import { roleGrpSchema } from "common/Schema";

import SearchBar from "./SearchBarRoleGrp";
import GroupCardList from "./GroupCardList";
import ModalLayout from "common/modal/ModalLayout";
import GroupAddBox from "./GroupAddBox";
import CardMenuBar from "common/component/CardMenuBar";
import { useInView } from 'react-intersection-observer';

import BottomDrawer from "common/component/BottomDrawer";
import { UseDrawerOpen } from "hook/UseDrawerOpen";
import DeleteModal from "common/modal/DeleteModal";
import api from "api/Fetch";

const GroupBox = ({ setRgCd, rgCd, setAlertInfo, setIsLoading }) => {
    const [keyword, setKeyword] = useState();   // 검색어
    const [searchCorp, setSearchCorp] = useState(); // 검색바에서 선택된 회사 코드
    const [roleGrpList, setRoleGrpList] = useState([]); // 권한그룹 목록
    const [corps, setCorps] = useState([]); // 회사 코드 및 명 목록 (셀렉트박스에서 사용됨)
    const [isAddOpen, setIsAddOpen] = useState(false);    // 권한그룹 추가 모달
    const [isDelOpen, setIsDelOpen] = useState(false);    // 권한그룹 삭제 모달
    const [roleGrp, setRoleGrp] = useState();

    const [init, setInit] = useState(); // 첫로딩, 검색시 초기화

    const [pageNum, setPageNum] = useState(1);  // 요청할 페이지 번호
    const [isLastPage, setIsLastPage] = useState(false);  // 마지막페이지 여부
    const [totalCount, setTotalCount] = useState(); // 총 데이터 갯수
    const [infiniteScrollRef, inView] = useInView();

    const [isDrawer, drawerCnt, isDrawerOpen, isDrawerClose, setCnt] = UseDrawerOpen();
    const [checkedList, setCheckedList] = useState([]);// 선택한 권한 그룹 목록
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        fetchCorpsNm(); // 회사 목록 조회
        fetchRoleGroup(); // 권한그룹 목록 조회
    }, []);

    useEffect(async () => {
        if (inView && !isLastPage) {
            fetchRoleGroup();
        }
    }, [inView]);

    useEffect(() => {
        fetchRoleGroup();
    }, [init]);

    // 권한그룹 목록 조회
    const fetchRoleGroup = async () => {
        await setIsLoading(true);
        let res = await api.roleGrp.getRoleGrpList(searchCorp, keyword, pageNum);
        if (res.status === 200 && res.pageInfo) {
            let { list, total, isLastPage, hasNextPage } = res.pageInfo;
            setRoleGrpList(pageNum === 1 ? list : [...roleGrpList, ...list]);
            setTotalCount(total);
            setIsLastPage(isLastPage);
            if (hasNextPage)
                setPageNum((prev) => prev + 1);
        } else {
            setRoleGrpList([]);
            isDrawerClose();
            setTotalCount(0);
            setIsLastPage(true);
        }
        await setIsLoading(false);
        setRgCd(undefined);
    };

    // 회사명/회사코드 목록 조회
    const fetchCorpsNm = async () => {
        let res = await api.corp.getCorpsNmList();
        if (res.status === 200 && res.data) setCorps(res.data);
        else setCorps([]);
    }

    // 권한그룹 등록
    const fetchRoleGrpSave = async () => {
        let res = await api.roleGrp.postRoleGrp(roleGrp);
        if (res.status === 200) {
            setAlertInfo({
                isOpen: true,
                status: 'success',
                title: res.resultMsg,
                width: 'fit-content'
            });
            setIsAddOpen(!isAddOpen); // 모달창 닫기
            handleSearchBtn();
        } else {
            setAlertInfo({
                isOpen: true,
                status: 'error',
                title: '등록 실패',
                detail: res.resultMsg,
                width: 'fit-content'
            });
        }
    };

    // 검색 버튼 클릭 시
    const handleSearchBtn = () => { // 초기화 
        setPageNum(1);
        setRgCd(undefined); 
        setInit(!init); 
    };

    // 권한그룹 추가 등록 버튼 클릭 시
    const handleAddBtn = () => {
        roleGrpSchema.validate(roleGrp)
            .then(() => {
                fetchRoleGrpSave(); // 권한그룹 등록
            })
            .catch(errors => {
                // 유효성 검사 실패한 경우 에러 메세지 출력
                setAlertInfo({
                    isOpen: true,
                    status: 'warning',
                    title: '등록 실패',
                    detail: errors.message,
                    width: 'fit-content'
                });
            });
    };

    useEffect(() => {
        checkedList.length > 0 ? isDrawerOpen() : isDrawerClose();
    }, [checkedList]);

    //  권한그룹 사용여부 변경
    const fetchRoleGrpModufy = async (useYn) => {
        let res = await api.roleGrp.putRoleGrp({ 'useYn': useYn, 'rgCdList': checkedList });

        if (res.status === 200) {
            setAlertInfo({
                isOpen: true,
                status: 'success',
                title: res.resultMsg,
                width: 'fit-content'
            });
            handleSearchBtn();
        } else {
            setAlertInfo({
                isOpen: true,
                status: 'error',
                title: '수정 실패',
                detail: res.resultMsg,
                width: 'fit-content'
            });
        }
        setIsDelOpen(false);
    };

    //  권한그룹 삭제
    const fetchRoleGrpDelete = async () => {
        let res = await api.roleGrp.deleteRoleGrp(checkedList);

        if (res.status === 200) {
            checkedList.map(code => {
                checkedItemHandler(code, false);
            })

            setAlertInfo({
                isOpen: true,
                status: 'success',
                title: res.resultMsg,
                width: 'fit-content'
            });
            handleSearchBtn();
        } else {
            setAlertInfo({
                isOpen: true,
                status: 'error',
                title: '삭제 실패',
                detail: res.resultMsg,
                width: 'fit-content'
            });
        }
        setIsDelOpen(false);
    };


    // 모달창 열고 닫기
    const changeIsOpen = () => {
        setIsAddOpen(!isAddOpen);
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
        <Box borderRadius="5px" bg="white" h="780px" p="6" backgroundColor="white" >
            <Box>
                {/* 메뉴상단 */}
                <CardMenuBar title={'권한그룹'} count={totalCount ? totalCount : 0} handleOnClik={changeIsOpen} buttonType={true} btnText={'추가'} />
                {/* 검색바 */}
                <SearchBar corps={corps} setKeyword={setKeyword} setSearchCorp={setSearchCorp} handleSearchBtn={handleSearchBtn} />
                {/* 목록 */}

                <Box w={'100%'} display={'inline-block'} overflowX={"auto"} overflowY={"auto"} h={'570px'} >
                    <Box minH={'580px'}>
                        {
                            roleGrpList.length > 0 ?
                                <GroupCardList
                                    checkHandler={checkHandler}
                                    checkedList={checkedList}
                                    rgCd={rgCd}
                                    roleGrpList={roleGrpList}
                                    setRgCd={setRgCd}
                                />
                                :
                                <Text
                                    pt={200}
                                    align={'center'}
                                    fontWeight={600}
                                    color={'lightgray'}
                                    fontSize={'18px'}
                                >
                                    검색된 데이터가 없습니다.</Text>
                        }
                    </Box>
                    <Box ref={infiniteScrollRef} h={'1px'} />
                </Box>

                {/* 권한그룹 추가 모달 */}
                {isAddOpen &&
                    <ModalLayout title={'권한그룹추가'} buttonYn={true} onClose={changeIsOpen} size={'lg'} btnText={'등록'} handleCheck={handleAddBtn}>
                        <GroupAddBox corps={corps} roleGrp={roleGrp} setRoleGrp={setRoleGrp} />
                    </ModalLayout>
                }

                {/* 삭제 확인 모달 */}
                {isDelOpen ?
                    <DeleteModal
                        isOpen={() => setIsDelOpen(true)}
                        onClose={() => setIsDelOpen(false)}
                        handleCheck={fetchRoleGrpDelete}
                    />
                    : ''
                }

                {/* 체크박스 컴포넌트 */}
                {isDrawer &&
                    <BottomDrawer
                        cnt={checkedList.length}
                        handler1={() => fetchRoleGrpModufy(true)}
                        handler2={() => fetchRoleGrpModufy(false)}
                        onDelete={() => setIsDelOpen(true)}
                        isDrawerClose={() => setCheckedList([])}
                        type={1}
                    />
                }
            </Box>



        </Box>
    );
};

export default GroupBox;
