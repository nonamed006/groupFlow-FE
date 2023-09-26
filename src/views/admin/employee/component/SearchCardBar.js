import React, { useState } from "react";
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

const SearchCardBar = (props) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const [selected, setSelected] = useState("");

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <Box display="flex" borderRadius="lg" bg="white" p="6">
        <Grid templateColumns="repeat(14, 1fr)" gap={2}>
          <GridItem colSpan={1}>
            <div
              style={{
                width: "130px",
                height: "40px",
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
            <Select placeholder="전체" onChange={handleSelect}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </GridItem>
          <GridItem colStart={5} colEnd={6}>
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
              <SelectCommon ccNum="EM" ccType="C" defaultMsg="전체"/>
          </GridItem>
          <GridItem colStart={9} colEnd={9}>
            <div
              style={{
                height: "40px",
                lineHeight: "40px",
                textAlign: "center",
              }}
            >
              <Text color={textColor} fontSize="sm" fontWeight="600" id="searchNm">
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
            />
          </GridItem>
          <GridItem colStart={14} colEnd={14}>
            <Button variant="brand" onClick={()=>props.getEmpList("", "", "")}>검색</Button>
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
};

export default SearchCardBar;
