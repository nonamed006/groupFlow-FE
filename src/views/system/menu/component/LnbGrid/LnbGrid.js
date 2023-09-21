import { Box } from "@chakra-ui/react";
import { useState } from "react";
import LnbGridBar from "./LnbGridBar";
import LnbGridList from "./LnbGridList";

const LnbGrid = ({title}) => {
  const [ list, setList ] = useState([]);

  return(
      <Box borderRadius="lg" bg="white" h="fit-content"  p="6">
          {/* 목록 상단 */}
        <LnbGridBar title={title} count={list&&list.length}/>
          {/* 목록 테이블 */}
        <LnbGridList/>
      </Box>
  );
}

export default LnbGrid;