import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Button,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import { useEffect } from "react";
import RealGrid from "./RealGrid";

const DepCard = ({ org, setDpCd, setEditState, setTabStatus }) => {
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
              setEditState("update");
              setTabStatus(2);
            }}
          >
            추가
          </Button>
        </Flex>
        <RealGrid
          org={org}
          setDpCd={setDpCd}
          setTabStatus={setTabStatus}
          setEditState={setEditState}
        ></RealGrid>
      </Box>
    </div>
  );
};

export default DepCard;
