import { Box, Grid, GridItem, Button, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import GroupCard from "./GroupCard";


const GroupCardList = ({roleGrpList, setRgCd}) => {
   
	return (
        <Box overflowY={"scroll"} overflowX={'hidden'}
        bg='white' borderRadius='lg' h={'80%'} p={2}>
                {roleGrpList &&
                    roleGrpList.map((group, index)=>{
                    return (
                        <GroupCard key={index} group={group} index={index} setRgCd={setRgCd}/>
                    );
                })}
            </Box> 
	);
};

export default GroupCardList;
