import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React, { useState } from "react";
  import { useEffect } from "react";
  import { PORT } from "set";
import ListCardTable from "./ListCardTable";
import ListCardBar from "./ListCardBar";


  const ListCard = ({title,headerGroups, listData }) => {  

    return (
        <Box borderRadius="lg" bg="white" h="200%" p="6">
            {/* 목록 상단 */}
          <ListCardBar title={title} count={listData.length}/>
            {/* 목록 테이블 */}
          <ListCardTable headerGroups={headerGroups} listData={listData}/>
        </Box>
    );
  };
  
  export default ListCard;
  