import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchCardBar from "./component/SearchCardBar";
import ListCard from "./component/ListCard";
import InfoBox from "./component/InfoBox";

const Approval = () => {
  useEffect(() => {}, []);

  return (
    <Box h={"full"}>
      {/* pt={{ base: "130px", md: "80px", xl: "80px" }} 혜윤 수정 */}
      <Grid
        //h="1000px"
        h="full" // 혜윤 수정
        templateRows="repeat(11, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={5}
      >
        {/* 검색창 */}
        <GridItem colSpan={6} rowSpan={1}>
          <SearchCardBar />
        </GridItem>
        {/* 회사목록 */}
        <GridItem colSpan={2} rowSpan={5}>
          <ListCard title={"회사"} />
        </GridItem>
        {/* 회사정보 */}
        <GridItem colSpan={4} rowSpan={5}>
          <InfoBox />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Approval;
