import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import ResultCard from './ResultCard';
import { useHistory } from 'react-router-dom';

const ResultList = ({ index, gnbNm, resultMenuList, keyword }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const history = useHistory();

    // url 이동 함수
    const handleUseHistory = (url) => {
        history.push('/MU000000' + url);
    };

    return (
        <>
            <Text
                key={index}
                w={'93%'}
                fontSize="18px"
                fontWeight="600"
                color={textColor}
                m={2}
                ml={4}
            >{gnbNm}
            </Text>
            {
                resultMenuList.map((menuInfo, index) => {
                    return menuInfo.gnbNm === gnbNm &&
                        <ResultCard key={index} menuInfo={menuInfo} index={index} keyword={keyword} handleUseHistory={handleUseHistory} />
                })
            }
            <Box borderBottom={'1px'} w={'95%'} color={'lightgray'} ml={3} />
        </>
    );
};
export default ResultList;