import { Box, Grid, GridItem, Flex, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { React } from "react";
import RoleCorp from "./RoleCorp";
import DepRole from "./component/dep/DepRole";
import RoleEmp from "./RoleEmp";

const Role = () => {

	return (
        <Box borderRadius="lg" h="full">
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
                    {/* 권한-사용자기준 */}
                    <TabPanel>
                        <RoleEmp/>
                    </TabPanel>

                    {/* 권한-회사기준 */}
                    <TabPanel>
                       <RoleCorp />
                    </TabPanel>
                    {/* 권한-부서기준 */}
                    <TabPanel>
                        <DepRole />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
	);
};

export default Role;
