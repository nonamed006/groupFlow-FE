import React, { useState } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";
import { minTimeDate } from "common";
import { useSelector } from "react-redux";
import AddrModal from "views/admin/corporation/component/InfoBox/AddrModal";

const EmpTab2 = () => {
  const empInfo = useSelector((state) => state.solution.dataList);
  const isReadStatus = useSelector((state) => state.solution.isRead);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [postNum, setPostNum] = useState("");
  const [addr, setAddr] = useState("");
  const [addrDetail, setAddrDetail] = useState("");

  return (
    <div>
      <Grid
        templateColumns="repeat(13, 1fr)"
        templateRows="repeat(12, 1fr)"
        gap={2}
      >
        <GridItem colSpan={2}>
          <Text fontSize="sm" fontWeight="600">
            회사/부서
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Select placeholder="전체">
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
            isReadOnly={false}
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
            placeholder="사번"
            size="md"
            borderRadius="14px"
            value={empInfo?.dpGrpNum}
            isReadOnly={isReadStatus}
          />
        </GridItem>

        <GridItem colStart={8} colEnd={10}>
          <Text fontSize="sm" fontWeight="600">
            전화번호
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <Input
          id="telNum"
            placeholder="example@mail.com"
            size="md"
            borderRadius="14px"
            value={empInfo?.telNum}
            isReadOnly={isReadStatus}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <Text fontSize="sm" fontWeight="600">
            회사구분
          </Text>
        </GridItem>
        <GridItem colSpan={4}>
          <RadioGroup defaultValue="M">
            <HStack spacing="24px">
              <Radio value="M" name="gender" isReadOnly={isReadStatus}>
                주회사
              </Radio>
              <Radio value="F" name="gender" isReadOnly={isReadStatus}>
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
              <Radio value="1" name="useYn" isReadOnly={isReadStatus}>
                주부서
              </Radio>
              <Radio value="0" name="useYn" isReadOnly={isReadStatus}>
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
          <Select placeholder="선택안함">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </GridItem>

        <GridItem colStart={8} colEnd={10}>
          <Text fontSize="sm" fontWeight="600">
            직책
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <Select placeholder="선택안함">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </GridItem>

        <GridItem colSpan={2}>
          <Text fontSize="sm" fontWeight="600">
            재직구분
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Select placeholder="선택안함">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </GridItem>

        <GridItem colStart={8} colEnd={10}>
          <Text fontSize="sm" fontWeight="600">
            고용구분
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <Select placeholder="선택안함">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </GridItem>

        <GridItem colSpan={2}>
          <Text fontSize="sm" fontWeight="600">
            직무
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Select placeholder="선택안함">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
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
            value={empInfo?.payMail}
            isReadOnly={isReadStatus}
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
            placeholder="Select Date and Time"
            size="md"
            type="date"
            style={{ color: "gray" }}
            value={minTimeDate(empInfo?.joinDt)}
            isReadOnly={isReadStatus}
          />
        </GridItem>

        <GridItem colStart={5} colEnd={7}>
          <Input
          id="reDt"
            placeholder="Select Date and Time"
            size="md"
            type="date"
            style={{ color: "gray" }}
            value={minTimeDate(empInfo?.reDt)}
            isReadOnly={isReadStatus}
          />
        </GridItem>

        <GridItem colStart={8} colEnd={10}>
          <Text fontSize="sm" fontWeight="600">
            팩스번호
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <Input
          id=""
            placeholder="팩스번호를 입력하세요."
            size="md"
            borderRadius="14px"
            value={empInfo?.faxNum}
            isReadOnly={isReadStatus}
          />
        </GridItem>

        <GridItem>
          <Text fontSize="sm" fontWeight="600">
            전화번호
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input
            placeholder="전화번호를 입력하세요."
            size="md"
            borderRadius="14px"
            value={empInfo?.empNm}
            isReadOnly={isReadStatus}
          />
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
            value={empInfo?.postNum}
            placeholder="우편번호"
            readOnly
          />
        </GridItem>
        <GridItem colStart={5} colEnd={8}>
          <Button variant="brand" id="postNumBtn" onClick={onOpen}>
            우편번호 찾기
          </Button>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input
            id="addr"
            name="addr"
            size="md"
            borderRadius="14px"
            value={empInfo?.addr}
            placeholder="주소를 선택하세요"
            readOnly
          />
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input
            id="addrDetail"
            name="addrDetail"
            size="md"
            borderRadius="14px"
            defaultValue={empInfo?.addrDetail}
            placeholder="상세주소를 입력하세요."
          />
        </GridItem>
      </Grid>

      {isOpen ? (
        <AddrModal
          isOpen={isOpen}
          onClose={onClose}
          setPostNum={setPostNum}
          setAddr={setAddr}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default EmpTab2;
