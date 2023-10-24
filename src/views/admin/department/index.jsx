import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchCardBar from "./component/SearchCardBar";
import DepCard from "./component/DepCard/DepCard";
import DepInfo from "./component/DepInfo/DepInfo";
import { getDepOrganizationApi } from "api/dep/DepApi";
import CommonAlert from "common/component/CommonAlert";

const Test = () => {
  const [selectedCoCd, setSelectedCoCd] = useState("");
  const [searchText, setSearchText] = useState("");
  const [org, setOrg] = useState([]);
  const [dpCd, setDpCd] = useState(0);
  const [test, setTest] = useState(false);
  const [editState, setEditState] = useState("read");
  const [tabStatus, setTabStatus] = useState(1);

  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
  });

  const handleSearchBtn = () => {
    onClickSearchText();
  };

  //조직도 조회
  const onClickSearchText = async () => {
    const response = await getDepOrganizationApi(selectedCoCd, searchText);
    setOrg(response.data);
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
            setAlertInfo={setAlertInfo}
          />
        </GridItem>
      </Grid>

      {alertInfo.isOpen && (
        <CommonAlert alertInfo={alertInfo} setAlertInfo={setAlertInfo} />
      )}
    </Box>
  );
};

export default Test;
