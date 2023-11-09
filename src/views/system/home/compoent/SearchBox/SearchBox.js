import { Box, Input } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import ResultCard from '../ReultList/ResultCard';
import { debounce } from 'lodash';
import api from 'api/Fetch';

const SearchBox = () => {
    const [keyword, setKeyword] = useState(); // 검색어
    const [resultMenuList, setResultMenuList] = useState([]);

    const dpGrpCd = 'DG230006';

    const handleChange = (e) => {
        setKeyword(e.target.value);
        delayedSearch(e.target.value);
    };

    const delayedSearch = useCallback(
        debounce(async (keyword) => fetchMenuList(keyword), 600),
        []
    );

    const fetchMenuList = async (keyword) => {
        if (keyword === undefined || keyword === 'undefined' || keyword === '') return setResultMenuList([]);
        let res = await api.roleMenu.getRoleMenuBySearch(dpGrpCd, keyword);
        if (res.status === 200) {
            setResultMenuList(res.data);
        } else {
            setResultMenuList([]);
        }

    };

    return (
        <Box
            position={'absolute'}
            w={'30%'}
            mb={'10%'}
        >
            <Input
                borderRadius="5px"
                placeholder='메뉴통합검색'
                bg={'white'}
                h={'50px'}
                fontWeight={500}
                fontSize={'xl'}
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
                    maxH={'350px'}
                    bg={'white'}
                    w={'100%'}
                    borderRadius="5px"
                    opacity={'95%'}
                    overflowY={'auto'}
                >
                    {
                        resultMenuList.length > 0 ?
                            resultMenuList.map((menuInfo, index) => {
                                return <ResultCard menuInfo={menuInfo} index={index} />
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