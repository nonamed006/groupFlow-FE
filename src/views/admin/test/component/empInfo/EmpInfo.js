import {
  Box,
  Button,
  Flex,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import EmpTab1 from "./EmpTab1";
import EmpTab2 from "./EmpTab2";
import { useState } from "react";

const EmpInfo = () => {
  //const [tabStatus, setTabStatus] = useState(1);
  let tabStatus = 1;

  return (
    <div>
      <Box borderRadius="lg" bg="white" h="700px" p="6">
        <Tabs colorScheme="brandScheme">
          <TabList>
            <Flex align={{ sm: "flex-start", lg: "center" }} w="100%">
              <Tab fontSize="22px" fontWeight="700" lineHeight="100%" onClick={()=> {tabStatus = 1}}>
                기본정보
              </Tab>
              <Tab fontSize="22px" fontWeight="700" lineHeight="100%" onClick={()=> {tabStatus = 2}}>
                조직정보
              </Tab>
              <Spacer />
                <Flex>
              <Stack direction="row" spacing={4} align="center">
                <Button variant="brand">저장</Button>
                <Button variant="action">취소</Button>
              </Stack>
                </Flex>
            </Flex>
          </TabList>
          <TabPanels>
            <TabPanel>
              <EmpTab1 />
            </TabPanel>
            <TabPanel>
              <EmpTab2 />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      
    </div>
  );
};

export default EmpInfo;
