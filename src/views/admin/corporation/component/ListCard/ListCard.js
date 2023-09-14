import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React, { useState } from "react";
  import { useEffect } from "react";
  import { PORT } from "set";
import ListCardTable from "./ListCardTable";
import ListCardBar from "./ListCardBar";


  const ListCard = ({title, listData }) => {  
    const headerGroups = ["회사명", "회사코드", "대표자", "구분"];
    return (
        <Box borderRadius="lg" bg="white" h="700px"  p="6">
            {/* 목록 상단 */}
          <ListCardBar title={title} count={listData&&listData.length} />
            {/* 목록 테이블 */}
          <ListCardTable headerGroups={headerGroups} listData={listData} />
        </Box>
    );
  };
  
  export default ListCard;
  