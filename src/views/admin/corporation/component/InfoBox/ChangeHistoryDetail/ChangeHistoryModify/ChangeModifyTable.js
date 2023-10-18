import { Table } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import ListCardTableHeader from "views/admin/roleGroup/component/tableList/TableHeader";
import ChangeModifyTableTbody from "./ChangeModifyTableTbody";
const ChangeModifyTable = ({ detail }) => {
  const headerGroups = ["항목명", "변경전", "변경후"];
  return (
    <Table variant="simple" w={"100%"}>
      {/* Thead */}
      <ListCardTableHeader headerGroups={headerGroups} />
      {/* Tbody */}
      <ChangeModifyTableTbody detail={detail} />
    </Table>
  );
};

export default ChangeModifyTable;
