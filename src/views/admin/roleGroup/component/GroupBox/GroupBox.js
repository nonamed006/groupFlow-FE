import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PORT } from "set";

import SearchBar from "./SearchBarRoleGrp";
import GroupCardList from "./GroupCardList";
import ModalLayout from "common/modal/ModalLayout";
import GroupAddBox from "./GroupAddBox";
import CardMenuBar from "common/component/CardMenuBar";


const GroupBox = ({ setRgCd, rgCd }) => {
    const [keyword, setKeyword] = useState();   // 검색어
    const [searchCorp, setSearchCorp] = useState(); // 검색바에서 선택된 회사 코드
    const [roleGrpList, setRoleGrpList] = useState([]); // 권한그룹 목록
    const [corps, setCorps] = useState([]); // 회사 코드 및 명 목록 (셀렉트박스에서 사용됨)
    const [isOpen, setIsOpen] = useState(false);    // 권한그룹 추가 모달
    const [roleGrp, setRoleGrp] = useState();

    useEffect(() => {
        fetchCorpsNm(); // 회사 목록 조회
        fetchRoleGroup(); // 권한그룹 목록 조회
    }, []);

    // 권한그룹 목록 조회
    const fetchRoleGroup = () => {
        let url = `${PORT}/roleGrp`

        // URL 파라미터 생성
        const params = new URLSearchParams();
        if (searchCorp !== undefined && searchCorp !== 'undefined') params.append("coCd", searchCorp);
        if (keyword !== undefined && keyword !== 'undefined') params.append("grpNm", keyword);
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
                if (res.result === 'success'){
                    setRoleGrpList(res.data);
                } else{
                    setRoleGrpList([]);
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
    const handleSearchBtn = () => {
        // 검색 내용에 따른 목록 조회
        fetchRoleGroup();
    };

    // 권한그룹 추가 등록 버튼 클릭 시
    const handleAddBtn = () => {
        if (roleGrp.coCd === '')
            alert("회사를 선택해주세요");
        else if (roleGrp.grpNm === '')
            alert("그룹명을 입력하세요");
        else if (roleGrp.useYn === '') {
            setRoleGrp({
                ...roleGrp,
                useYn: true
            });
        } else {
            setIsOpen(!isOpen); // 모달창 닫기
            fetchRoleGrpSave(); // 권한그룹 등록
        }

    };

    // 모달창 열고 닫기
    const changeIsOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6" backgroundColor="white" >
            {/* 메뉴상단 */}
            <CardMenuBar title={'권한그룹'} count={roleGrpList.length} handelOnClik={changeIsOpen} buttonType={true} btnText={'추가'} />
            {/* 검색바 */}
            <SearchBar corps={corps} setKeyword={setKeyword} setSearchCorp={setSearchCorp} handleSearchBtn={handleSearchBtn} />
            {/* 목록 */}
            <GroupCardList rgCd={rgCd} roleGrpList={roleGrpList} setRgCd={setRgCd} />

            {/* 권한그룹 추가 모달 */}
            {isOpen &&
                <ModalLayout title={'권한그룹추가'} buttonYn={true} onClose={changeIsOpen} size={'lg'} btnText={'등록'} handleCheck={handleAddBtn}>
                    <GroupAddBox corps={corps} roleGrp={roleGrp} setRoleGrp={setRoleGrp} />
                </ModalLayout>
            }
        </Box>

    );
};

export default GroupBox;
