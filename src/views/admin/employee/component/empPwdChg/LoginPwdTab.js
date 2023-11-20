import React from "react";
import {
  Button,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";

const LoginPwdTab = (props) => {
  return (
    <div>
      <Grid
        templateColumns="repeat(13, 1fr)"
        templateRows="repeat(8, 1fr)"
        gap={2}
      >
        <GridItem colStart={3} colEnd={5} rowStart={4} rowEnd={7}>
          <Text fontSize="sm" fontWeight="600">
            변경 비밀번호
          </Text>
        </GridItem>
        <GridItem colStart={5} colEnd={12} rowStart={4} rowEnd={7}>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={props.show ? "text" : "password"}
              id="loginPwd"
              placeholder="변경할 비밀번호를 입력하세요."
              size="md"
              borderRadius="14px"
              isReadOnly={false}
              onChange={props.handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={props.handleClick}>
                {props.show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </GridItem>
      </Grid>
    </div>
  );
};

export default LoginPwdTab;
