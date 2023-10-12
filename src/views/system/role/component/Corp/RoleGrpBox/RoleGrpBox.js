import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PORT } from "set";


import CardMenuBar from "common/component/CardMenuBar";
import GroupCardList from "views/admin/roleGroup/component/GroupBox/GroupCardList";
import RoleGrpSearchBar from "./RoleGrpSearchBar";


const RoleGrpBox = ({ setRgCd, rgCd, coCd, keyword, setKeyword }) => {
    const [roleGrpList, setRoleGrpList] = useState([]); // 권한그룹 목록

    // 선택한 권한 그룹 목록
    const [checkedRgCd, setCheckedRgCd] = useState();


    useEffect(() => {
        if (coCd !== undefined && coCd !== 'undefined') {
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
        console.log(url);
        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.result === 'success') {
                    setRoleGrpList(res.data);
                    setRgCd(undefined);
                } else {
                    setRoleGrpList([]);
                }

            });
    };


    // 검색 버튼 클릭 시
    const handleSearchBtn = () => {
        // 검색 내용에 따른 목록 조회
        if (coCd !== undefined && coCd !== 'undefined') {
            fetchRoleGroup(); // 권한그룹 목록 조회
        } else {
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
            <CardMenuBar title={'권한그룹'} count={roleGrpList.length} buttonType={false} />
            {/* 검색바 */}
            <RoleGrpSearchBar setKeyword={setKeyword} handleSearchBtn={handleSearchBtn} coCd={coCd}/>
            {/* 목록 */}
            {roleGrpList.length > 0 &&

                <GroupCardList
                    rgCd={rgCd}
                    roleGrpList={roleGrpList}
                    setRgCd={setRgCd}
                    coCd={coCd}
                    total={true}
                />
            }
        </Box>

    );
};

export default RoleGrpBox;
