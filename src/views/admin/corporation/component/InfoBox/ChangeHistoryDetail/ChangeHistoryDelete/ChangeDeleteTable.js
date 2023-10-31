import { Table } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import ListCardTableHeader from "views/system/roleGroup/component/tableList/TableHeader";
import ChangeDeleteTableTbody from "./ChangeDeleteTableTbody";

const ChangeDeleteTable = ({ detail }) => {
  const headerGroups = ["항목명", "삭제정보"];

  return (
    <Table variant="simple" w={"100%"} colorScheme="facebook" >
      {/* Thead */}
      <ListCardTableHeader headerGroups={headerGroups} />
      {/* Tbody */}
      <ChangeDeleteTableTbody detail={detail} />
    </Table>
  );
};

export default ChangeDeleteTable;
