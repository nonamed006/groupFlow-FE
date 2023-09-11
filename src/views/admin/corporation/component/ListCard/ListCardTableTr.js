import {
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue,
  } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React from "react";
  
  const ListCardTableTr = ({data}) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    return (          
              <Tr>
                <Flex align="center">
                    <Td>
                        <Text color={textColor} fontSize="sm" fontWeight="600">
                            {data.coCd}
                        </Text>
                    </Td>
                    <Td>
                        <Text color={textColor} fontSize="sm" fontWeight="600">
                            {data.coNm}
                        </Text>
                    </Td>
                    <Td>
                        <Text color={textColor} fontSize="sm" fontWeight="600">
                            {data.ceoNm}
                        </Text>
                    </Td>
                    <Td>
                        <Text color={textColor} fontSize="sm" fontWeight="600">
                            {data.ccNm}
                        </Text>
                    </Td>
                </Flex>
              </Tr>


    );
  };
  
  export default ListCardTableTr;
  