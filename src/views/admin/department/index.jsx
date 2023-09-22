import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchCardBar from "./component/SearchCardBar";
import DepCard from "./component/DepCard";
import DepInfo from "./component/DepInfo/DepInfo";
import { PORT } from "set";

const Test = () => {
  const [selectedCoCd, setSelectedCoCd] = useState("");
  const [searchText, setSearchText] = useState("");
  const [org, setOrg] = useState([]);

  const handleSearchBtn = () => {
    onClickSearchText();
  };
  const onClickSearchText = () => {
    console.log(selectedCoCd);
    let url = `${PORT}/dep?text=${searchText}&coCd=${selectedCoCd}`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setOrg(res.data);
      });
  };
  useEffect(() => {
    onClickSearchText();
  }, []);

  return (
    //헤더 공간 제외한 div 공간 지정
    /**
     * h: 그리드 총 높이
     * templateRows 세로 칸 수
     * templateColumns 세로 칸 수
     * gap 마진 비슷 값 클수록 그리드 안의 요소 서로 멀어짐
     */
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Grid
        h="1000px"
        templateRows="repeat(11, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={5}
      >
        <GridItem colSpan={6} rowSpan={1}>
          <SearchCardBar
            setSearchText={setSearchText}
            setSelectedCoCd={setSelectedCoCd}
            handleSearchBtn={handleSearchBtn}
          />
        </GridItem>
        <GridItem colSpan={2} rowSpan={5}>
          <DepCard value={org} />
        </GridItem>
        <GridItem colSpan={4} rowSpan={5}>
          <DepInfo />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Test;
