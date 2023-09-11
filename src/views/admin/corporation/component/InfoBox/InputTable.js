import {
    Table,
    Input,
    Tr,Td,
    useColorModeValue,
    Flex,
  } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React, { useState } from "react";
import ListCardTableTr from "./ListCardTableTbody";
import ListCardTableTbody from "./ListCardTableTbody";
  
  const InputTable = () => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    
    return (
          <Table variant="simple" color="gray.500">
            {/* Tbody */}
            <Tr>
                <Td colSpan={2}>
                    <label for="coCd">회사코드</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="coCd" name="coCd" placeholder="검색어를 입력하세요." size="md" borderRadius="14px" />
                </Td>
                <Td colSpan={2}>
                    <label>사용여부</label>
                </Td>
                <Td colSpan={3}>
                    <Flex >
                        <Input id="coCd" name="coCd"  type="radio"  size="md" borderRadius="14px" />
                    </Flex>
                </Td>
            </Tr>

          </Table>

    );
  };
  
  export default InputTable;
  