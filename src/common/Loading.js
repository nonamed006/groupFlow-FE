import { Box } from '@chakra-ui/react';
import React from 'react';
import { MoonLoader } from 'react-spinners';
function Loading() {
    return (
        <Box
            // bg={'rgba(0,0,0,0.1)'}
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
            <Box position={'absolute'}>
                <MoonLoader
                    color="#7551FF"
                    size={50}
                    w={'100%'}
                    h={'100%'}
                />
            </Box>
        </Box>
    );
};
export default Loading;
