import {
  Text,
  Input,
  Grid,
  GridItem,
  Select,
  Button,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";

const ChangeMenuBar = ({
  chSearch,
  setChSearch,
  handelChangeHistoryBtn,
  setAlertInfo,
}) => {
  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "startCdt") {
      if (value > chSearch.endCdt) {
        setAlertInfo({
          isOpen: true,
          status: "warning",
          title: "시작일자가 종료일자보다 클 수 없습니다.",
          width: "fit-content",
        });
        return false;
      }
    }

    if (name === "endCdt") {
      if (value < chSearch.startCdt) {
        setAlertInfo({
          isOpen: true,
          status: "warning",
          title: "종료일자가 시작일자보다 작을 수 없습니다.",
          width: "fit-content",
        });
        return false;
      }
    }
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
          <Text color="while" fontSize="15px" fontWeight="600">
            변경일자
          </Text>
        </div>
      </GridItem>
      <GridItem colStart={3} colEnd={4}>
        <Input
          size="md"
          type="date"
          name="startCdt"
          value={chSearch.startCdt}
          onChange={onChange}
        />
      </GridItem>

      <GridItem colStart={4} colEnd={5}>
        <Input
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
          <Text color="while" fontSize="15px" fontWeight="600">
            변경구분
          </Text>
        </div>
      </GridItem>
      <GridItem colStart={8} colEnd={12}>
        <Select
          borderRadius={'5px'}
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
          <Text color="while" fontSize="15px" fontWeight="600">
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
         borderRadius={'10px'}
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
