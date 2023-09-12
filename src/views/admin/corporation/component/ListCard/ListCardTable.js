import {
    Flex,
    Text,
    Table,
    Tbody,
    Th,
    Thead,
    Tr,
    useColorModeValue,
  } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React, { useState } from "react";
import ListCardTableTr from "./ListCardTableTbody";
import ListCardTableTbody from "./ListCardTableTbody";

  const ListCardTable = ({headerGroups, listData, onClickCorp }) => {

    return (
          <Table variant="simple" color="gray.500">
            {/* Thead */}
            <Thead>
                <Flex
                  justify="space-between"
                  align="center"
                  fontSize={{ sm: "10px", lg: "12px" }}
                  color="gray.400"
                > 
                    <Tr>
                        {headerGroups.map((column, index) => (
                            <Th key={index} borderColor="transparent">
                                <Text>{column}</Text>
                            </Th>
                        ))}
                    </Tr> 
              </Flex>
            </Thead>

            {/* Tbody */}
            <ListCardTableTbody listData={listData} onClickCorp={onClickCorp}/>

          </Table>

    );
  };
  
  export default ListCardTable;
  