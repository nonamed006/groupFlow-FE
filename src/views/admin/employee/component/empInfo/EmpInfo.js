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
import EmpIdChg from "../empIdChg/EmpIdChg";
import { PORT } from "set";
import EmpPwdChg from "../empPwdChg/EmpPwdChg";
import EmpWorkState from "../empWorkState/EmpWorkState";
const EmpInfo = (props) => {
  //리덕스
  const dispatch = useDispatch();

  const isReadStatus = useSelector((state) => state.emp.isRead);

  const [tabStatus, setTabStatus] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 관련
  const [empId, setEmpId] = useState("");
  const [modalTabStatus, setModalTabStatus] = useState("type1");
  const [modalType, setModalType] = useState(1);
  const [empPwd, setEmpPwd] = useState();

  // input value값 받기 이벤트
  const handleChange = (e) => {
    //setEmpInfo({ ...empInfo, [e.target.id]: e.target.value });
    props.setEmpDetail({ ...props.empDetail, [e.target.id]: e.target.value });
  };

  //radio 값 받기 이벤트
  const handleRadioChange = (e) => {
    props.setEmpDetail({
      ...props.empDetail,
      [e.target.name]: e.target.checked,
    });
  };

  //사원 ID 변경
  const updateEmpID = () => {
    fetch(
      `${PORT}/emp/updateEmpId/${empId}/${props.empDetail.empCd}/${modalTabStatus}`,
      {
        method: "GET",
        // res에 결과가 들어옴
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.result === "success") {
          alert("ID가 변경되었습니다.");
          onClose();
          props.setEmpDetail({...props.empDetail, [modalTabStatus == "type1" ? 'loginId' : 'mailId'] : empId});
        } else {
          alert("변경실패했습니다.");
        }
      });
  };

  //사원 퇴사처리
  const updateWorkType = () => {
    fetch(
      `${PORT}/emp/updateWorkType/${props.empDetail.empCd}`,
      {
        method: "GET",
        // res에 결과가 들어옴
      }
    ).then((res) => res.json())
      .then((res) => {
        if (res.result === "success") {
          alert("퇴사처리되었습니다.");
          onClose();
        } else {
          alert("퇴사실패했습니다.");
        }
      });
  }

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
              <Flex>
                {isReadStatus ? (
                  <Stack direction="row" spacing={4} align="center">
                    <div>
                      <Button
                        variant="action"
                        onClick={() => {
                          setModalType(1);
                          setModalTabStatus("type1");
                          onOpen();
                        }}
                      >
                        ID 변경
                      </Button>
                    </div>
                    <Button
                      variant="action"
                      onClick={() => {
                        setModalType(2);
                        setModalTabStatus("type1");
                        onOpen();
                      }}
                    >
                      비밀번호 초기화
                    </Button>
                    <Button
                      variant="action"
                      onClick={() => {
                        setModalType(3);
                        setModalTabStatus("type1");
                        onOpen();
                      }}
                    >
                      퇴사처리
                    </Button>
                    <Button
                      variant="action"
                      onClick={() => {
                        console.log(props.empDetail);
                        dispatch(setIsRead(false));
                        props.setEditState("update");
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="action"
                      onClick={() => {
                        alert("asd");
                      }}
                    >
                      삭제
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={4} align="center">
                    <Button
                      variant="brand"
                      onClick={() => {
                        //props.onSaveEmpDetail();
                        props.updateEmpInfo();
                      }}
                    >
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
                handleRadioChange={handleRadioChange}
                editState={props.editState}
              />
            </TabPanel>
            <TabPanel>
              <EmpTab2 empDept={props.empDept} handleChange={handleChange} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {/* ID 변경 모달 */}
      <ModalLayout
        title={modalType == 1 ? "ID변경" : (modalType == 2 ? "비밀번호 초기화" : "퇴사처리")}
        children="test"
        buttonYn="false"
        isOpen={isOpen}
        onClose={onClose}
        handleCheck={modalType == 1 ? updateEmpID : (modalType == 2 ? "" : updateWorkType)}
        children={ modalType == 1 ?
          <EmpIdChg
            empDetail={props.empDetail}
            setEmpId={setEmpId}
            empId={empId}
            setModalTabStatus={setModalTabStatus}
            modalTabStatus={modalTabStatus}
          /> : (modalType == 2 ? 
            <EmpPwdChg setEmpPwd={setEmpPwd} setModalTabStatus={setModalTabStatus}/> : <EmpWorkState />
            )
        }
        size="2xl"
      />
    </div>
  );
};

export default EmpInfo;
