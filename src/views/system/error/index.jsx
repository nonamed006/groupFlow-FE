import { Box, Button, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import errorIcon from 'assets/img/errorIcon/errorIcon.png';
const ErrorPage = (type) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textNumColor = useColorModeValue("brand.500", "white");

    return (
        <Box
            position={'fixed'}
            overflow={'hidden'}
            w={'100%'}
            h={'100%'}
            top={0}
            right={0}
            bottom={0}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Box
                bg="white"
                w={'80%'}
                h={'70%'}
                boxShadow={'lg'}
                borderRadius={'10px'}
                display={'flex'}

            >
                <Box
                    m={'auto'}
                    align={'center'}
                    mt={150}
                >
                    <Box mb={5}>
                        <Image
                            objectFit='cover'
                            boxSize='120px'
                            src={errorIcon}
                            alt='경고아이콘'
                        />
                    </Box>
                    <Box
                        display={'flex'}
                        mb={5}
                        fontSize="38px"
                        fontWeight="700"
                        lineHeight="100%"
                        whiteSpace={'nowrap'}
                    >
                        <Text color={textNumColor}>접근 권한</Text>
                        <Text color={textColor}>이 없습니다.</Text>
                    </Box>
                    <Text
                        color={textColor}
                        fontSize="16px"
                        fontWeight="400"
                        lineHeight="100%"
                        marginRight={2}
                        mb={5}
                    >
                        요청하신 메뉴에 대한 접근 권한이 없습니다.
                    </Text>
                    <Button
                        variant='outline'
                        borderColor={textNumColor}
                        color={textNumColor}
                        borderRadius="10px"
                        fontWeight={600}
                        size='md'
                    >
                        HOME
                    </Button>
                </Box>
            </Box>

        </Box>
    );
};
export default ErrorPage;