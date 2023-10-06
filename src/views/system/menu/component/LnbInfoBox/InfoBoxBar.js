import { Box , Button, Text, Flex, useColorModeValue} from '@chakra-ui/react/dist/chakra-ui-react.cjs';
import React from 'react';

const InfoBoxBar = ({title}) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    return (
       
       
          <Flex
            align={{ sm: "flex-start", lg: "center" }}
            justify="space-between"
            w="100%"
            px="22px"
            pb="20px"
            mb="10px"
  
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
            </Flex>
          </Flex>
    
 
    );
};

export default InfoBoxBar;