import { Tbody } from "@chakra-ui/react";
import React from "react";

import TableTr from "./TableTr";

const TableBody = ({ dataList }) => {

    return (
        <Tbody>
            {dataList &&
                dataList.map((data, index) => {
                    return <TableTr data={data} key={index} index={index} />
            })}
        </Tbody>
    );
};

export default TableBody;
