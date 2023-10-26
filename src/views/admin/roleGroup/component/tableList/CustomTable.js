import { Table } from "@chakra-ui/react";
import React from "react";

import TableBody from "./TableBody";
import TableHeader from "./TableHeader";


const CustomTable = ({ groupHeader, dataList }) => {
    return (

        <Table  w={'100%'} variant="simple" colorScheme={'facebook'}>
            <TableHeader headerGroups={groupHeader} />
            <TableBody  dataList={dataList}/>
        </Table>


    );
};

export default CustomTable;
