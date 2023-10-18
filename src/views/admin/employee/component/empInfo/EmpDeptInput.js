import {
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import { minTimeDate } from "common/common";
import SelectCommon from "common/component/SelectCommon";
import React from "react";

const EmpDeptInput = ({ column, handleChange, infoEditState }) => {

  return (
    <Grid
      templateColumns="repeat(13, 1fr)"
      templateRows="repeat(12, 1fr)"
      gap={2}
    >
      <GridItem colStart={0} colEnd={2}>
        <Text fontSize="sm" fontWeight="600">
          회사/부서
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <Select placeholder="전체" onChange={handleChange}>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </GridItem>
      <GridItem colStart={7} colEnd={14}>
        <Input
          placeholder="이름"
          size="md"
          borderRadius="14px"
          isReadOnly={infoEditState === "read"}
        />
      </GridItem>

      <GridItem colSpan={2}>
        <Text fontSize="sm" fontWeight="600">
          사번
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <Input
          id="dpGrpNum"
          name="dpGrpNum"
          placeholder="사번"
          size="md"
          borderRadius="14px"
          value={column?.dpGrpNum}
          isReadOnly={infoEditState === "read"}
          onChange={handleChange}
        />
      </GridItem>

      <GridItem colStart={1} colEnd={3}>
        <Text fontSize="sm" fontWeight="600">
          회사구분
        </Text>
      </GridItem>
      <GridItem colSpan={4}>
        <RadioGroup defaultValue="M">
          <HStack spacing="24px">
            <Radio value="M" name="gender" isReadOnly={infoEditState === "read"} onChange={handleChange} >
              주회사
            </Radio>
            <Radio value="F" name="gender" isReadOnly={infoEditState === "read"} onChange={handleChange}>
              부회사
            </Radio>
          </HStack>
        </RadioGroup>
      </GridItem>

      <GridItem colStart={8} colEnd={10}>
        <Text fontSize="sm" fontWeight="600">
          부서구분
        </Text>
      </GridItem>
      <GridItem colStart={10} colEnd={14}>
        <RadioGroup defaultValue="1">
          <HStack spacing="24px">
            <Radio value="1" name="useYn" isReadOnly={infoEditState === "read"} onChange={handleChange}>
              주부서
            </Radio>
            <Radio value="0" name="useYn" isReadOnly={infoEditState === "read"} onChange={handleChange}>
              부부서
            </Radio>
          </HStack>
        </RadioGroup>
      </GridItem>

      <GridItem>
        <Text fontSize="sm" fontWeight="600">
          직급
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <SelectCommon handleChange={handleChange} name="rankCd" values={column?.rankCd} ccNum="EM" ccType="A" defaultMsg="선택없음" isReadOnly={infoEditState === "read"}/>
      </GridItem>

      <GridItem colStart={8} colEnd={10}>
        <Text fontSize="sm" fontWeight="600">
          직책
        </Text>
      </GridItem>
      <GridItem colStart={10} colEnd={14}>
        <SelectCommon handleChange={handleChange} name="pstnCd" ccNum="EM" ccType="B" defaultMsg="선택없음" values={column?.pstnCd} isReadOnly={infoEditState === "read"}/>
      </GridItem>

      <GridItem colSpan={2}>
        <Text fontSize="sm" fontWeight="600">
          재직구분
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <SelectCommon handleChange={handleChange} name="workTypeCd" ccNum="EM" ccType="C" defaultMsg="선택없음" values={column?.workTypeCd} isReadOnly={infoEditState === "read"}/>
      </GridItem>

      <GridItem colStart={8} colEnd={10}>
        <Text fontSize="sm" fontWeight="600">
          고용구분
        </Text>
      </GridItem>
      <GridItem colStart={10} colEnd={14}>
        <SelectCommon handleChange={handleChange} name="empTypeCd" ccNum="EM" ccType="D" defaultMsg="선택없음" values={column?.empTypeCd} isReadOnly={infoEditState === "read"}/>
      </GridItem>

      <GridItem colSpan={2}>
        <Text fontSize="sm" fontWeight="600">
          직무
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <SelectCommon handleChange={handleChange} name="jobCd" ccNum="EM" ccType="E" defaultMsg="선택없음" values={column?.jobCd} isReadOnly={infoEditState === "read"} />
      </GridItem>

      <GridItem colStart={8} colEnd={10}>
        <Text fontSize="sm" fontWeight="600">
          상세업무
        </Text>
      </GridItem>
      <GridItem colStart={10} colEnd={14}>
        <Input
          placeholder="상세업무를 입력하세요."
          size="md"
          borderRadius="14px"
          name="jobDetail"
          value={column?.payMail}
          isReadOnly={infoEditState === "read"}
          onChange={handleChange}
        />
      </GridItem>

      <GridItem colSpan={2}>
        <Text fontSize="sm" fontWeight="600">
          입사일 / 퇴사일
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={5}>
        <Input
          id="joinDt"
          name="joinDt"
          placeholder="Select Date and Time"
          size="md"
          type="date"
          style={{ color: "gray" }}
          value={minTimeDate(column?.joinDt)}
          isReadOnly={infoEditState === "read"}
          onChange={handleChange}
        />
      </GridItem>

      <GridItem colStart={5} colEnd={7}>
        <Input
          id="reDt"
          name="reDt"
          placeholder="Select Date and Time"
          size="md"
          type="date"
          style={{ color: "gray" }}
          value={minTimeDate(column?.reDt)}
          isReadOnly={true}
        />
      </GridItem>

      <GridItem colStart={8} colEnd={10}>
        <Text fontSize="sm" fontWeight="600">
          팩스번호
        </Text>
      </GridItem>
      <GridItem colStart={10} colEnd={14}>
        <Input
          id="fax"
          name="fax"
          placeholder="팩스번호를 입력하세요."
          size="md"
          borderRadius="14px"
          value={column?.faxNum}
          isReadOnly={infoEditState === "read"}
          onChange={handleChange}
        />
      </GridItem>

      <GridItem>
        <Text fontSize="sm" fontWeight="600">
          전화번호
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <Input
          name="telNum"
          id="telNum"
          placeholder="전화번호를 입력하세요."
          size="md"
          borderRadius="14px"
          value={column?.empNm}
          isReadOnly={infoEditState === "read"}
          onChange={handleChange}
        />
      </GridItem>

      <GridItem colStart={8} colEnd={10}>
        <Text fontSize="sm" fontWeight="600">
          퇴사여부
        </Text>
      </GridItem>
      <GridItem colStart={10} colEnd={14}>
        <RadioGroup defaultValue="1">
          <HStack spacing="24px">
            <Radio value="EMC0005" name="workTypeCd" isReadOnly={infoEditState === "read"} onChange={handleChange}>
              Y
            </Radio>
            <Radio value="EMC0001" name="workTypeCd" isReadOnly={infoEditState === "read"} onChange={handleChange}>
              N
            </Radio>
          </HStack>
        </RadioGroup>
      </GridItem>

      <GridItem colStart={1} colEnd={3}>
        <Text fontSize="sm" fontWeight="600">
          우편번호
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={5}>
        <Input
          id="postNum"
          name="postNum"
          size="md"
          borderRadius="14px"
          value={column?.postNum}
          placeholder="우편번호"
          readOnly
          onChange={handleChange}
        />
      </GridItem>
      <GridItem colStart={5} colEnd={8}>
        <Button variant="brand" id="postNumBtn">
          우편번호 찾기
        </Button>
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <Input
          id="addr"
          name="addr"
          size="md"
          borderRadius="14px"
          value={column?.addr}
          placeholder="주소를 선택하세요"
          readOnly
          onChange={handleChange}
        />
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <Input
          id="addrDetail"
          name="addrDetail"
          size="md"
          borderRadius="14px"
          defaultValue={column?.addrDetail}
          placeholder="상세주소를 입력하세요."
          onChange={handleChange}
          isReadOnly={infoEditState === "read"}
        />
      </GridItem>
      <GridItem colSpan={12} rowSpan={5}></GridItem>
    </Grid>
  );
};

export default EmpDeptInput;
