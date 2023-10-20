import { Box } from "@chakra-ui/react"
  
import React from "react";
import RealGrid from "./RealGrid";

  const OrgList = ({ corpDepList, handelGridCd }) => {
    return (
      <Box  boxShadow='lg' borderRadius='lg' h={'650px'} p={2} overflowY={'auto'} >
         {(corpDepList!==undefined && corpDepList!=='undefined')&&
          <RealGrid  handelGrid={handelGridCd} org={corpDepList} />
        } 
      </Box>
    );
  };
  
  export default OrgList;
  