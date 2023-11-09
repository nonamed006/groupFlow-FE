import {
  Text,
  Input,
  Grid,
  GridItem,
  Select,
  Button,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";

const ChangeMenuBar = ({ chSearch, setChSearch, handelChangeHistoryBtn }) => {
  const onChange = (e) => {
    console.log(chSearch);
    const { value, name } = e.target;
    console.log(value);
    console.log(name);
    setChSearch({
      ...chSearch,
      [name]: value, // name 키를 가진 값을 value 로
    });
  };
  //const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Grid templateColumns="repeat(22, 1fr)" gap={2}>
      <GridItem colStart={1} colEnd={3}>
        <div
          style={{
            lineHeight: "40px",
            textAlign: "center",
          }}
        >
          <Text color="while" fontSize="sm" fontWeight="700">
            변경일자
          </Text>
        </div>
      </GridItem>
      <GridItem colStart={3} colEnd={4}>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="date"
          name="startCdt"
          value={chSearch.startCdt}
          onChange={onChange}
        />
      </GridItem>

      <GridItem colStart={4} colEnd={5}>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="date"
          name="endCdt"
          value={chSearch.endCdt}
          onChange={onChange}
        />
      </GridItem>
      <GridItem colStart={6} colEnd={8}>
        <div
          style={{
            lineHeight: "40px",
            textAlign: "center",
          }}
        >
          <Text color="while" fontSize="sm" fontWeight="700">
            변경구분
          </Text>
        </div>
      </GridItem>
      <GridItem colStart={8} colEnd={11}>
        <Select
          borderRadius="14px"
          name="chDiv"
          placeholder="전체"
          value={chSearch.chDiv}
          onChange={onChange}
        >
          <option name="chDiv" value="추가">
            추가
          </option>
          <option name="chDiv" value="수정">
            수정
          </option>
          <option name="chDiv" value="삭제">
            삭제
          </option>
        </Select>
      </GridItem>
      <GridItem colStart={12} colEnd={15}>
        <div
          style={{
            lineHeight: "40px",
            textAlign: "center",
          }}
        >
          <Text color="while" fontSize="sm" fontWeight="700">
            변경자(ID)
          </Text>
        </div>
      </GridItem>
      <GridItem colStart={15} colEnd={19}>
        <Input
          placeholder="-"
          size="md"
          name="cid"
          value={chSearch.cid}
          onChange={onChange}
        />
      </GridItem>
      <GridItem colStart={20} colEnd={22}>
        <Button
          variant="brand"
          onClick={() => {
            handelChangeHistoryBtn();
          }}
        >
          검색
        </Button>
      </GridItem>
    </Grid>
  );
};

export default ChangeMenuBar;
