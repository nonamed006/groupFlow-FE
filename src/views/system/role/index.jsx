import { Box, Flex, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { React, useState } from "react";
import RoleCorp from "./RoleCorp";
import RoleDep from "./RoleDep";
import RoleEmp from "./RoleEmp";
import Loading from "common/Loading";
import CommonAlert from "common/component/CommonAlert";

const Role = () => {
    // 공통 alert
    const [alertInfo, setAlertInfo] = useState({ isOpen: false });
    // 로딩
    const [isLoading, setIsLoading] = useState();

	return (
        <Box borderRadius="lg" h="full">
            <Tabs colorScheme="brandScheme" >
                <TabList>
                    <Flex align={{ sm: "flex-start", lg: "center" }} w="100%">
                        <Tab
                            fontSize="22px"
                            fontWeight="700"
                            lineHeight="100%"
                            onClick={(e) => e.target.blur()}
                        >
                            사용자 기준
                        </Tab>
                        <Tab
                            fontSize="22px"
                            fontWeight="700"
                            lineHeight="100%"
                            onClick={(e) => e.target.blur()}
                        >
                            부서 기준
                        </Tab>
                        <Tab
                            fontSize="22px"
                            fontWeight="700"
                            lineHeight="100%"
                            onClick={(e) => e.target.blur()}
                        >
                            회사 기준
                        </Tab>
                    </Flex>
                </TabList>
                <TabPanels>
                    {/* 권한-사용자기준 */}
                    <TabPanel>
                        <RoleEmp 
                        setIsLoading={setIsLoading} // menuBox 변경에 따른 안은비 수정
                        />
                    </TabPanel>
                    {/* 권한-부서기준 */}
                    <TabPanel>
                        <RoleDep setAlertInfo={setAlertInfo} setIsLoading={setIsLoading}/>
                    </TabPanel>
                    {/* 권한-회사기준 */}
                    <TabPanel>
                       <RoleCorp setAlertInfo={setAlertInfo} setIsLoading={setIsLoading}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
            {
                isLoading &&
                    <Loading /> 
            }
              {
            alertInfo.isOpen &&
            <CommonAlert
                alertInfo={alertInfo}
                setAlertInfo={setAlertInfo}
            />
        }
        </Box>
	);
};

export default Role;
