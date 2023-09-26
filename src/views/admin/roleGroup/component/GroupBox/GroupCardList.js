import { Box, Grid, GridItem, Button, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import GroupCard from "./GroupCard";


const GroupCardList = ({roleGrpList}) => {
   
	return (
        <Box overflowY={"scroll"} overflowX={'hidden'}
        bg='white' borderRadius='lg' h={'80%'} p={2}>
                {roleGrpList.length>0 &&
                    roleGrpList.map((group, index)=>{
                    return (
                        <GroupCard key={index} group={group} index={index} />
                    );
                })}
            </Box> 
	);
};

export default GroupCardList;
