import {
    Td,
    Text,
    Tr,
    useColorModeValue,
  } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React from "react";
  import { UseMouseOver } from "hook/UseMouseOver";

  const TableTr = ({data, index, setCoCd}) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

    return (        

              <Tr
                backgroundColor={mouseOverIndex === index ? 'navy.50' : 'white'}
                onMouseOut={onMouseOut}
                onMouseOver={() => {
                    onMouseOver(index)
                }}
                onClick={() => {}}
              >
             
                    <Td align="center" >
                        <Text color={textColor} fontSize="sm" fontWeight="300">
                            {data.dpNm}
                        </Text>
                    </Td>
                    <Td align="center" >
                        <Text color={textColor} fontSize="sm" fontWeight="300">
                            {data.rankNm} / {data.pstnNm}
                        </Text>
                    </Td>
                    <Td align="center" >
                        <Text color={textColor} fontSize="sm" fontWeight="300">
                            {data.empNm} ({data.mailId})
                        </Text>
                    </Td>
                    
              </Tr>


    );
  };
  
  export default TableTr;
  