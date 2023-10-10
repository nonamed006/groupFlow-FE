import { Table } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import ListCardTableHeader from "views/admin/roleGroup/component/tableList/TableHeader";
import ChangeInsertTableTbody from "./ChangeInsertTableTbody";
const ChangeInsertTable = ({ detail }) => {
  const headerGroups = ["항목명", "추가정보"];

  return (
    <Table variant="simple" w={"100%"}>
      {/* Thead */}
      <ListCardTableHeader headerGroups={headerGroups} />
      {/* Tbody */}
      <ChangeInsertTableTbody detail={detail} />
    </Table>
  );
};

export default ChangeInsertTable;
