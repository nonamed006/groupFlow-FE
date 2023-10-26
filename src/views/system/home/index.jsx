import { Box, Image, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import douzoneImg from 'assets/img/auth/douzoneImg.png';
import ResultCard from './compoent/ReultList/ResultCard';
import SearchBox from './compoent/SearchBox/SearchBox';

const HomePage = () => {
    return (
        <Box
            position={'fixed'}
            overflow={'hidden'}
            w={'100%'}
            h={'100%'}
            // zIndex={-1}
            top={0}
            right={0}
            bottom={0}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Box
                w={'100%'}
                h={'100%'}
                position={'absolute'}
                zIndex={-100}
            >
                <Image
                    fit={'fill'}
                    src={douzoneImg}
                    zIndex={-100}
                    w={'100%'}
                    h={'100%'}
                    position={'absolute'}
                />
                <Box
                    w={'100%'}
                    h={'100%'}
                    zIndex={-100}
                    bg={'rgba(0,0,0,0.2)'}
                    opacity={'0.8'}
                ></Box>
            </Box>
            {/* 검색창 */}
            <SearchBox />
        </Box>
    );
};
export default HomePage;