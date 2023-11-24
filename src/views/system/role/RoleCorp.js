import { Box, Flex } from "@chakra-ui/react";
import { React, useState } from "react";
import RoleGrpBox from "./component/Corp/RoleGrpBox/RoleGrpBox";
import MenuBox from "views/system/roleGroup/component/MenuBox/MenuBox";
import CorpList from "./component/Corp/CorpList/CorpList";

const RoleCorp = ({setAlertInfo, setIsLoading}) => {
    const [rgCd, setRgCd] = useState(); // 선택한 권한그룹 코드
    const [coCd, setCoCd] = useState(); // 선택한 회사코드
    const [keyword, setKeyword] = useState('');   // 권한그룹 검색어

    return (
        <Flex>
            {/* 회사 목록 */}
            <Box w={'580px'} mr={3}>
                <CorpList
                    setCoCd={setCoCd}
                    coCd={coCd}
                    setIsLoading={setIsLoading}
                />
            </Box>
            {/* 권한그룹 목록 */}
            <Box w={'440px'} mr={3}>
                <RoleGrpBox
                    keyword={keyword}
                    setKeyword={setKeyword}
                    coCd={coCd}
                    rgCd={rgCd}
                    setRgCd={setRgCd}
                    setAlertInfo={setAlertInfo}
                    setIsLoading={setIsLoading}
                />
            </Box>
            {/* 메뉴 목록 */}
            <Box w={'800px'} >
                <MenuBox
                    rgCd={rgCd} // 선택되는 권한그룹 코드
                    type={'corp'}   // 권한맵핑 기준
                    code={coCd} // 회사/부서/조직 코드
                    grpNm={keyword} // 검색할 권한그룹명
                    modify={false}
                    setAlertInfo={setAlertInfo}
                    setIsLoading={setIsLoading}
                />
            </Box>
        </Flex>

    );
};

export default RoleCorp;
