import { Box, Grid, GridItem, Button, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import GroupCard from "./GroupCard";


const GroupCardList = ({ roleGrpList, setRgCd, rgCd }) => {

    return (
        <Box
            overflowY={"auto"}
            overflowX={'hidden'}
            bg='white'
            borderRadius='lg'
            h={'76%'}
            px={5}>
            {roleGrpList &&
                roleGrpList.map((group, index) => {
                    return (
                        <GroupCard rgCd={rgCd} key={index} group={group} index={index} setRgCd={setRgCd} />
                    );
                })}
        </Box>
    );
};

export default GroupCardList;
