import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PORT } from "set";

const EmpInfo = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  
  const getEmpNum = (empNum) => {
    fetch(`${PORT}/emp/getEmpDetail/${empNum}`, {
      method: "GET",
      // res에 결과가 들어옴
    })
    .then((res) => res.json())
    .then((res) => {
      console.log("zzz",res.data);
    });
  }
  const empNum = useSelector(state => state.solution.dataPk);

  useEffect(() => {
    if(empNum != 0){
      getEmpNum(empNum);
    }
  }, [empNum]);

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
                  <Input placeholder="이름" size="md" borderRadius="14px" />
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
                  />
                </GridItem>

                <GridItem>
                  <Text fontSize="sm" fontWeight="600">
                    이름
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input placeholder="이름" size="md" borderRadius="14px" />
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
                      <Radio value="M">남성</Radio>
                      <Radio value="F">여성</Radio>
                    </HStack>
                  </RadioGroup>
                </GridItem>

                <GridItem colStart={8} colEnd={10} rowSpan={8}>
                  <Text fontSize="sm" fontWeight="600">
                    계정사용
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14} rowSpan={8}>
                  <RadioGroup defaultValue="M">
                    <HStack spacing="24px">
                      <Radio value="M">사용</Radio>
                      <Radio value="F">미사용</Radio>
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
                  />
                </GridItem>
              </Grid>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default EmpInfo;
