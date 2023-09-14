import {
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue,
  } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React from "react";
  import { UseMouseOver } from "hook/UseMouseOver";
  import { useDispatch } from "react-redux";
  import { setDataPk } from "redux/solution";

  const ListCardTableTr = ({data, index}) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();
    const dispatch = useDispatch();
    return (          
              <Tr 
                backgroundColor={mouseOverIndex === index ? 'navy.50' : 'white'}
                onMouseOut={onMouseOut}
                onMouseOver={() => {
                    onMouseOver(index)
                }}
                onClick={() => {
                    dispatch(setDataPk(data.coCd));
                  }}
              >
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
  