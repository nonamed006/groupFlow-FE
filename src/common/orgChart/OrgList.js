import {
    Box
  } from "@chakra-ui/react"
  
  import React from "react";
import RealGrid from "./RealGrid";


  const OrgList = ({corpDepList}) => {
    return (

      <Box boxShadow='lg' bg='white' borderRadius='lg' h={'650px'} p={2}>
         <RealGrid value={corpDepList}></RealGrid>
        </Box>
    );
  };
  
  export default OrgList;
  