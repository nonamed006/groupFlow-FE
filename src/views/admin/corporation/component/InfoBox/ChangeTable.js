import { Table, Text, Box } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useEffect } from "react";
import ListCardTableHeader from "views/admin/roleGroup/component/tableList/TableHeader";
import ChangeTableTbody from "./ChangeTableTbody";
import Paging from "./Paging";

const ChangeTable = ({ chHistory, handelChangeHistoryBtn }) => {
  const headerGroups = ["번호", "변경일시", "변경구분", "회사", "변경자(ID)"];
  console.log(chHistory);
  return (
    <div>
      <Text>전체 데이터 : {chHistory.total}건</Text>
      <Box minHeight={450}>
        <Table variant="simple" w={"100%"}>
          {/* Thead */}
          <ListCardTableHeader headerGroups={headerGroups} />
          {/* Tbody */}
          <ChangeTableTbody chHistory={chHistory} />
        </Table>
      </Box>
      <Box>
        <Paging
          chHistory={chHistory}
          handelChangeHistoryBtn={handelChangeHistoryBtn}
        ></Paging>
      </Box>
    </div>
  );
};

export default ChangeTable;
