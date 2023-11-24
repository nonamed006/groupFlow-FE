import React, { useEffect, useState } from "react";
import { Box, Button, Select, Grid, Input, GridItem } from "@chakra-ui/react";
import api from "api/Fetch";
const SearchCardBar = ({
  setSearchText,
  setSelectedCoCd,
  handleSearchBtn,
  setDpCd,
}) => {
  const [corpNm, setCorpNm] = useState([]);

  const getCorpNmList = async () => {
    const response = await api.dep.getCorpNmListApi();
    setCorpNm(response.data);
  };

  useEffect(() => {
    getCorpNmList();
  }, []);

  return (
    <Box borderRadius="5px" bg="white" p="3" pt={5}>
      {" "}
      {/*  w={"93%"} 혜윤 수정 */}
      <Grid templateColumns="repeat(14, 1fr)" gap={2}>
        <GridItem colSpan={1}>
          <div style={{ lineHeight: "40px", textAlign: "center" }}>회사</div>
        </GridItem>
        <GridItem colSpan={2}>
          <Select
            placeholder="전체"
            onChange={(e) => {
              setSelectedCoCd(e.target.value);
            }}
          >
            {corpNm.map((item, index) => (
              <option key={index} name="coCd" value={item.coCd}>
                {item.coNm}
              </option>
            ))}
          </Select>
        </GridItem>

        <GridItem colStart={5} colEnd={5}>
          <div style={{ lineHeight: "40px", textAlign: "center" }}>부서명</div>
        </GridItem>
        <GridItem colSpan={3}>
          <Input
            placeholder="검색어를 입력하세요."
            name="searchText"
            size="md"
            borderRadius="5px"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </GridItem>
        <GridItem colStart={14} colEnd={14}>
          <Button
            variant="brand"
            borderRadius={"10px"}
            fontWeight={"600"}
            m={1}
            onClick={() => {
              handleSearchBtn();
              setDpCd(0);
            }}
          >
            검색
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default SearchCardBar;
