
import { Box } from '@chakra-ui/react';
import React from 'react';
import douzoneImg from 'assets/img/auth/douzoneImg.png';
import SearchBox from './compoent/SearchBox/SearchBox';
import testTmp from "assets/img/auth/test_tmp.jpg";

const HomePage = () => {
    return (
        <>
            <Box
                position={'fixed'}
                overflow={'hidden'}
                w={'100%'}
                h={'100%'}
                top={0}
                right={0}
                bottom={0}
                zIndex={-1}
                backgroundImage={douzoneImg}
                backgroundSize={'cover'}
            >
                <Box
                    w={'100%'}
                    h={'100%'}
                   bg={'rgba(0,0,0,0.4)'}
                   opacity={'74%'}
                />
            </Box>
            {/* 검색창 */}
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                w={'100%'}
                h={'100%'}
            >
                <SearchBox />
            </Box>
        </>
    );
};
export default HomePage;
