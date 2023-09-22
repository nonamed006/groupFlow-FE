import {
  Box
} from "@chakra-ui/react"
import React, { useState, useEffect } from "react";
import DepGrpCard from "./DepGrpCard";

const DepGrpCardList = ({setDepGrp, depGrpList}) => {
    
	useEffect(() => {
		
	}, [depGrpList]);

  return (
    <Box overflowY={"auto"} overflowX={'hidden'}
      boxShadow='lg' bg='white' borderRadius='lg' h={'650px'} p={2}>

      {depGrpList&&
	  	depGrpList.map((depGrp) => {
        	return <DepGrpCard depGrp={depGrp} key={depGrp.dpGrpcd} setDepGrp={setDepGrp}/>
      })}
    </Box>
  );
};

export default DepGrpCardList;
