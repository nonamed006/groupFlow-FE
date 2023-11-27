import {
  Table,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";

import ListCardTableTbody from "./ListCardTableTbody";
import ListCardHeader from "./ListCardHeader";

const ListCardTable = ({ type, listData, setCoCd, coCd }) => {
  return (
    <Table variant="simple" w={'100%'} colorScheme={'facebook'}>
      {/* Thead */}
      <ListCardHeader type={type}/> 
      {/* Tbody */}
      <ListCardTableTbody type={type} listData={listData} setCoCd={setCoCd} coCd={coCd}/>
    </Table>
  );
};

export default ListCardTable;
