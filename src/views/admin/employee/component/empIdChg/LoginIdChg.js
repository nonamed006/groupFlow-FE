import { Button, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import React from "react";

const LoginIdChg = (props) => {
  return (
    <div>
      <Grid
        templateColumns="repeat(13, 1fr)"
        templateRows="repeat(8, 1fr)"
        gap={2}
      >
        <GridItem colStart={3} colEnd={5} rowStart={3} rowEnd={5}>
          <Text fontSize="sm" fontWeight="600">
            현재 ID
          </Text>
        </GridItem>
        <GridItem colStart={5} colEnd={11} rowStart={3} rowEnd={5}>
          <Input
            id="loginId"
            placeholder="로그인 ID"
            size="md"
            borderRadius="14px"
            isReadOnly={true}
            value={props.loginId}
          />
        </GridItem>
        <GridItem colStart={3} colEnd={5} rowStart={6} rowEnd={8}>
          <Text fontSize="sm" fontWeight="600">
            변경 ID
          </Text>
        </GridItem>
        <GridItem colStart={5} colEnd={11} rowStart={6} rowEnd={8}>
          <Input
            id="loginId"
            placeholder="변경할 ID를 입력해주세요."
            size="md"
            borderRadius="14px"
            isReadOnly={false}
            onChange={props.handleChange}
          />
        </GridItem>
        <GridItem colStart={11} colEnd={13} rowStart={6} rowEnd={8}>
          <Button variant="brand" onClick={()=> props.chkEmpId()}>중복확인</Button>
        </GridItem>
      </Grid>
    </div>
  );
};

export default LoginIdChg;
