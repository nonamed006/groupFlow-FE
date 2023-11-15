import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Select,
  Grid,
  Input,
  GridItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import SelectCommon from "common/component/SelectCommon";
import api from "api/Fetch";

const SearchCardBar = (props) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [corpNm, setCorpNm] = useState([]);
  const [srhCorp, setSrhCorp] = useState("");
  const [srhWorkType, setSrhWorkType] = useState("");
  const [srhNm, setSrhNm] = useState("");

  const getCorpNmList = async () => {
    const response = await api.dep.getCorpNmListApi();
    setCorpNm(response.data);
  };

  useEffect(() => {
    getCorpNmList();
  }, []);

  return (
    <div>
      <Box borderRadius="lg" bg="white" p="6">
        <Grid templateColumns="repeat(14, 1fr)" gap={2}>
          <GridItem colSpan={1}>
            <div
              style={{
                lineHeight: "40px",
                textAlign: "center",
              }}
            >
              <Text color={textColor} fontSize="sm" fontWeight="600">
                회사
              </Text>
            </div>
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              placeholder="전체"
              onChange={(e) => {
                props.setSearchCorp(e.target.value);
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
            <div
              style={{
                height: "40px",
                lineHeight: "40px",
                textAlign: "center",
              }}
            >
              <Text color={textColor} fontSize="sm" fontWeight="600">
                재직구분
              </Text>
            </div>
          </GridItem>

          <GridItem colSpan={2}>
            <SelectCommon ccNum="EM" ccType="C" defaultMsg="전체" />
          </GridItem>
          <GridItem colStart={9} colEnd={9}>
            <div
              style={{
                height: "40px",
                lineHeight: "40px",
                textAlign: "center",
              }}
            >
              <Text
                color={textColor}
                fontSize="sm"
                fontWeight="600"
                id="searchNm"
              >
                이름/ID
              </Text>
            </div>
          </GridItem>
          <GridItem colSpan={3}>
            <Input
              id="searchNm"
              placeholder="검색어를 입력하세요."
              size="md"
              borderRadius="14px"
              onChange={(e) => setSrhNm(e.target.value)}
            />
          </GridItem>
          <GridItem colStart={14} colEnd={14}>
            <Button
              variant="brand"
              onClick={() => props.getEmpList(srhCorp, srhWorkType, srhNm)}
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
