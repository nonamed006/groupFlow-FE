import { Table, Text } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useEffect } from "react";
import ListCardTableHeader from "views/admin/roleGroup/component/tableList/TableHeader";
import ChangeTableTbody from "./ChangeTableTbody";
import Paging from "./Paging";

const ChangeTable = ({ chHistory, handelChangeHistoryBtn }) => {
  const headerGroups = ["번호", "변경일시", "변경구분", "회사", "변경자(ID)"];

  return (
    <div>
      <Table variant="simple" w={"100%"}>
        {/* Thead */}
        <ListCardTableHeader headerGroups={headerGroups} />
        {/* Tbody */}
        <ChangeTableTbody chHistory={chHistory} />
      </Table>
      <Paging
        chHistory={chHistory}
        handelChangeHistoryBtn={handelChangeHistoryBtn}
      ></Paging>
    </div>
  );
};

export default ChangeTable;
