import { Table, Box } from "@chakra-ui/react/dist/chakra-ui-react.cjs";

import React, { useEffect } from "react";
import ListCardTableHeader from "views/system/roleGroup/component/tableList/TableHeader";
import DepGroupTbody from "./DepGroupTbody";

const DepGroup = (props) => {
  const headerGroups = ["부서", "직급", "직책", "사용자명"];
  useEffect(() => {}, [props]);
  return (
    <div>
      <Box minHeight={450}>
        <Table variant="simple" w={"100%"} colorScheme="facebook">
          {/* Thead */}
          <ListCardTableHeader headerGroups={headerGroups} />
          {/* Tbody */}
          <DepGroupTbody dg={props.value} />
        </Table>
      </Box>
    </div>
  );
};

export default DepGroup;
