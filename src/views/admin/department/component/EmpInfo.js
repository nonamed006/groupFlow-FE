import { Box,Flex,Text,useColorModeValue,Input, Grid, GridItem } from '@chakra-ui/react/dist/chakra-ui-react.cjs';
import React from 'react';

const EmpInfo = () => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    return (
        <div>
            <Box borderRadius="lg" bg="white" h="600px" p="6">
            <Grid templateColumns='repeat(14, 1fr)' gap={2}>
                <GridItem colSpan={3}>
                <Text color={textColor}
                    fontSize="16px"
                    fontWeight="700"
                    lineHeight="100%"
                    align="right"
                >
                    상위부서
                </Text>
                </GridItem>
                
                <Input placeholder="검색어를 입력하세요." size="md" borderRadius="14px" />
            </Grid>
            </Box>
        </div>
    );
};

export default EmpInfo;