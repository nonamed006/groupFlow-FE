import { Box, Input } from '@chakra-ui/react';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import ResultCard from '../ReultList/ResultCard';
import { debounce } from 'lodash';
import api from 'api/Fetch';
import ResultList from '../ReultList/ResultList';
import { useSelector } from "react-redux"

const SearchBox = () => {
    const [keyword, setKeyword] = useState(); // 검색어
    const [resultMenuList, setResultMenuList] = useState([]);
    const [gnbNmList, setGnbNmList] = useState([]);
    const formInputRef = useRef(null);
    const empDpType = useSelector(state => state.solution.empData.dpGrpCd);

    useEffect(()=>{
        // 초기화
        onClearSelect();
        setResultMenuList([]);
        setGnbNmList([]);
    },[empDpType]);

    const handleChange = (e) => {
        setKeyword(e.target.value);
        delayedSearch(empDpType, e.target.value);
    };

    const delayedSearch = useCallback(
        debounce(async (empDpType, keyword) => fetchMenuList(empDpType, keyword), 500),
    []);

    const fetchMenuList = async (empDpType, keyword) => {
        if (keyword === undefined || keyword === 'undefined' || keyword === '') {
            setGnbNmList([]);
            setResultMenuList([]);
            return;
        }
        let res = await api.roleMenu.getRoleMenuBySearch(empDpType, keyword);
        if (res.status === 200) {
            setResultMenuList(res.data);
            let temp = [];
            res.data.map((element) => {
                if (!temp.includes(element.gnbNm)) temp.push(element.gnbNm);
            });
            setGnbNmList(temp);
        } else {
            setResultMenuList([]);
            setGnbNmList([]);
        }
    };

    const onClearSelect = () => {
        if (formInputRef.current) {
            formInputRef.current.reset();
            setKeyword();
        }
    };

    return (
        <Box
            w={'32%'}
            mb={'10%'}
            position={'absolute'}
        >
   <form ref={formInputRef} >
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
            </form>
            {
                keyword &&
                <Box
                    position={'absolute'}
                    maxH={'350px'}
                    minH={'50px'}
                    bg={'white'}
                    w={'100%'}
                    borderRadius="5px"
                    opacity={'90%'}
                    overflowY={'auto'}
                    boxShadow={'lg'}
                    mt={1}
                >
                    {
                        resultMenuList.length > 0 ?
                            gnbNmList.map((gnbNm, index) => {
                                return <ResultList  index={index} gnbNm={gnbNm} resultMenuList={resultMenuList} keyword={keyword} />
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