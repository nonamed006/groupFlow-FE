import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Grid,
  GridItem,
  Text,
  Box,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";

import React, { useEffect, useState } from "react";
import { UseMouseOver } from "hook/UseMouseOver";

const DepGroup = (props) => {
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();
  //const [dg, setDg] = useState([]);
  useEffect(() => {
    //setDg(props.value);
  }, [props]);
  return (
    <div>
      <Grid
        templateColumns="repeat(15, 1fr)"
        templateRows="repeat(12, 1fr)"
        gap={2}
      >
        <Table w={"600px"}>
          <Thead>
            <Tr>
              <Th>부서</Th>
              <Th>직급</Th>
              <Th>직책</Th>
              <Th>사용자명</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.value.map((item, index) => (
              <Tr
                key={index}
                backgroundColor={onclick === index ? "navy.50" : "white"}
                // onMouseOut={onMouseOut}
                onMouseOver={() => {
                  onMouseOver(index);
                }}
              >
                <Td>{item.dpNm}</Td>
                <Td>{item.rankName}</Td>
                <Td>{item.pstnName}</Td>
                <Td>{item.empNm}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Grid>
    </div>
  );
};

export default DepGroup;
