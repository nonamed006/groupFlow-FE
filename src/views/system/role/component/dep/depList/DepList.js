import { Box } from '@chakra-ui/react';
import CardMenuBar from 'common/component/CardMenuBar';
import SearchBar from "common/component/SearchBar"
import React, { useState } from 'react';
import ListCardTable from 'views/admin/corporation/component/ListCard/ListCardTable';
import GridList from './GridList';

const DepList = ({setDpCd, setIsReload, isReload, fetchRoleGroup}) => {
    const [keyword, setKeyword] = useState(); // 검색어
    const [totalCount, setTotalCount] = useState(0); // 총 데이터 갯수
    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6" w={'450px'}>
            {/* 목록 상단 */}
            <CardMenuBar
                title={'부서'}
                count={totalCount}
                buttonType={false}
            />
            <SearchBar setKeyword={setKeyword} placeholder={'부서명 입력하세요'} btnText={'검색'} />
            {/* 목록 테이블 */}
            <Box w={'100%'} display={'inline-block'} height={'550px'} >
                <Box minH={'560px'} >
                    <GridList setDpCd={setDpCd} setIsReload={setIsReload} isReload={isReload} fetchRoleGroup={fetchRoleGroup}/>
                </Box>
            </Box>

        </Box>
    );
};

export default DepList;