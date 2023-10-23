import {
  Button,
  useColorModeValue,
  Stack,
  Flex,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import { useEffect } from "react";

const InfoBox = ({
  depDto,
  updateBtn,
  onOpen,
  setEditState,
  setDepDto,
  tabStatus,
  setTabStatus,
  setAlertInfo,
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
              if (depDto.length === 0 || depDto.dpCd === "") {
                setAlertInfo({
                  isOpen: true,
                  title: "부서를 선택해주세요.",
                  status: "warning",
                  width: "fit-content",
                });
              } else {
                setEditState("update");
                setTabStatus(2);
              }
            }}
          >
            수정
          </Button>
          <Button
            variant="action"
            onClick={() => {
              if (depDto.length === 0 || depDto.dpCd === "") {
                setAlertInfo({
                  isOpen: true,
                  title: "부서를 선택해주세요.",
                  status: "warning",
                  width: "fit-content",
                });
              } else {
                onOpen();
              }
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
