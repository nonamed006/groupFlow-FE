import {
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import { minTimeDate } from "common/common";
import React from "react";
import { useSelector } from "react-redux";
import EmpDeptInput from "./EmpDeptInput";

const EmpTab2 = (props) => {
  return (
    <div>
      <Grid
        overflowY={'scroll'} overflowX={'hidden'}
        h={'600px'}
        p={3}
      >
        {props.empDept?.map((column, index) => (
          <EmpDeptInput column={column} handleChange={props.handleChange}/>
        ))}
      </Grid>
    </div>
  );
};

export default EmpTab2;
