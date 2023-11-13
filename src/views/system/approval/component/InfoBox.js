import { Box, Text } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useState } from "react";

const InfoBox = ({}) => {
  return (
    <>
      <Box
        borderRadius="lg"
        bg="white"
        h="700px"
        p="6"
        backgroundColor="white"
        overflowY={"auto"}
      >
        {" "}
        <Text
          pt={200}
          align={"center"}
          fontWeight={600}
          color={"lightgray"}
          fontSize={"18px"}
        >
          검색된 데이터가 없습니다.
        </Text>
      </Box>
    </>
  );
};

export default InfoBox;
