import { Table } from "@chakra-ui/react";
import React from "react";

import TableBody from "./TableBody";
import TableHeader from "./TableHeader";


const CustomTable = ({ groupHeader, dataList }) => {
    return (

        <Table  w={'400px'}>
            <TableHeader headerGroups={groupHeader} />
            <TableBody  dataList={dataList}/>
        </Table>


    );
};

export default CustomTable;
