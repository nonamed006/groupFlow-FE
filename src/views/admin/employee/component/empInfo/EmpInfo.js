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
import { depGrpSchema } from "common/Schema";
import api from "api/Fetch";
const EmpInfo = (props) => {
  const [tabStatus, setTabStatus] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 관련
  const [empId, setEmpId] = useState("");
  const [modalTabStatus, setModalTabStatus] = useState("type1");
  const [modalType, setModalType] = useState(1);
  const [empPwd, setEmpPwd] = useState("");
  const [delEmpDep, setDelEmpDep] = useState([]);
  const [empDeptTmp, setEmpDeptTmp] = useState([]);
  const [isIdChk, setIsIdChk] = useState(false);
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
      props.setEmpDept([
        ...props.empDept.map((emp, index_) => {
          if (index_ === index) {
            return {
              ...emp,
              ...{ [e.target.name]: e.target.value },
            };
          } else {
            return emp;
          }
        }),
      ]);
    } else {
      props.setEmpDept([
        ...props.empDept.map((emp, index_) => {
          if (index_ === index) {
            return {
              ...emp,
              ...{ [e.target.name]: e.target.value },
              ...{ [e2.target.name]: e2.target.value },
            };
          } else {
            return emp;
          }
        }),
      ]);
    }
  };

  //사원 ID 변경
  const updateEmpID = async () => {
    if (isIdChk) {
      const res = await api.emp.updateEmpID(empId, props.empDetail.empCd, modalTabStatus);
      if (res.status === 200) {
        props.setAlertInfo({
          isOpen: true,
          status: "success",
          title: res.resultMsg,
          width: "fit-content",
        });
        onClose();
        props.setIsReload(!props.isReload);
      } else {
        props.setAlertInfo({
          isOpen: true,
          status: "warning",
          title: res.resultMsg,
          width: "fit-content",
        });
      }
    } else {
      props.setAlertInfo({
        isOpen: true,
        status: "warning",
        title: "ID 중복확인을 해주세요.",
        width: "fit-content",
      });
    }
  };

  //사원 비밀번호 초기화
  const resetPwd = async () => {
    if (empPwd.length > 3) {
      const res = await api.emp.resetPwd(empPwd, props.empDetail.empCd, modalTabStatus);
      if (res.status === 200) {
        props.setAlertInfo({
          isOpen: true,
          status: "success",
          title: res.resultMsg,
          width: "fit-content",
        });
        onClose();
        props.setIsReload(!props.isReload);
      } else {
        props.setAlertInfo({
          isOpen: true,
          status: "warning",
          title: res.resultMsg,
          width: "fit-content",
        });
      }
    } else {
      props.setAlertInfo({
        isOpen: true,
        status: "warning",
        title: "비밀번호를 4자리 이상 입력해주세요.",
        width: "fit-content",
      });
    }
  };

  //사원 퇴사처리
  const updateWorkType = async () => {
    const res = await api.emp.updateWorkType(props.empDetail.empCd);

    if (res.status === 200) {
      props.setAlertInfo({
        isOpen: true,
        status: "success",
        title: res.resultMsg,
        width: "fit-content",
      });
      onClose();
      props.setIsReload(!props.isReload);
    } else {
      props.setAlertInfo({
        isOpen: true,
        status: "warning",
        title: res.resultMsg,
        width: "fit-content",
      });
    }
  };

  //유효성 검사
  const handleInsertCheck = () => {
    depGrpSchema.validate(props.empDept[0])
      .then(() => {
        // 유효성 검사 통과한 데이터 처리
        insertEmpDep()
      })
      .catch((errors) => {
        // 유효성 검사 실패한 경우 에러 메세지
        props.setAlertInfo({
          isOpen: true,
          status: "warning",
          title: "입력값을 확인해주세요.",
          detail: errors.message,
          width: "fit-content",
        });
      });
  }

  //사원 조직 정보 추가
  const insertEmpDep = async () => {
    const res = await api.emp.insertEmpDep(props.empDept);

    if (res.status === 200) {
      props.setAlertInfo({
        isOpen: true,
        status: "success",
        title: res.resultMsg,
        width: "fit-content",
      });
      props.setEditState("read");
      getDeptInfo(props.empDept[0].empCd);
    } else {
      props.setAlertInfo({
        isOpen: true,
        status: "warning",
        title: res.resultMsg,
        width: "fit-content",
      });
    }
  };

  //사원 조직 정보 수정
  const updateEmpDep = async () => {
    const res = await api.emp.updateEmpDep(props.empDept);

    if (res.status === 200) {
      props.setAlertInfo({
        isOpen: true,
        status: "success",
        title: res.resultMsg,
        width: "fit-content",
      });
      props.setEditState("read");
    } else {
      props.setAlertInfo({
        isOpen: true,
        status: "warning",
        title: res.resultMsg,
        width: "fit-content",
      });
    }
  };

  // 사원의 조직 정보
  const getDeptInfo = async (empCd) => {
    empCd = empCd ?? props.empDetail.empCd;
    const res = await api.emp.getDeptInfo(empCd);

    if (res.status === 200) {
      props.setEmpDept(res.data);
    }
  };

  //사원 삭제
  const empDelete = async () => {
    const res = await api.emp.deleteEmp(props.empDetail.empCd);

    if (res.status === 200) {
      props.setAlertInfo({
        isOpen: true,
        status: "success",
        title: "삭제되었습니다.",
        width: "fit-content",
      });
      onClose();
      props.setIsReload(!props.isReload);
    } else {
      props.setAlertInfo({
        isOpen: true,
        status: "success",
        title: "삭제실패했습니다.",
        width: "fit-content",
      });
    }
  };
  // 선택한 사원 조직 정보 삭제
  const deleteChkEmpDep = async () => {
      const res = await api.emp.deleteChkEmpDep(delEmpDep);

      if (res.status === 200) {
        props.setAlertInfo({
          isOpen: true,
          status: "success",
          title: res.resultMsg,
          width: "fit-content",
        });
        onClose();
        getDeptInfo(props.empDetail.empCd);
        props.setEditState("read");
      } else {
        props.setAlertInfo({
          isOpen: true,
          status: "warning",
          title: res.resultMsg,
          width: "fit-content",
        });
      }
  };

  return (
    <>
      <Box borderRadius="lg" bg="white" h="700px" p="6">
        <Tabs colorScheme="brandScheme">
          <TabList>
            <Flex align={{ sm: "flex-start", lg: "center" }} w="100%">
              <Tab
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
                onClick={(e) => {
                  props.resetInput();
                  props.setEmpDetail(props.empTmp);
                  props.setEditState("read");
                  setTabStatus(1);
                }}
              >
                기본정보
              </Tab>
              <Tab
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
                onClick={(e) => {
                  getDeptInfo(props.empCdTmp);
                  props.setEditState("read");
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
                          borderRadius={'10px'}
                          fontWeight={'600'}
                          onClick={() => {
                            if (props.empDetail.empNm === "") {
                              props.setAlertInfo({
                                isOpen: true,
                                status: "warning",
                                title: "사원을 선택해주세요.",
                                width: "fit-content",
                              });
                              return;
                            }
                            setIsIdChk(false);
                            setModalType(1);
                            setModalTabStatus("type1");
                            onOpen();
                          }}
                        >
                          ID 변경
                        </Button>
                        <Button
                          variant="action"
                          borderRadius={'10px'}
                          fontWeight={'600'}
                          onClick={() => {
                            if (props.empDetail.empNm === "") {
                              props.setAlertInfo({
                                isOpen: true,
                                status: "warning",
                                title: "사원을 선택해주세요.",
                                width: "fit-content",
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
                          borderRadius={'10px'}
                          fontWeight={'600'}
                          onClick={() => {
                            if (props.empDetail.empNm === "") {
                              props.setAlertInfo({
                                isOpen: true,
                                status: "warning",
                                title: "사원을 선택해주세요.",
                                width: "fit-content",
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
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={4}>
                        <Button
                          variant="action"
                          borderRadius={'10px'}
                          fontWeight={'600'}
                          onClick={() => {
                            if (props.empDetail.empNm === "") {
                              props.setAlertInfo({
                                isOpen: true,
                                status: "warning",
                                title: "사원을 선택해주세요.",
                                width: "fit-content",
                              });
                              return;
                            }
                            setEmpDeptTmp(props.empDept);
                            props.resetInput();
                            props.setEditState("deptInsert");
                          }}
                        >
                          조직정보 추가
                        </Button>
                      </Stack>
                    )}
                    <Button
                      variant="brand"
                      borderRadius={'10px'}
                      fontWeight={'600'}
                      onClick={() => {
                        if (props.empDetail.empNm === "") {
                          props.setAlertInfo({
                            isOpen: true,
                            status: "warning",
                            title: "사원을 선택해주세요.",
                            width: "fit-content",
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
                      borderRadius={'10px'}
                      fontWeight={'600'}
                      onClick={() => {
                        if (props.empDetail.empNm === "") {
                          props.setAlertInfo({
                            isOpen: true,
                            status: "warning",
                            title: "사원을 선택해주세요.",
                            width: "fit-content",
                          });
                          return;
                        }
                        if (tabStatus === 1) {
                          setModalType(4);
                          setModalTabStatus("type4");
                          onOpen();
                        } else if (tabStatus === 2) {
                          props.setEditState("deptDelete");
                          // setModalType(5);
                          // setModalTabStatus("type5");
                          // onOpen();
                        }
                      }}
                    >
                      삭제
                    </Button>
                  </Stack>
                ) : props.editState === "deptDelete" ? (
                  <Stack direction="row" spacing={4} align="center">
                    <Button  variant="brand"
                      borderRadius={'10px'}
                      fontWeight={'600'}
                      onClick={() => {
                      if (delEmpDep.length > 0) {
                        setModalType(5);
                        setModalTabStatus("type5");
                        onOpen();
                      } else {
                        props.setAlertInfo({
                          isOpen: true,
                          status: "warning",
                          title: "삭제할 조직을 선택해주세요.",
                          width: "fit-content",
                        });
                      }
                    }}>
                      삭제
                    </Button>
                    <Button
                      variant="action"
                      borderRadius={'10px'}
                      fontWeight={'600'}
                      onClick={() => {
                        props.setEditState("read");
                        props.resetInput();
                        props.setSelectedIndex(undefined);
                      }}
                    >
                      취소
                    </Button>
                  </Stack>) : (
                  <Stack direction="row" spacing={4} align="center">
                    <Button
                      variant="brand"
                      borderRadius={'10px'}
                      fontWeight={'600'}
                      onClick={() => {
                        if (tabStatus === 1) {
                          if (props.editState === "insert") {
                            props.onSaveEmpDetail();
                          } else if (props.editState === "update") {
                            props.updateEmpInfo();
                          }
                        } else if (tabStatus === 2) {
                          if (props.editState === "deptInsert") {
                            handleInsertCheck();
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
                      borderRadius={'10px'}
                      fontWeight={'600'}
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
                setEmpDetail={props.setEmpDetail}
                imgBase64={props.imgBase64}
                setImgBase64={props.setImgBase64}
                setImgFile={props.setImgFile}
                imgFile={props.imgFile}
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
                empDeptTmp={empDeptTmp}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {/* ID 변경 모달 */}
      {isOpen ? (
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
            modalType == 1
              ? updateEmpID
              : modalType == 2
                ? resetPwd
                : modalType == 3
                  ? updateWorkType
                  : modalType == 4
                    ? empDelete
                    : deleteChkEmpDep
          }
          children={
            modalType == 1 ? (
              <EmpIdChg 
              empCdTmp={props.empCdTmp}
                empDetail={props.empDetail}
                setEmpId={setEmpId}
                empId={empId}
                setModalTabStatus={setModalTabStatus}
                modalTabStatus={modalTabStatus}
                setIsIdChk={setIsIdChk}
                isIdChk={isIdChk}
                setAlertInfo={props.setAlertInfo}
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
            ) : (
              <EmpDepDel />
            )
          }
          size="2xl"
        />
      ) : (
        ""
      )}
    </>
  );
};

export default EmpInfo;
