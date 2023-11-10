import { Box, Image } from '@chakra-ui/react';
import React from 'react';
import douzoneImg from 'assets/img/auth/douzoneImg.png';
import SearchBox from './compoent/SearchBox/SearchBox';
import test from "assets/img/auth/test.jpg";
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
                    src={test}
                    w={'100%'}
                    h={'100%'}
                    position={'absolute'}
                />
                {/* <Box
                    w={'100%'}
                    h={'100%'}
                   bg={'rgba(0,0,0,0.3)'}
                   opacity={'90%'}
                ></Box> */}
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