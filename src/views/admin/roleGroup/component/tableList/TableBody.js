import { Box, Grid, useColorModeValue, Button, Flex, Text, Spacer, GridItem, Select, Input, Table, Th, Td, Tr, Tbody, Thead } from "@chakra-ui/react";
import React, { useState } from "react";

import TableTr from "./TableTr";


const TableBody = ({ dataList }) => {

    return (

        <Tbody >
            {dataList.map((data, index) => {
                return <TableTr data={data} index={index} />
            })}
        </Tbody>
    );
};

export default TableBody;
