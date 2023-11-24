import React from "react";
import { Box, Button, Select, Grid, Text, GridItem } from "@chakra-ui/react";

const SearchCardBar = ({ setUseYn, setKeyword, handleSearchBtn }) => {
  return (
    <Box borderRadius="lg" bg="white" p="6">
      {/*  w={"93%"} 혜윤 수정 */}
      <Grid templateColumns="repeat(14, 1fr)" gap={2}>
        <GridItem colSpan={14}>
          <Text align={"center"} fontWeight={600} fontSize={"18px"}>
            회계관리 페이지 입니다.
          </Text>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default SearchCardBar;
