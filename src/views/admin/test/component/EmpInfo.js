import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import { minTimeDate } from "common";
import { useSelector } from "react-redux";

const EmpInfo = () => {
  const empInfo = useSelector((state) => state.solution.dataList);
  const isReadStatus = useSelector((state) => state.solution.isRead);

  return (
    <div>
      <Box borderRadius="lg" bg="white" h="700px" p="6">
        <Tabs colorScheme="brandScheme">
          <TabList>
            <Flex align={{ sm: "flex-start", lg: "center" }} w="100%">
              <Tab fontSize="22px" fontWeight="700" lineHeight="100%">
                기본정보
              </Tab>
              <Tab fontSize="22px" fontWeight="700" lineHeight="100%">
                조직정보
              </Tab>
              <Spacer />
            </Flex>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid
                templateColumns="repeat(13, 1fr)"
                templateRows="repeat(12, 1fr)"
                gap={2}
              >
                <GridItem colSpan={2} rowSpan={3}>
                  <Text fontSize="sm" fontWeight="600">
                    사진
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7} rowSpan={3}>
                  <Input placeholder="이름" size="md" borderRadius="14px" isReadOnly={false}/>
                </GridItem>

                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                    개인메일
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14}>
                  <Input
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    value={empInfo?.empMail || ''}
                    isReadOnly={isReadStatus}
                  />
                </GridItem>

                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                    급여메일
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14}>
                  <Input
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    value={empInfo?.payMail || ''}
                    isReadOnly={isReadStatus}
                  />
                </GridItem>

                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                    최초입사일
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14}>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    style={{ color: "gray" }}
                    value={minTimeDate(empInfo?.joinDt) || ''}
                    isReadOnly={isReadStatus}
                  />
                </GridItem>

                <GridItem>
                  <Text fontSize="sm" fontWeight="600">
                    이름
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    placeholder="이름"
                    size="md"
                    borderRadius="14px"
                    value={empInfo?.empNm || ''}
                    isReadOnly={isReadStatus}
                  />
                </GridItem>

                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                    최종퇴사일
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14}>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    style={{ color: "gray" }}
                    value={minTimeDate(empInfo?.reDt) || ''}
                    isReadOnly={isReadStatus}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    성별
                  </Text>
                </GridItem>
                <GridItem colSpan={4}>
                  <RadioGroup defaultValue="M">
                    <HStack spacing="24px">
                      <Radio value="M" name="gender" isReadOnly={isReadStatus}>
                        남성
                      </Radio>
                      <Radio value="F" name="gender" isReadOnly={isReadStatus}>
                        여성
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </GridItem>

                <GridItem colStart={8} colEnd={10} rowSpan={8}>
                  <Text fontSize="sm" fontWeight="600">
                    계정사용
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14} rowSpan={8}>
                  <RadioGroup defaultValue="1">
                    <HStack spacing="24px" >
                      <Radio value="1" name="useYn" isReadOnly={isReadStatus}>
                        사용
                      </Radio>
                      <Radio value="0" name="useYn" isReadOnly={isReadStatus}>
                        미사용
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    메일ID
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    value={empInfo?.empEmail || ''}
                    isReadOnly={isReadStatus}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    로그인ID
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    value={empInfo?.empId || ''}
                    isReadOnly={isReadStatus}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    로그인 비밀번호
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    name="loginPw"
                    value={empInfo?.loginPw || ''}
                    isReadOnly={isReadStatus}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    결재 비밀번호
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    value={empInfo?.signPw || ''}
                    isReadOnly={isReadStatus}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    휴대전화
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    name="empTel"
                    value={empInfo?.empTel || ''}
                    isReadOnly={isReadStatus}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    주소
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    value={empInfo?.empTel || ''}
                    isReadOnly={isReadStatus}
                  />
                </GridItem>
              </Grid>
            </TabPanel>
            <TabPanel>
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
                <Input placeholder="이름" size="md" borderRadius="14px" isReadOnly={false}/>
                </GridItem>

                <GridItem>
                  <Text fontSize="sm" fontWeight="600">
                    사번
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    placeholder="사번"
                    size="md"
                    borderRadius="14px"
                    value={empInfo?.empNm || ''}
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
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    value={empInfo?.payMail || ''}
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
                    <HStack spacing="24px" >
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

              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default EmpInfo;
