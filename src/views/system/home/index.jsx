import { Box, Button, Image, Input, Text, useColorModeValue } from '@chakra-ui/react';
import SearchBar from 'common/component/SearchBar';
import React from 'react';
import searchIncon from 'assets/img/auth/searchIcon.png';
const HomePage = () => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textNumColor = useColorModeValue("brand.500", "white");

 
    return (
       <Box
       position={'fixed'}
       overflow={'hidden'}
       w={'100%'}
       h={'100%'}
       zIndex={100}
       top={0}
       right={0}
       bottom={0}
       display={'flex'}
       alignItems={'center'}
       justifyContent={'center'}
       >
        {/* 검색창 */}
        <Box position={'absolute'} w={'25%'}  >
            <Input 
             borderRadius="5px"
             placeholder='통합 검색'
             bg={'white'}
             size='lg'
             w={'100%'}
             />
             {/* <Box w={'10px'}>
                 <Image  
             size={'3px'}

             src={searchIncon} />
             </Box>
             */}
        </Box>

        </Box>
    );
};
export default HomePage;