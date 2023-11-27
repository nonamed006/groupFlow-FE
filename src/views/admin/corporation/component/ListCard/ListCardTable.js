import {
  Table,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";

import ListCardTableTbody from "./ListCardTableTbody";
import ListCardTableHeader from "views/system/roleGroup/component/tableList/TableHeader";

const ListCardTable = ({ type, listData, setCoCd, coCd }) => {
  const headerGroups = ["회사명", "대표자", "회사구분", "사용" ];

  return (
    <Table variant="simple" w={'100%'} colorScheme={'facebook'}>
      {/* Thead */}
      <ListCardTableHeader headerGroups={headerGroups}/> 
      {/* Tbody */}
      <ListCardTableTbody type={type} listData={listData} setCoCd={setCoCd} coCd={coCd}/>
    </Table>
  );
};

export default ListCardTable;
