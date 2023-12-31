import {
  Grid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import EmpDeptInput from "./EmpDeptInput";

const EmpTab2 = (props) => {

  return (
    <div> 
      <Grid
        overflowY={'scroll'} overflowX={'hidden'}
        h={'600px'}
        p={3}
      >
        {props.empDept?.map((column, index) => {
          if (column.dpGrpCd != "" || props.editState === "update" || props.editState === "deptInsert" || props.editState === "insert") {
            return <EmpDeptInput
              column={column}
              setAlertInfo={props.setAlertInfo}
              empDept={props.empDept}
              handleChange={props.handleChange}
              editState={props.editState}
              index={index}
              setIsLoading={props.setIsLoading}
              isLoading={props.isLoading} 
              setDelEmpDep={props.setDelEmpDep}
              delEmpDep={props.delEmpDep}
              empDeptTmp={props.empDeptTmp}
              />
          } else if (props.editState === "read") {
            return <Text
              pt={200}
              align={'center'}
              fontWeight={600}
              color={'lightgray'}
              fontSize={'18px'}
            >
              조직정보가 존재하지 않습니다.
            </Text>
          }
        })}
      </Grid>
    </div>
  );
};

export default EmpTab2;
