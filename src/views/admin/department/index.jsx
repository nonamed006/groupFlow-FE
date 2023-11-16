import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchCardBar from "./component/SearchCardBar";
import DepCard from "./component/DepCard/DepCard";
import DepInfo from "./component/DepInfo/DepInfo";
import api from "api/Fetch";
import CommonAlert from "common/component/CommonAlert";

const Department = () => {
  const [selectedCoCd, setSelectedCoCd] = useState("");
  const [searchText, setSearchText] = useState("");
  const [org, setOrg] = useState([]);
  const [dpCd, setDpCd] = useState();
  const [test, setTest] = useState(false);
  const [editState, setEditState] = useState("read");
  const [tabStatus, setTabStatus] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
  });

  const handleSearchBtn = () => {
    onClickSearchText();
  };

  //조직도 조회
  const onClickSearchText = async () => {
    setIsLoading(true);
    const response = await api.dep.getDepOrganizationApi(
      selectedCoCd,
      searchText
    );
    setOrg(response.data);
    setIsLoading(false);
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
    <Box h={"full"}>
      {/* pt={{ base: "130px", md: "80px", xl: "80px" }} 혜윤 수정 */}
      <Grid
        // h={"500px"}
        h={"full"} // 혜윤 수정
        templateRows="repeat(11, 1fr)"
        templateColumns="repeat(7, 1fr)"
        gap={5}
      >
        <GridItem colSpan={7} rowSpan={1}>
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
            isLoading={isLoading}
          />
        </GridItem>
        <GridItem colSpan={5} rowSpan={5}>
          <DepInfo
            org={org}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
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

export default Department;
