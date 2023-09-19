import { Box, Grid, GridItem, Button, useDisclosure } from '@chakra-ui/react';

import React, { useState } from "react";
import SearchBar from "./SearchBar";
import OrgList from './OrgList';
import DepGrpCardList from './DepGrpCardList';
import DepGrpInfo from './DepGrpInfo';

const OrgChartBox = ({ onClose, isOpen }) => {
    const [depList, setDepList] = useState(); // 회사 및 부서 데이터
    const [depGrp, setDepGrp] = useState({
        dpGrpcd: "DG230001", // 조직_그룹 코드
        coCd: "CO230002", // 회사코드
        dpCd: "DP230001", // 부서코드
        empCd: "EM230001", // 사원코드
        coDomain: "", // 회사 도메인  - 하나 조회시
        telNum: '051-111-1111',// 조직_부서 전화번호
        rankNm: "사원", // 직급명 
        pstnNm: "팀원", // 직책명
        empNm: "장은주",  // 사원명
        mailId: "jej",  // 메일 아이디 
        psnMail: null,  // 개인메일 - 하나 조회시
        fileNm: null, // 프로필 파일명
        filePath: null, // 프로필 파일경로
        dpPath: "CO230002/DP230001/DP230002", // 상위부서-현재부서 
        dpPathNm: [ // 상위부서-현재부서 이름
            "test3333",
            "부서명",
            "-부서2"
        ]
    },
    ); // 사원 데이터 하나

    return (

        <Box bg='white' w='auto'>
            <Grid
                h='auto'
                templateColumns='repeat(4, 1fr)'
                gap={4}
                p={3}
            >
                {/* 검색바 */}
                <GridItem colSpan={4}   >
                    <SearchBar />
                </GridItem>
                {/* 조직도 그리드 */}
                <GridItem colSpan={1} rowSpan={5} >
                    <OrgList />
                </GridItem>
                {/* 사원 목록 */}
                <GridItem colSpan={2} rowSpan={5} >
                    <DepGrpCardList />
                </GridItem>
                {/* 사원 정보 */}
                <GridItem colSpan={1} rowSpan={5} >
                    <DepGrpInfo depGrp={depGrp} />
                </GridItem>
            </Grid>
        </Box>
    );
};

export default OrgChartBox;
