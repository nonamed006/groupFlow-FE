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
import ModalLayout from "common/modal/ModalLayout";
import EmpIdChg from "../empIdChg/EmpIdChg";
import { PORT } from "set";
import EmpPwdChg from "../empPwdChg/EmpPwdChg";
import EmpWorkState from "../empWorkState/EmpWorkState";
import EmpInfoDel from "../empDel/EmpInfoDel";
import EmpDepDel from "../empDel/EmpDepDel";
const EmpInfo = (props) => {

  const [tabStatus, setTabStatus] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 관련
  const [empId, setEmpId] = useState("");
  const [modalTabStatus, setModalTabStatus] = useState("type1");
  const [modalType, setModalType] = useState(1);
  const [empPwd, setEmpPwd] = useState();
  const [delEmpDep, setDelEmpDep] = useState([]);

  // empDetail input value값 받기 이벤트
  const handleChange = (e) => {
    props.setEmpDetail({ ...props.empDetail, [e.target.name]: e.target.value });
  };

  // empDetail radio 값 받기 이벤트
  const handleRadioChange = (e) => {
    props.setEmpDetail({
      ...props.empDetail,
      [e.target.name]: e.target.checked,
    });
  };

  //empDept input 값 받기
  const empDeptHandleChange = (e, index, e2) => {
    if (!e2) {
      props.setEmpDept(
        [...props.empDept.map((emp, index_) => {
          if (index_ === index) {
            return {
              ...emp,
              ...{ [e.target.name]: e.target.value }
            }
          } else {
            return emp
          }
        }),
        ]);
    } else {
      props.setEmpDept(
        [...props.empDept.map((emp, index_) => {
          if (index_ === index) {
            return {
              ...emp,
              ...{ [e.target.name]: e.target.value },
              ...{ [e2.target.name]: e2.target.value }
            }
          } else {
            return emp
          }
        }),
        ]);
    }

  }

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
          props.setEmpDetail({
            ...props.empDetail,
            [modalTabStatus == "type1" ? "loginId" : "mailId"]: empId,
          });
        } else {
          alert("변경실패했습니다.");
        }
      });
  };

  //사원 퇴사처리
  const updateWorkType = () => {
    fetch(`${PORT}/emp/updateWorkType/${props.empDetail.empCd}`, {
      method: "GET",
      // res에 결과가 들어옴
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result === "success") {
          alert("퇴사처리되었습니다.");
          onClose();
          props.setIsReload(!props.isReload);
        } else {
          alert("퇴사실패했습니다.");
        }
      });
  };

  //사원 조직 정보 추가
  const insertEmpDep = () => {
    fetch(
      `${PORT}/emp/insertEmpDep`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.empDept)
        // res에 결과가 들어옴
      }
    ).then((res) => res.json())
      .then((res) => {
        props.setAlertInfo({
          isOpen: true,
          status: 'success',
          title: res.resultMsg,
          width: 'fit-content'
        });
        props.setEditState("read");
      });
  }

  //사원 조직 정보 수정
  const updateEmpDep = () => {
    fetch(
      `${PORT}/emp/updateEmpDep`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.empDept)
        // res에 결과가 들어옴
      }
    ).then((res) => res.json())
      .then((res) => {
        props.setAlertInfo({
          isOpen: true,
          status: 'success',
          title: res.resultMsg,
          width: 'fit-content'
        });
        props.setEditState("read");
      });
  }

  //사원 삭제
  const empDelete = () => {
    fetch(`${PORT}/emp/deleteEmp/${props.empDetail.empCd}`, {
      method: "GET",
      headers: {
        'Content-Type': "application/json; charset=utf-8",
      }
    }).then((res) => res.json())
      .then((res) => {
        if (res.result === "success") {
          props.setAlertInfo({
            isOpen: true,
            status: 'success',
            title: "삭제되었습니다.",
            width: 'fit-content'
          });
          onClose();
          props.setIsReload(!props.isReload);
        } else {
          alert("삭제 실패하였습니다.");
        }
      });
  }
  // 선택한 사원 조직 정보 삭제
