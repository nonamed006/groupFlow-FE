import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PORT } from "set";


import CardMenuBar from "common/component/CardMenuBar";
import GroupCardList from "views/admin/roleGroup/component/GroupBox/GroupCardList";
import SearchBar from "common/component/SearchBar";


const RoleGrpBox = ({ setRgCd, rgCd, coCd }) => {
    const [keyword, setKeyword] = useState();   // 검색어
    const [roleGrpList, setRoleGrpList] = useState([]); // 권한그룹 목록
    
    // 선택한 권한 그룹 목록
    const [checkedRgCd, setCheckedRgCd] = useState();
    

    useEffect(() => {
        if (coCd !== undefined && coCd !== 'undefined'){
            fetchRoleGroup(); // 권한그룹 목록 조회
        }
    }, [coCd]);

    // 권한그룹 목록 조회
    const fetchRoleGroup = () => {
        let url = `${PORT}/roleCorp/${coCd}`

        // URL 파라미터 생성
        const params = new URLSearchParams();
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
                    setRgCd(undefined);
                }else{
                    setRoleGrpList([]);
                }
                    
            });
    };


    // 검색 버튼 클릭 시
    const handleSearchBtn = () => {
        // 검색 내용에 따른 목록 조회
        if (coCd !== undefined && coCd !== 'undefined'){
            fetchRoleGroup(); // 권한그룹 목록 조회
        }else{
            alert('회사를 선택하세요');
        }
    };

    // 권한-회사 수정 시
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
            <CardMenuBar title={'권한그룹'} count={roleGrpList.length} buttonType={false}  />
            {/* 검색바 */}
            <SearchBar  init={coCd} setKeyword={setKeyword} handleSearchBtn={handleSearchBtn} placeholder={'권한명을 입력하세요'} btnText={'검색'} />
            {/* 목록 */}
            <GroupCardList rgCd={rgCd} roleGrpList={roleGrpList} setRgCd={setRgCd} />
        </Box>

    );
};

export default RoleGrpBox;
