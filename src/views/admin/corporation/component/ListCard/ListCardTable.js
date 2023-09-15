import {
    Flex,
    Text,
    Table,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React from "react";
import ListCardTableTbody from "./ListCardTableTbody";

  const ListCardTable = ({headerGroups, listData }) => {

    return (
          <Table variant="simple" color="gray.500" >
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
            <ListCardTableTbody listData={listData} />

          </Table>

    );
  };
  
  export default ListCardTable;
  