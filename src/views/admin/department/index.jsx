/* eslint-disable */

import { Box, Grid, GridItem, Link } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchCardBar from "./component/SearchCardBar";
import DepCard from "./component/DepCard/DepCard";
import DepInfo from "./component/DepInfo/DepInfo";
import { PORT } from "set";

const Test = () => {
  const [selectedCoCd, setSelectedCoCd] = useState("");
  const [searchText, setSearchText] = useState("");
  const [org, setOrg] = useState([]);
  const [dpCd, setDpCd] = useState(0);
  const [test, setTest] = useState(false);
  const [editState, setEditState] = useState("read");
  const [tabStatus, setTabStatus] = useState(1);
  const handleSearchBtn = () => {
    onClickSearchText();
  };

  const onClickSearchText = () => {
    //let url = `${PORT}/dep?text=${searchText}&coCd=${selectedCoCd}`;
    console.log(searchText);
    let url = `${PORT}/roleEmp/list?empYn=N&searchCoCd=${selectedCoCd}&keyword=${searchText}&search=dep`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setOrg(res.data);
      });
  };
  useEffect(() => {
    if (test === true) {
      setTest(false);
      onClickSearchText();
    } else {
      onClickSearchText();
    }
  }, [test]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Link href="/system/corporation" fontWeight="bold" fontSize="34px">
        qweqwe
      </Link>
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
          <DepCard
            org={org}
            setDpCd={setDpCd}
            setEditState={setEditState}
            setTabStatus={setTabStatus}
          />
        </GridItem>
        <GridItem colSpan={4} rowSpan={5}>
          <DepInfo
            setTest={setTest}
            dpCd={dpCd}
            setDpCd={setDpCd}
            editState={editState}
            setEditState={setEditState}
            tabStatus={tabStatus}
            setTabStatus={setTabStatus}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Test;
