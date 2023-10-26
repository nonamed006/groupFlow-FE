import { Box, Image, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ResultCard from '../ReultList/ResultCard';


const SearchBox = () => {
    const [keyword, setKeyword] = useState(); // 검색어
    const [menuList, setMenuList] = useState(['회사관리', '사원관리', '부서관리', '메뉴관리', '권한그룹 설정', '권한설정']);
    const [recommendList, setRecommendList] = useState();

    const onChangeFilter = (keyword) => {
        setKeyword(keyword);
        let list = [];
        menuList.filter((item) => {
            item.includes(keyword) && list.push(item);
        });
        setRecommendList(list);
    };

    return (
        <Box
            position={'absolute'}
            w={'28%'}
        // zIndex={2}
        >
            <Input
                borderRadius="5px"
                placeholder='통합검색'
                bg={'white'}
                size='lg'
                w={'100%'}
                boxShadow={'lg'}
                onChange={(e) => onChangeFilter(e.target.value)}
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
                        recommendList.length > 0 ?
                            recommendList.map((menu, index) => {
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