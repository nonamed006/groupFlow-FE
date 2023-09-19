import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React, { useState } from "react";
  import { useEffect } from "react";
  import { PORT } from "set";
import GnbCardList from "./GnbCardList";
import GnbCardBar from "./GnbCardBar";


  const GnbCard = ({title,headerGroups, listData, onClickCorp }) => {  
    console.log(listData);

    return (
        <Box borderRadius="lg" bg="white" h="fit-content"  p="6">
            {/* 목록 상단 */}
          <GnbCardBar title={title} count={listData&&listData.length}/>
            {/* 목록 테이블(카드형식) */}
          <GnbCardList listData={listData} onClickCorp={onClickCorp}/>
        </Box>
    );
  };
  
  export default GnbCard;
  