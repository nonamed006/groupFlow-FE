import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import ListCardTable from "./ListCardTable";
import ListCardBar from "./ListCardBar";


  const ListCard = ({title, listData }) => {  
    const headerGroups = ["회사코드", "회사명", "대표자", "구분"];
    return (
        <Box borderRadius="lg" bg="white" h="700px"  p="6">
            {/* 목록 상단 */}
          <ListCardBar title={title} count={listData!==undefined?listData.length:0} />
            {/* 목록 테이블 */}
          <ListCardTable headerGroups={headerGroups} listData={listData} />
        </Box>
    );
  };
  
  export default ListCard;
  