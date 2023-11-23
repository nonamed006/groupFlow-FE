import { Box } from '@chakra-ui/react';
import React from "react";
import FormInput from 'common/component/FormInput';
import CommonSearchBar from 'common/component/CommonSearchBar';
const SearchBarOrga = ({ search, setKeyword, setSearch, handleSearchBtn }) => {
    const values = [
        {
            value: 'corp',
            name: '회사명',
        },
        {
            value: 'dep',
            name: '부서명',
        },
        {
            value: 'empNm',
            name: '사원명',
        },
        {
            value: 'empId',
            name: '메일ID',
        },
        {
            value: 'rank',
            name: '직급',
        }
    ];
    return (
        <CommonSearchBar 
            handleSearchBtn={handleSearchBtn}
            btnText={'검색'}
        >
            <Box w={'40%'} mr={10}>
            <FormInput
                searchBar={true}
                type={'select'}
                    onChange={(e)=>setSearch(e.target.value)}
                    title={'검색기준'}
                    placeholder={'전체'}

                    values={values}
                    defaultValue={search}
                />
            </Box>
            <Box w={'40%'}>
            <FormInput
                searchBar={true}
                onChange={(e)=>setKeyword(e.target.value)}
                title={'검색어'}
                    placeholder={'검색어를 입력하세요.'}
                    defaultValue={''}
                    name={'keyword'}
                />        
            </Box>
        </CommonSearchBar>
    );
};

export default SearchBarOrga;
