import { Box, Input } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import ResultCard from '../ReultList/ResultCard';
import { debounce } from 'lodash';


const SearchBox = () => {
    const [keyword, setKeyword] = useState(); // 검색어
    const [resultMenuList, setResultMenuList] = useState([]);

    const handleChange = (e) => {
        setKeyword(e.target.value);
        delayedSearch(e.target.value);
    };

    const delayedSearch = useCallback(
        debounce(()=>fetchMenuList(), 400),
        []
    );

    const fetchMenuList = () => {
        setResultMenuList(['회사관리', '부서관리']);
    };

    return (
        <Box
            position={'absolute'}
            w={'28%'}
        >
            <Input
                borderRadius="5px"
                placeholder='메뉴통합검색'
                bg={'white'}
                size='lg'
                w={'100%'}
                boxShadow={'lg'}
                border={'5px'}
                onChange={(e) => handleChange(e)}
                name={'keyword'}
            />
            {
                keyword &&
                <Box
                    position={'absolute'}
                    maxH={'150px'}
                    bg={'white'}
                    w={'100%'}
                    borderRadius="5px"
                >
                    {
                        resultMenuList.length > 0 ?
                        resultMenuList.map((menu, index) => {
                                return <ResultCard content={menu} index={index} />
                            })
                            :
                            <ResultCard content={'검색 결과가 없거나, 해당 메뉴에 대한 접근 권한이 없습니다.'} type={'none'} />
                    }
                </Box>
            }
        </Box>
    );
};
export default SearchBox;