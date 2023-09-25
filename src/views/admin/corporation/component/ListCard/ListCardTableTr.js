import {
    Td,
    Text,
    Tr,
    useColorModeValue,
  } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React from "react";
  import { UseMouseOver } from "hook/UseMouseOver";

  const ListCardTableTr = ({data, index, setCoCd}) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

    return (        
  
              <Tr
                backgroundColor={mouseOverIndex === index ? 'navy.50' : 'white'}
                onMouseOut={onMouseOut}
                onMouseOver={() => {
                    onMouseOver(index)
                }}
                onClick={() => {
                    setCoCd(data.coCd);
                  }}
              >
             
                    <Td align="center" >
                        <Text color={textColor} fontSize="sm" fontWeight="600">
                            {data.coCd}
                        </Text>
                    </Td>
                    <Td align="center" >
                        <Text color={textColor} fontSize="sm" fontWeight="600">
                            {data.coNm}
                        </Text>
                    </Td>
                    <Td align="center" >
                        <Text color={textColor} fontSize="sm" fontWeight="600">
                            {data.ceoNm}
                        </Text>
                    </Td>
                    <Td align="center" >
                        <Text color={textColor} fontSize="sm" fontWeight="600">
                            {data.ccNm}
                        </Text>
                    </Td>
              </Tr>


    );
  };
  
  export default ListCardTableTr;
  