const deleteChkEmpDep = () => {
  fetch(
    `${PORT}/emp/deleteChkEmpDep`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(delEmpDep)
      // res에 결과가 들어옴
    }
  ).then((res) => res.json())
    .then((res) => {
      props.setAlertInfo({
        isOpen: true,
        status: 'success',
        title: res.resultMsg,
        width: 'fit-content'
      });
      props.setEditState("read");
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
                  props.setEditState("read")
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
                  props.setEditState("read")
                  setTabStatus(2);
                }}
              >
                조직정보
              </Tab>
              <Spacer />
              <Flex>
                {props.editState === "read" ? (
                  <Stack direction="row" spacing={4} align="center">
                    {tabStatus == 1 ? (
                      <Stack direction="row" spacing={4}>
                        <Button
                          variant="action"
                          onClick={() => {
                            if (props.empDetail.empNm === "") {
                              props.setAlertInfo({
                                isOpen: true,
                                status: 'error',
                                title: "사원을 선택해주세요.",
                                width: 'fit-content'
                              });
                              return;
                            }
                            setModalType(1);
                            setModalTabStatus("type1");
                            onOpen();
                          }}
                        >
                          ID 변경
                        </Button>
                        <Button
                          variant="action"
                          onClick={() => {
                            if (props.empDetail.empNm === "") {
                              props.setAlertInfo({
                                isOpen: true,
                                status: 'error',
                                title: "사원을 선택해주세요.",
                                width: 'fit-content'
                              });
                              return;
                            }
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
                            if (props.empDetail.empNm === "") {
                              props.setAlertInfo({
                                isOpen: true,
                                status: 'error',
                                title: "사원을 선택해주세요.",
                                width: 'fit-content'
                              });
                              return;
                            }
                            setModalType(3);
                            setModalTabStatus("type1");
                            onOpen();
                          }}
                        >
                          퇴사처리
                        </Button>
                      </Stack>) : <Stack direction="row" spacing={4}>
                      <Button
                        variant="action"
                        onClick={() => {
                          if (props.empDetail.empNm === "") {
                            props.setAlertInfo({
                              isOpen: true,
                              status: 'warning',
                              title: "사원을 선택해주세요.",
                              width: 'fit-content'
                            });
                            return;
                          }
                          props.resetInput();
                          props.setEditState("deptInsert");
                        }}
                      >
                        조직정보 추가
                      </Button>
                    </Stack>
                    }
                    <Button
                      variant="action"
                      onClick={() => {
                        if (props.empDetail.empNm === "") {
                          props.setAlertInfo({
                            isOpen: true,
                            status: 'error',
                            title: "사원을 선택해주세요.",
                            width: 'fit-content'
                          });
                          return;
                        }
                        if (tabStatus === 1) {
                          props.setEditState("update");
                        } else if (tabStatus === 2) {
                          props.setEditState("deptUpdate");
                        }
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="action"
                      onClick={() => {
                        if (props.empDetail.empNm === "") {
                          props.setAlertInfo({
                            isOpen: true,
                            status: 'error',
                            title: "사원을 선택해주세요.",
                            width: 'fit-content'
                          });
                          return;
                        }
                        if (tabStatus === 1) {
                          setModalType(4);
                          setModalTabStatus("type4");
                          onOpen();
                        } else if (tabStatus === 2) {
                          setModalType(5);
                          setModalTabStatus("type5");
                          onOpen();
                        }
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
                        if (tabStatus === 1) {
                          if (props.editState === "insert") {
                            props.onSaveEmpDetail();
                          } else if (props.editState === "update") {
                            props.updateEmpInfo();
                          }
                        } else if (tabStatus === 2) {
                          if (props.editState === "deptInsert") {
                            insertEmpDep();
                          } else if (props.editState === "deptUpdate") {
                            updateEmpDep();
                          }
                        }
                      }}
                    >
                      저장
                    </Button>
                    <Button
                      variant="action"
                      onClick={() => {
                        props.setEditState("read");
                        props.resetInput();
                        props.setSelectedIndex(undefined);
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
                imgBase64={props.imgBase64}
                setImgBase64={props.setImgBase64}
                setImgFile={props.setImgFile}
                handleChange={handleChange}
                handleRadioChange={handleRadioChange}
                editState={props.editState}
              />
            </TabPanel>
            <TabPanel>
              <EmpTab2 
              empDept={props.empDept} 
              setEmpDept={props.setEmpDept} 
              setAlertInfo={props.setAlertInfo} 
              handleChange={empDeptHandleChange} 
              editState={props.editState} 
              isLoading={props.isLoading} 
              setIsLoading={props.setIsLoading}
              setDelEmpDep={setDelEmpDep}
              delEmpDep={delEmpDep}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {/* ID 변경 모달 */}
      {isOpen ?
        <ModalLayout
          title={
            modalType == 1
              ? "ID변경"
              : modalType == 2
                ? "비밀번호 초기화"
                : modalType == 3
                  ? "퇴사처리"
                    : modalType == 4
                    ? "사원삭제" 
                    : "조직정보 삭제"
          }
          buttonYn="false"
          isOpen={isOpen}
          onClose={onClose}
          btnText="확인"
          handleCheck={
            modalType == 1 ? updateEmpID : modalType == 2 ? "" : modalType == 3 ? updateWorkType : modalType == 4 ? empDelete : deleteChkEmpDep
          }
          children={
            modalType == 1 ? (
              <EmpIdChg
                empDetail={props.empDetail}
                setEmpId={setEmpId}
                empId={empId}
                setModalTabStatus={setModalTabStatus}
                modalTabStatus={modalTabStatus}
              />
            ) : modalType == 2 ? (
              <EmpPwdChg
                setEmpPwd={setEmpPwd}
                setModalTabStatus={setModalTabStatus}
              />
            ) : modalType == 3 ? (
              <EmpWorkState />
            ) : modalType == 4 ? (
              <EmpInfoDel />
            ) : <EmpDepDel />
          }
          size="2xl"
        />
        : ""}
    </div>
  );
};

export default EmpInfo;
