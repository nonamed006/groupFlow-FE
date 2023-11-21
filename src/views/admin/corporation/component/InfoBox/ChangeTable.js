import { Table, Text, Box, useColorModeValue } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useEffect } from "react";
import ListCardTableHeader from "views/system/roleGroup/component/tableList/TableHeader";
import ChangeTableTbody from "./ChangeTableTbody";
import Paging from "./Paging";

const ChangeTable = ({ chHistory, handelChangeHistoryBtn }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const headerGroups = ["번호", "변경일시", "변경구분", "회사", "변경자(ID)"];
  return (
    <div>
      <Text fontSize={'18px'} mt={'-2'} fontWeight={600} color={textColor} mb={3}>전체 데이터 : {chHistory.total}건</Text>
      <Box minHeight={380}>
        <Table variant="simple" w={'100%'} colorScheme={'facebook'}>
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
