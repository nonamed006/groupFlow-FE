import {
  Text,
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";

import ListCardTableTbody from "./ListCardTableTbody";

const ListCardTable = ({ headerGroups, listData }) => {

  return (
    <Table variant="simple" color="gray.500"  w={'100%'} display={'inline-block'}>
      {/* Thead */}
      <Thead >
        <Tr >
          {headerGroups.map((column, index) => (
            <Th key={index} borderColor="transparent" align="center" >
              <Text>{column}</Text>
            </Th>
          ))}
        </Tr>
      </Thead>

      {/* Tbody */}
      <Tbody >
        <ListCardTableTbody listData={listData} />
      </Tbody>
    </Table>

  );
};

export default ListCardTable;
