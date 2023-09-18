import { Box,Flex,Text,useColorModeValue,Input,Button, InfoBox, corp, sortValue, Radio, RadioGroup, HStack, Select, Grid, GridItem, TabPanels, TabPanel, Tab,Tabs, TabList } from '@chakra-ui/react/dist/chakra-ui-react.cjs';
import React from 'react';
import DepInfoBox from './DepInfoBox';

const EmpInfo = () => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    return (
        <div>
            <Box borderRadius="lg" bg="white" h="600px" p="6">
            <DepInfoBox title={"상세정보"}/>
                <Tabs colorScheme="brandScheme">
                    <TabList>
                        <Flex align={{ sm: "flex-start", lg: "center" }} w="100%">
                            <Tab fontSize="22px" fontWeight="700" lineHeight="100%">
                                기본정보
                            </Tab>
                            <Tab fontSize="22px" fontWeight="700" lineHeight="100%">
                                조직정보
                            </Tab>
                        </Flex>
                    </TabList>
                    <TabPanels>
                      <TabPanel>
                      <Grid
                        templateColumns="repeat(15, 1fr)"
                        templateRows="repeat(12, 1fr)"
                        gap={2}>
                          
                        <GridItem colStart={2} colEnd={4}>
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            상위부서
                          </Text>
                        </GridItem>
                        <GridItem colStart={4} colEnd={8}>
                          <Select placeholder="상위 부서 선택" borderRadius="14px">
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                          </Select>
                        </GridItem>

                        <GridItem colStart={9} colEnd={11}>
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            대내외 수신여부
                          </Text>
                        </GridItem>
                        <GridItem colStart={11} colEnd={15}>
                          <RadioGroup >
                            <HStack spacing="24px">
                              <Radio value="M">사용</Radio>
                              <Radio value="F">미사용</Radio>
                            </HStack>
                          </RadioGroup>
                        </GridItem>

                        <GridItem colStart={2} colEnd={4}>
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            표준행정코드
                          </Text>
                        </GridItem>
                        <GridItem colStart={4} colEnd={8}>
                          <Input placeholder="표준행정코드" size="md" borderRadius="14px" />
                        </GridItem>

                        <GridItem colStart={9} colEnd={11}>
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            발신인명
                          </Text>
                        </GridItem>
                        <GridItem colStart={11} colEnd={15}>
                          <Input placeholder="발신인명" size="md" borderRadius="14px" />
                        </GridItem>

                        <GridItem colStart={2} colEnd={4}>
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            부서코드
                          </Text>
                        </GridItem>
                        <GridItem colStart={4} colEnd={8}>
                        <Text color={textColor} fontSize="sm" fontWeight="500">
                          1110
                        </Text>
                        </GridItem>

                        <GridItem colStart={9} colEnd={11}>
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            부서유형
                          </Text>
                        </GridItem>
                        <GridItem colStart={11} colEnd={15}>
                          <Select placeholder="" borderRadius="14px">
                            <option value="option1">부서</option>
                            <option value="option2">임시</option>
                            <option value="option3">팀</option>
                          </Select>
                        </GridItem>

                        <GridItem colStart={2} colEnd={4}>
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            부서명
                          </Text>
                        </GridItem>
                        <GridItem colStart={4} colEnd={8}>
                          <Input placeholder="부서명" size="md" borderRadius="14px" />
                        </GridItem>

                        <GridItem colStart={9} colEnd={11}>
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            부서약칭
                          </Text>
                        </GridItem>
                        <GridItem colStart={11} colEnd={15}>
                          <Input placeholder="부서약칭" size="md" borderRadius="14px" />
                        </GridItem>

                        <GridItem colStart={2} colEnd={4}>
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            부서주소
                          </Text>
                        </GridItem>
                        <GridItem colStart={4} colEnd={7}>
                          <Input placeholder="우편번호" size="md" borderRadius="14px" />
                        </GridItem>
                        <GridItem colStart={7} colEnd={8}>
                          <Button size='xs'  variant='outline'>
                            우편번호
                          </Button>
                        </GridItem>

                        <GridItem colStart={9} colEnd={11}>
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            사용여부
                          </Text>
                        </GridItem>
                        <GridItem colStart={11} colEnd={15}>
                          <RadioGroup >
                            <HStack spacing="24px">
                              <Radio value="M">사용</Radio>
                              <Radio value="F">미사용</Radio>
                            </HStack>
                          </RadioGroup>
                        </GridItem>
                        
                        <GridItem colStart={4} colEnd={8}>
                          <Input placeholder="주소" size="md" borderRadius="14px" />
                        </GridItem>

                        <GridItem colStart={9} colEnd={11}>
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            조작도표시
                          </Text>
                        </GridItem>
                        <GridItem colStart={11} colEnd={15}>
                          <RadioGroup >
                            <HStack spacing="24px">
                              <Radio value="M">표시</Radio>
                              <Radio value="F">미표시</Radio>
                            </HStack>
                          </RadioGroup>
                        </GridItem>

                        <GridItem colStart={4} colEnd={8}>
                          <Input placeholder="상세주소" size="md" borderRadius="14px" />
                        </GridItem>
                        
                        
                        <GridItem colStart={2} colEnd={4}>
                          <Text color={textColor} fontSize="sm" fontWeight="700">
                            정렬
                          </Text>
                        </GridItem>
                        <GridItem colStart={4} colEnd={8}>
                          <Input placeholder="정렬" size="md" borderRadius="14px" />
                        </GridItem>
                        
                        
                       
                        



                          
                          
                      </Grid>
                        </TabPanel>
                        <TabPanel>

                        </TabPanel>
                    </TabPanels>
              
                </Tabs>
            </Box>
        </div>
    );
};

export default EmpInfo;