import { Box , Button, Text, Flex, useColorModeValue} from '@chakra-ui/react/dist/chakra-ui-react.cjs';
import React from 'react';
import ListCardBar from './ListCardBar';

const InfoBoxBar = ({title}) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    return (
       
        <Box borderRadius="lg" bg="white" h="600px" p="6">
            <Flex
            align={{ sm: "flex-start", lg: "center" }}
            justify="space-between"
            w="100%"
            px="22px"
            pb="20px"
            mb="10px"
            boxShadow="0px 40px 58px -20px rgba(112, 144, 176, 0.26)"
          >
            <Text
              color={textColor}
              fontSize="22px"
              fontWeight="700"
              lineHeight="100%"
            >
              {title}
            </Text>

            <Flex>
                <Button variant="action">저장</Button>
                <Button variant="action">삭제</Button>
                <Button variant="action">변경이력</Button>
            </Flex>
          </Flex>
        </Box>
 
    );
};

export default InfoBoxBar;