import {
  Table,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";

import ListCardTableTbody from "./ListCardTableTbody";
import ListCardTableHeader from "views/admin/roleGroup/component/tableList/TableHeader";

const ListCardTable = ({ listData, setCoCd }) => {
  const headerGroups = ["회사코드", "회사명", "대표자", "구분"];

  return (
    <Table variant="simple" w={'100%'} >
      {/* Thead */}
      <ListCardTableHeader headerGroups={headerGroups}/>
      {/* Tbody */}
      <ListCardTableTbody listData={listData} setCoCd={setCoCd}/>
    </Table>
  );
};

export default ListCardTable;
