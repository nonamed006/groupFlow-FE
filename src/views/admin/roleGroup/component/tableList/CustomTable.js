import { Box, Grid, useColorModeValue, Button, Flex, Text, Spacer, GridItem, Select, Input, Table, Th, Td, Tr, Tbody, Thead } from "@chakra-ui/react";
import React, { useState } from "react";

import TableBody from "./TableBody";
import TableHeader from "./TableHeader";


const CustomTable = ({ groupHeader, dataList }) => {
    return (

        <Table >
            <TableHeader headerGroups={groupHeader} />
            <TableBody  dataList={dataList}/>
        </Table>


    );
};

export default CustomTable;
