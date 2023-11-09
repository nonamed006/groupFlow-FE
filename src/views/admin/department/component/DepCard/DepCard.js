import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Button,
  Spacer,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import { useEffect, useState } from "react";
import RealGrid from "./RealGrid";
import Loading from "common/Loading";
import { useInView } from "react-intersection-observer";

const DepCard = ({ org, setDpCd, setEditState, setTabStatus, isLoading }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [infiniteScrollRef, inView] = useInView();

  useEffect(() => {}, []);

  return (
    <>
      <Box borderRadius="lg" bg="white" h="700px" p="6"> {/*  w={"450px"} 혜윤 수정 */}
        <Box display="flex" bg="white" mb={4}>
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="40px"
          >
            조직도
          </Text>
          <Spacer />
          <Button
            variant="action"
            onClick={() => {
              setDpCd(0);
              setEditState("update");
              setTabStatus(2);
            }}
          >
            추가
          </Button>
        </Box>
        <Box w={"100%"} display={"inline-block"} height={"502px"}>
          <Box w="518px" minH={"560px"} display={"flex"} px="6" h="fit-content">
            <RealGrid
              org={org}
              setDpCd={setDpCd}
              setTabStatus={setTabStatus}
              setEditState={setEditState}
            ></RealGrid>
          </Box>
        </Box>
        {isLoading ? <Loading /> : <Box ref={infiniteScrollRef} h={"1px"} />}
      </Box>
    </>
  );
};

export default DepCard;
