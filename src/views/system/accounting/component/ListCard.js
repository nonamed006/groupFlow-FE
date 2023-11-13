import { Box, Text } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";

const ListCard = ({ title }) => {
  return (
    <Box borderRadius="lg" bg="white" h="700px" p="6">
      <Box
        w={"100%"}
        display={"inline-block"}
        overflowX={"hidden"}
        overflowY={"auto"}
        h={"550px"}
      >
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
    </Box>
  );
};

export default ListCard;
