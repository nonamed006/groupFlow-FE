import {
  Button,
  Text,
  useColorModeValue,
  Grid,
  GridItem,
  Stack,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import { useEffect, useState } from "react";
const InfoBox = ({
  title,
  updateBtn,
  deleteBtn,
  setEditState,
  setDepDto,
  tabStatus,
  setTabStatus,
}) => {
  //const [tabStatus, setTabStatus] = useState(1);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  useEffect(() => {});
  return (
    <Grid templateColumns="repeat(15, 1fr)" gap={2}>
      <GridItem colStart={1} colEnd={3}>
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {title}
        </Text>
      </GridItem>

      <GridItem colStart={12} colEnd={16}>
        {tabStatus === 1 ? (
          <Stack direction="row" spacing={4}>
            <Button
              variant="action"
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
                setTabStatus(1);
                setEditState("read");
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
      </GridItem>
    </Grid>
  );
};

export default InfoBox;
