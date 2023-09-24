import React, { useState } from "react";
import EmpTab1 from "./EmpTab1";
import EmpTab2 from "./EmpTab2";
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
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setIsRead } from "redux/emp";
import ModalLayout from "common/modal/ModalLayout";

const EmpInfo = (props) => {
    //리덕스
	const dispatch = useDispatch();
    
    const isReadStatus = useSelector((state) => state.emp.isRead);

    const [tabStatus, setTabStatus] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure();  // 모달 관련

  // input value값 받기 이벤트
  const handleChange = (e) => {
    //setEmpInfo({ ...empInfo, [e.target.id]: e.target.value });
    props.setEmpDetail({ ...props.empDetail, [e.target.id]: e.target.value });
  };

  //radio 값 받기 이벤트
  const handleRadioChange = (e) => {
    props.setEmpDetail({ ...props.empDetail, [e.target.name]: e.target.checked });
  };

  return (
    <div>
      <Box borderRadius="lg" bg="white" h="700px" p="6">
        <Tabs colorScheme="brandScheme">
          <TabList>
            <Flex align={{ sm: "flex-start", lg: "center" }} w="100%">
              <Tab
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
                onClick={() => {
                  setTabStatus(1);
                }}
              >
                기본정보
              </Tab>
              <Tab
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
                onClick={() => {
                  setTabStatus(2);
                }}
              >
                조직정보
              </Tab>
              <Spacer />
              <Flex >
                {isReadStatus ? (
                  <Stack direction="row" spacing={4} align="center">
                    <div>
                    <Button variant="action" onClick={()=>{
                      onOpen();
                    }}>
                      ID 변경
                    </Button>
                    </div>
                    <Button
                      variant="action"
                      onClick={() => {alert("asd")}}
                    >
                      비밀번호 초기화
                    </Button>
                    <Button variant="action" >
                      퇴사처리
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={4} align="center">
                    <Button variant="brand" onClick={() => {alert("click")}}>
                      저장
                    </Button>
                    <Button
                      variant="action"
                      onClick={() => {
                        dispatch(setIsRead(true));
                        props.resetInput();
                      }}
                    >
                      취소
                    </Button>
                  </Stack>
                )}
              </Flex>
            </Flex>
          </TabList>
          <TabPanels>
            <TabPanel>
              <EmpTab1 
              empDetail={props.empDetail}
              setImgFile={props.setImgFile}
              handleChange={handleChange}
              handleRadioChange={handleRadioChange}/>
            </TabPanel>
            <TabPanel>
              <EmpTab2 
                empDept={props.empDept}
                handleChange={handleChange}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {/* ID 변경 모달 */}
      <ModalLayout title="ID변경" children="test" buttonYn="false" isOpen={isOpen} onClose={onClose}/>
    </div>
  );
};

export default EmpInfo;
