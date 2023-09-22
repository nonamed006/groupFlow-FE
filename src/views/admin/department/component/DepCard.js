import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import { useDispatch } from "react-redux";
import { setDataPk } from "redux/depDetail";
import React from "react";
import { useEffect } from "react";
import RealGrid from "./RealGrid";
import { useSelector } from "react-redux";
import { useState } from "react";

const DepCard = ({ org, setDpCd }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  useEffect(() => {}, []);

  return (
    <div>
      <Box borderRadius="lg" bg="white" h="600px" p="6">
        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          justify="space-between"
          w="100%"
          px="22px"
          pb="20px"
          mb="10px"
        >
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            조직도
          </Text>
          <Button
            variant="action"
            onClick={() => {
              setDpCd(0);
            }}
          >
            추가
          </Button>
        </Flex>
        <RealGrid org={org} setDpCd={setDpCd}></RealGrid>
      </Box>
    </div>
  );
};

export default DepCard;
