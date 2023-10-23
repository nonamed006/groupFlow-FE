import {
  Button,
  Text,
  useColorModeValue,
  Grid,
  GridItem,
  Stack,
  Flex,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import { useEffect, useState } from "react";
const InfoBox = ({
  updateBtn,
  deleteBtn,
  setEditState,
  setDepDto,
  tabStatus,
  setTabStatus,
}) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  useEffect(() => {});
  return (
    <Flex marginBottom={5}>
      {tabStatus === 1 ? (
        <Stack direction="row" spacing={4}>
          <Button
            variant="action"
            textColor={textColor}
            background={"#E2E8F0"}
            borderRadius={"10"}
            fontWeight="600"
            onClick={() => {
              setEditState("update");
              setTabStatus(2);
            }}
          >
            수정
          </Button>
          <Button
            variant="action"
            onClick={() => {
              deleteBtn();
            }}
          >
            삭제
          </Button>
        </Stack>
      ) : (
        <Stack direction="row" spacing={4}>
          <Button
            variant="action"
            onClick={() => {
              updateBtn();
            }}
          >
            저장
          </Button>
          <Button
            variant="action"
            onClick={() => {
              setDepDto([]);
              setTabStatus(1);
              setEditState("read");
            }}
          >
            취소
          </Button>
        </Stack>
      )}
    </Flex>
  );
};

export default InfoBox;
