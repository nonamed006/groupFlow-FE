import { Box, Grid, GridItem, Flex, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { React } from "react";
import MenuBox from "views/admin/roleGroup/component/MenuBox/MenuBox";
import RoleList from "./component/Emp/RoleList";
import EmpList from "./component/Emp/EmpList";
import RoleCorp from "./RoleCorp";
import DepRole from "./component/dep/DepRole";


const Role = () => {

	return (
        <Box borderRadius="lg" h="500px" mt={{ base: '130px', md: '130px', xl: '120px' }} px={'20px'} pt={'20px'}>
            <Tabs colorScheme="brandScheme">
                <TabList>
                    <Flex align={{ sm: "flex-start", lg: "center" }} w="100%">
                        <Tab
                            fontSize="22px"
                            fontWeight="700"
                            lineHeight="100%"
                        >
                            사용자 기준
                        </Tab>
                        <Tab
                            fontSize="22px"
                            fontWeight="700"
                            lineHeight="100%"
                        >
                            회사 기준
                        </Tab>
                        <Tab
                            fontSize="22px"
                            fontWeight="700"
                            lineHeight="100%"
                        >
                            부서 기준
                        </Tab>
                    </Flex>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Grid
                            h='500px'
                            templateRows="repeat(11, 1fr)"
                            templateColumns="repeat(7, 1fr)"
                            gap={5}
                        >
                            <GridItem colSpan={2} rowSpan={5} >
                                <EmpList/>
                            </GridItem>
                            <GridItem colSpan={2} rowSpan={5}>
                                <RoleList/>
                            </GridItem>
                            <GridItem colSpan={3} rowSpan={5} >
                                <MenuBox/>
                            </GridItem>
                        </Grid>
                    </TabPanel>
                    {/* 권한-회사기준 */}
                    <TabPanel>
                       <RoleCorp />
                    </TabPanel>
                    <TabPanel>
                        <DepRole />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
	);
};

export default Role;
