import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PORT } from "set";

import { roleGrpSchema } from "common/Schema";

import SearchBar from "./SearchBarRoleGrp";
import GroupCardList from "./GroupCardList";
import ModalLayout from "common/modal/ModalLayout";
import GroupAddBox from "./GroupAddBox";
import CardMenuBar from "common/component/CardMenuBar";
import { useInView } from 'react-intersection-observer';

import BottomDrawer from "common/component/BottomDrawer";
import { UseDrawerOpen } from "hook/UseDrawerOpen";

const GroupBox = ({ setRgCd, rgCd }) => {
    const [keyword, setKeyword] = useState();   // 검색어
    const [searchCorp, setSearchCorp] = useState(); // 검색바에서 선택된 회사 코드
    const [roleGrpList, setRoleGrpList] = useState([]); // 권한그룹 목록
    const [corps, setCorps] = useState([]); // 회사 코드 및 명 목록 (셀렉트박스에서 사용됨)
    const [isOpen, setIsOpen] = useState(false);    // 권한그룹 추가 모달
    const [roleGrp, setRoleGrp] = useState();

    const [init, setInit] = useState(); // 첫로딩, 검색시 초기화

    const [pageNum, setPageNum] = useState(1);  // 요청할 페이지 번호
    const [isLastPage, setIsLastPage] = useState(false);  // 마지막페이지 여부
    const [totalCount, setTotalCount] = useState(); // 총 데이터 갯수
    const [infiniteScrollRef, inView] = useInView();


    const [isDrawer, drawerCnt, isDrawerOpen, isDrawerClose, setCnt] = UseDrawerOpen();
    const [checkedList, setCheckedList] = useState([]);// 선택한 권한 그룹 목록
    const [isChecked, setIsChecked] = useState(false);
    const [ useYn, setUseYn ] = useState();

    useEffect(() => {
        isDrawerClose();
        fetchCorpsNm(); // 회사 목록 조회
        fetchRoleGroup(); // 권한그룹 목록 조회
    }, []);

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
        let url = `${PORT}/roleGrp`

        // URL 파라미터 생성
        const params = new URLSearchParams();
        if (searchCorp !== undefined && searchCorp !== 'undefined') params.append("coCd", searchCorp);
        if (keyword !== undefined && keyword !== 'undefined') params.append("grpNm", keyword);
        // 페이지 요청
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
                    setRoleGrpList(pageNum === 1 ? res.pageInfo.list : [...roleGrpList, ...(res.pageInfo.list)]); // 이전 페이지 데이터 리스트에 추가
                    setTotalCount(res.pageInfo.total);  // 총 데이터 수
                    setIsLastPage(res.pageInfo.isLastPage); // 마지막 페이지인지
                    if (res.pageInfo.hasNextPage) {  // 다음페이지가 있다면
                        setPageNum(res.pageInfo.pageNum + 1); // 다음페이지 번호 set
                    }
                } else {
                    setRoleGrpList([]);
                    setIsLastPage(true);
                }
                setRgCd(undefined);
            });
    };

    // 회사명/회사코드 목록 조회
    const fetchCorpsNm = () => {
        let url = `${PORT}/corp/list`;
        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.result === 'success')
                    setCorps(res.data);
            });
    }

    // 권한그룹 등록
    const fetchRoleGrpSave = () => {
        let url = `${PORT}/roleGrp`;
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(roleGrp)
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.result === 'success') {
                    alert("등록되었습니다.");
                    fetchRoleGroup();
                } else {
                    alert("등록실패");
                }
            });
    };

    // 검색 버튼 클릭 시
    const handleSearchBtn = () => { // 초기화 
        setPageNum(1);
        setTotalCount(0);
        setInit(!init);
    };

    // 권한그룹 추가 등록 버튼 클릭 시
    const handleAddBtn = () => {
        roleGrpSchema.validate(roleGrp)
            .then(() => {
                fetchRoleGrpSave(); // 권한그룹 등록
                setIsOpen(!isOpen); // 모달창 닫기
            })
            .catch(errors => {
                // 유효성 검사 실패한 경우 에러 메세지 출력
                alert(errors.message);
            });
    };

    useEffect(() => {
        console.log(checkedList.length);
        checkedList.length > 0 && isDrawerOpen();
    }, [checkedList]);

    //  권한그룹 사용여부 변경
    const fetchRoleGrpModufy = (useYn) => {
        let url = `${PORT}/roleGrp/useYn`;
        let bodyData = {'useYn' : useYn, 'rgCdList':checkedList }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData)
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.result === 'success') {
                    alert("수정되었습니다");
                    checkedList.length === 0 && isDrawerClose();
                    fetchRoleGroup();
                } else {
                    alert("수정실패");
                }
            });
    };

    // 모달창 열고 닫기
    const changeIsOpen = () => {
        setIsOpen(!isOpen);
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

    // 체크박스 전체 선택
    const handleAllCheck = (checked) => {
        if (checked) {
            // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
            const rgCdList = [];
            roleGrpList.forEach((roleGrp) => rgCdList.push(roleGrp.rgCd));
            setCheckedList(rgCdList);
        }
        else {
            // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
            setCheckedList([]);
        }
    }

    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white" >
            {/* 메뉴상단 */}
            <CardMenuBar title={'권한그룹'} count={totalCount} handleOnClik={changeIsOpen} buttonType={true} btnText={'추가'} />
            {/* 검색바 */}
            <SearchBar corps={corps} setKeyword={setKeyword} setSearchCorp={setSearchCorp} handleSearchBtn={handleSearchBtn} />
            {/* 목록 */}
            <Box w={'100%'} display={'inline-block'} overflowX={"auto"} overflowY={"auto"} h={'500px'} >
                <Box minH={'510px'}>
                    <GroupCardList
                        checkHandler={checkHandler}
                        checkedList={checkedList}
                        rgCd={rgCd}
                        roleGrpList={roleGrpList}
                        setRgCd={setRgCd}
                    />
                </Box>
                <Box ref={infiniteScrollRef} h={'1px'} />
            </Box>
            {/* 권한그룹 추가 모달 */}
            {isOpen &&
                <ModalLayout title={'권한그룹추가'} buttonYn={true} onClose={changeIsOpen} size={'lg'} btnText={'등록'} handleCheck={handleAddBtn}>
                    <GroupAddBox corps={corps} roleGrp={roleGrp} setRoleGrp={setRoleGrp} />
                </ModalLayout>
            }

            {isDrawer &&
                useYn? <BottomDrawer cnt={checkedList.length} handler={()=>fetchRoleGrpModufy(true)} isDrawerClose={() => handleAllCheck(false)} type={2} />
                :<BottomDrawer cnt={checkedList.length} handler={()=>fetchRoleGrpModufy(true)} isDrawerClose={() => handleAllCheck(false)} type={1} />
            }
        </Box>

    );
};

export default GroupBox;
