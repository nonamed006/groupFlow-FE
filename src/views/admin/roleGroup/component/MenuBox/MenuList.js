import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import RealGrid from "../RealGrid";


const MenuList = ({list}) => {
    return (
        <Box borderRadius="lg" bg="white" h="fit-content" px="6">
            <RealGrid org={list}  />
        </Box>
    );
};

export default MenuList;
