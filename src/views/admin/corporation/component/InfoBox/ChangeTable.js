import { Table } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useEffect } from "react";
import ListCardTableHeader from "views/admin/roleGroup/component/tableList/TableHeader";
import ChangeTableTbody from "./ChangeTableTbody";

const ChangeTable = ({ chHistory }) => {
  const headerGroups = ["번호", "변경일시", "변경구분", "회사", "변경자(ID)"];

  return (
    <Table variant="simple" w={"100%"}>
      {/* Thead */}
      <ListCardTableHeader headerGroups={headerGroups} />
      {/* Tbody */}
      <ChangeTableTbody chHistory={chHistory} />
    </Table>
  );
};

export default ChangeTable;
