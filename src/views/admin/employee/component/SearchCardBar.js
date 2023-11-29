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

  const getCorpNmList = async () => {
    const response = await api.dep.getCorpNmListApi();
    setCorpNm(response.data);
  };

  return (
    <div>
      <Box borderRadius="5px" bg="white" p="3" pt={5}>
        <Grid templateColumns="repeat(14, 1fr)" gap={2}>
          <GridItem colSpan={1}>
            <div
              style={{
                lineHeight: "40px",
                textAlign: "center",
              }}
            >
              <Text color={textColor} fontSize="md" >
                회사
              </Text>
            </div>
          </GridItem>
          <GridItem colSpan={2}>
            <Select
              placeholder="전체"
              onChange={(e) => {
                props.setSrhCorp(e.target.value);
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
              <Text color={textColor} fontSize="md" >
                재직구분
              </Text>
            </div>
          </GridItem>

          <GridItem colSpan={2}>
            <SelectCommon ccNum="EM" ccType="C" defaultMsg="전체" handleChange={(e)=>{props.setSrhWorkType(e.target.value)}}/>
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
                fontSize="md"
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
              borderRadius="5px"
              onChange={(e) => props.setSrhNm(e.target.value)}
            />
          </GridItem>
          <GridItem colStart={14} colEnd={14}>
            <Button
              variant="brand" borderRadius="10px" w={'80px'}
              onClick={props.handleSearchBtn}
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
