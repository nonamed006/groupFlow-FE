import { Box } from '@chakra-ui/react';
import CardMenuBar from 'common/component/CardMenuBar';
import React, { useEffect, useState } from 'react';
import SearchBarRoleGrp from 'views/system/roleGroup/component/GroupBox/SearchBarRoleGrp';

import api from "api/Fetch";
import Loading from 'common/Loading';
import DepRealGrid from './DepRealGrid';

const DepList = ({ setDpCd, setCoCd, setDpCdList }) => {
    const [keyword, setKeyword] = useState(); // 검색어
    const [corps, setCorps] = useState([]); // 회사 코드 및 명 목록 (셀렉트박스에서 사용됨)
    const [searchCoCd, setSearchCoCd] = useState(); // 검색바에서 선택된 회사 코드
    const [org, setOrg] = useState([]); // 조직도 데이터
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0); // 총 데이터 갯수

    useEffect(() => {
        fetchCorpsNm();
        fetchOrg();
    }, []);

    // 회사명/회사코드 목록 조회
    const fetchCorpsNm = async () => {
        let res = await api.corp.getCorpsNmList();
        if (res.status === 200 && res.data) setCorps(res.data);
        else setCorps([]);
    };

    // 조직도 데이터 조회
    const fetchOrg = async () => {
        setIsLoading(true);
        let res = await api.roleEmp.getEmpListByParamApi('N', searchCoCd, keyword, 'dep');
        if (res.status === 200 && res.data) {
            setOrg(res.data);
        }
        else setOrg([]);
        setIsLoading(false);
    };

    // 검색 버튼 클릭 시
    const handleSearchBtn = () => {
        fetchOrg();
    };

    // 조직도 부서 클릭 시
    const handleDpCd = (dpCd, coCd, dpCdArr) => {
       // fetchRoleGroup(dpCd, coCd);
       console.log(dpCd, coCd, dpCdArr);
        setDpCdList(dpCdArr);
        setDpCd(dpCd);
        setCoCd(coCd);
    }


    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6">
            {/* 목록 상단 */}
            <CardMenuBar
                title={'부서'}
                count={totalCount}
                buttonType={false}
            />
            {/* 검색바 */}
            <SearchBarRoleGrp
                setKeyword={setKeyword}
                placeholder={'부서명 입력하세요'}
                setSearchCorp={setSearchCoCd}
                handleSearchBtn={handleSearchBtn}
                corps={corps}
            />
            {/* 목록 테이블 */}
            <Box w={'100%'} display={'inline-block'} height={'550px'} >
                <Box borderRadius="lg" bg="white" h="fit-content" display={'flex'} px="6">
                    <DepRealGrid
                        org={org}
                        // setDpCd={setDpCd} 
                        // setCoCd={setCoCd} 
                        // fetchRoleGroup={fetchRoleGroup} 
                        // setDpCdList={setDpCdList}
                        handleDpCd={handleDpCd}
                    />
                </Box>
            </Box>
            {
            isLoading &&
                <Loading />}
        </Box>
    );
};

export default DepList;