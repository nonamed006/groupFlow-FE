import { Box, Button, Image, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import errorIcon from 'assets/img/errorIcon/errorIcon.png';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
    // let { type } = useParams() ;
    let params = useParams();
    // 잘못된 타입일 경우 NotFound로 빠지게 하기 위해 추가
    let type = (params.type !== 'NotWorking' && params.type !== 'NoAccess') ? 'NotFound' : params.type;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textNumColor = useColorModeValue("brand.500", "white");

    const errorMsgs = {
        NoAccess: {
            title: '접근 권한',
            subTitle: '이 없습니다.',
            detail: '요청하신 메뉴에 대한 접근 권한이 없습니다.',
        },
        NotFound: {
            title: '찾을 수 없는 페이지',
            subTitle: '입니다.',
            detail: '요청하신 페이지가 존재하지 않거나,\n변경 또는 삭제 되어 사용할 수 없는 페이지입니다.\n주소를 다시 확인해주세요.',
        },
        NotWorking: {
            title: '페이지를 불러올 수 없습니다.',
            detail: '요청하신 페이지를 불러올 수 없습니다.\n잠시후 다시 시도해주세요.',
        },
    };

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
                {
                    type &&
                    <Box
                        m={'auto'}
                        align={'center'}
                        mt={150}
                        w={'550px'}
                    >
                        <Box mb={5}>
                            <Image
                                objectFit='cover'
                                boxSize='120px'
                                src={errorIcon}
                                alt='경고아이콘'
                            />
                        </Box>
                        {
                            type !== 'NotWorking' ?
                                <Box
                                    display={'flex'}
                                    mb={5}
                                    fontSize="38px"
                                    fontWeight="700"
                                    lineHeight="100%"
                                    whiteSpace={'nowrap'}
                                    justifyContent={'center'}
                                >
                                    <Text color={textNumColor}> {errorMsgs[type].title}</Text>
                                    <Text color={textColor}> {errorMsgs[type].subTitle}</Text>
                                </Box>
                                :
                                <Text
                                    color={textColor}
                                    mb={5}
                                    fontSize="38px"
                                    fontWeight="700"
                                    lineHeight="100%"
                                    whiteSpace={'nowrap'}>
                                    {errorMsgs[type].title}
                                </Text>
                        }
                        <Text
                            color={textColor}
                            fontSize="16px"
                            fontWeight="400"
                            marginRight={2}
                            mb={5}
                            w={'450px'}
                            wordBreak={'keep-all'}
                            lineHeight={2}
                            whiteSpace={'pre-wrap'}
                        >
                            {errorMsgs[type].detail}
                        </Text>
                        <NavLink
                            to='/system/home'
                            w={'fit-content'}>
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
                        </NavLink>
                    </Box>
                }

            </Box>

        </Box>
    );
};
export default ErrorPage;