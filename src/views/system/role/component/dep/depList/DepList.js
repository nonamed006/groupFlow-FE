import { Box, Text } from '@chakra-ui/react';
import CardMenuBar from 'common/component/CardMenuBar';
import React, { useEffect, useState } from 'react';
import SearchBarRoleGrp from 'views/system/roleGroup/component/GroupBox/SearchBarRoleGrp';

import api from "api/Fetch";
import DepRealGrid from './DepRealGrid';

const DepList = ({  tab, setDpCd, setCoCd, setDpPath, setRgCd, setIsLoading }) => {
    const [keyword, setKeyword] = useState(); // 검색어
    const [corps, setCorps] = useState([]); // 회사 코드 및 명 목록 (셀렉트박스에서 사용됨)
    const [searchCoCd, setSearchCoCd] = useState(); // 검색바에서 선택된 회사 코드
    const [org, setOrg] = useState([]); // 조직도 데이터
    const [totalCount, setTotalCount] = useState(0); // 총 데이터 갯수

    useEffect(() => {
        if(tab === 'dep') {
            fetchCorpsNm();
            fetchOrg();
        }
    }, [tab]);

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
            setTotalCount(res.voData.depCount);
        }
        else setOrg([]);
        setRgCd(undefined);
        setIsLoading(false);
    };

    // 검색 버튼 클릭 시
    const handleSearchBtn = () => {
        fetchOrg();
        setCoCd(undefined);
        setDpCd(undefined);
    };

    // 조직도 부서 클릭 시
    const handleClickGrid = (dpCd, coCd, dpPath) => {
        setDpPath(dpPath);
        setCoCd(coCd); 
        setDpCd(dpCd);
    }


    return (
        <Box borderRadius="5px" bg="white" h="700px" p="6">
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
                {
                    org.length > 0 ?
                        <Box borderRadius="lg" bg="white" h="fit-content" display={'flex'} px="6">
                            <DepRealGrid
                                org={org}
                                handleClick={handleClickGrid}
                            />
                        </Box>
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
        </Box >
    );
};

export default DepList;