import { Box, Image, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import douzoneImg from 'assets/img/auth/douzoneImg.png';
import ResultCard from './compoent/ReultList/ResultCard';
import SearchBox from './compoent/SearchBox/SearchBox';

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
            >
                <Image
                    fit={'fill'}
                    src={douzoneImg}
                    w={'100%'}
                    h={'100%'}
                    position={'absolute'}
                />
                <Box
                    w={'100%'}
                    h={'100%'}
                   bg={'rgba(0,0,0,0.3)'}
                   opacity={'80%'}
                ></Box>
            </Box>
            {/* 검색창 */}
            <Box
                position={'absolute'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                top={0}
                right={0}
                bottom={0}
                w={'100%'}
            >
                <SearchBox />
            </Box>

        </>
    );
};
export default HomePage;