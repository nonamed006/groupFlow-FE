import React, { useEffect, useState } from "react";
import { Box, Button, Select, Grid, Input, GridItem } from "@chakra-ui/react";
import { getCorpNmListApi } from "api/dep/DepApi";
const SearchCardBar = ({ setSearchText, setSelectedCoCd, handleSearchBtn }) => {
  const [corpNm, setCorpNm] = useState([]);

  const getCorpNmList = async () => {
    const response = await getCorpNmListApi();
    setCorpNm(response.data);
  };

  useEffect(() => {
    getCorpNmList();
  }, []);

  return (
    <div>
      <Box borderRadius="lg" bg="white" p="6" w={"93%"}>
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
            <div style={{ lineHeight: "40px", textAlign: "center" }}>
              코드/부서명
            </div>
          </GridItem>
          <GridItem colSpan={3}>
            <Input
              placeholder="검색어를 입력하세요."
              name="searchText"
              size="md"
              borderRadius="14px"
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </GridItem>
          <GridItem colStart={14} colEnd={14}>
            <Button
              variant="brand"
              onClick={() => {
                handleSearchBtn();
              }}
            >
              검색
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
};

export default SearchCardBar;
