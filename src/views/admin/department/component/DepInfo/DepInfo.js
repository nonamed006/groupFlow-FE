import {
  Box,
  Flex,
  TabPanels,
  TabPanel,
  Tab,
  Tabs,
  TabList,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";

import React, { useEffect, useState } from "react";
import DepInfoBox from "./DepInfoBox";
import DepBasic from "./DepBasic";
import DepGroup from "./DepGroup/DepGroup";
import { depSchema } from "common/Schema";
import DeleteModal from "common/modal/DeleteModal";
import {
  getDepDtoApi,
  getDepGroupApi,
  fetchSaveDepApi,
  fetchUpdateDepApi,
  deleteBtnApi,
} from "api/dep/DepApi";

const DepInfo = ({
  setTest,
  dpCd,
  editState,
  setEditState,
  setTabStatus,
  tabStatus,
  setAlertInfo,
  setIsLoading,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false); // 저장 및 수정 상태 (기본값 false - 저장)
  const [depDto, setDepDto] = useState({});
  const [dg, setDg] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 관련

  //부서 상세조회
  const getDepDto = async () => {
    setIsLoading(true);
    const response = await getDepDtoApi(dpCd);
    setDepDto(response.voData);
    setIsLoading(false);
  };

  //부서원 조회
  const getDepGroup = async () => {
    setIsLoading(true);
    const response = await getDepGroupApi(dpCd);
    setDg(response.data);
    setIsLoading(false);
  };

  //부서 등록
  const fetchSaveDep = async () => {
    const response = await fetchSaveDepApi(depDto);
    if (response.status !== 200) {
      setAlertInfo({
        isOpen: true,
        title: response.resultMsg,
        status: "error",
        width: "fit-content",
      });
    } else {
      setTest(true);
      setDepDto([]);
      setTabStatus(1);
      setEditState("read");
      setAlertInfo({
        isOpen: true,
        title: response.resultMsg,
        status: "success",
        width: "fit-content",
      });
    }
  };

  //부서 수정
  const fetchUpdateDep = async () => {
    const response = await fetchUpdateDepApi(depDto);
    if (response.status !== 200) {
      setAlertInfo({
        isOpen: true,
        title: response.resultMsg,
        status: "warning",
        width: "fit-content",
      });
    } else {
      setTest(true);
      setDepDto([]);
      setTabStatus(1);
      setEditState("read");
      setAlertInfo({
        isOpen: true,
        title: response.resultMsg,
        status: "success",
        width: "fit-content",
      });
    }
  };
  const change = (depDto) => {
    setDepDto(depDto);
  };
  const updateBtn = () => {
    console.log(depDto);
    depSchema
      .validate(depDto)
      .then(() => {
        //  // 유효성 검사 통과한 데이터 처리
        isEditing ? fetchUpdateDep() : fetchSaveDep(); // isEditing: true => 수정 / false => 저장
        console.log("유효성 검사 통과");
      })
      .catch((errors) => {
        console.log(errors);
        // 유효성 검사 실패한 경우 에러 메세지
        setAlertInfo({
          isOpen: true,
          title: "필수값 미입력",
          detail: errors.message,
          status: "warning",
          width: "fit-content",
        });
      });
  };

  //부서 삭제
  const deleteBtn = async () => {
    const response = await deleteBtnApi(dpCd);
    if (response.status !== 200) {
      setAlertInfo({
        isOpen: true,
        title: response.resultMsg,
        status: "error",
        width: "fit-content",
      });
    } else {
      setDepDto([]);
      setTest(true);
      setAlertInfo({
        isOpen: true,
        title: response.resultMsg,
        status: "success",
        width: "fit-content",
      });
    }
    onClose();
  };
  useEffect(() => {
    if (dpCd !== 0) {
      getDepDto();
      getDepGroup();
      setIsEditing(true);
    } else {
      setDepDto({
        dpCd: "",
      });
      setIsEditing(false);
    }
  }, [dpCd]);
  return (
    <>
      <Box
        borderRadius="lg"
        bg="white"
        h="700px"
        p="6"
        backgroundColor="white"
        overflowY={"auto"}
        w={"1100px"}
      >
        <Tabs colorScheme="brandScheme">
          <TabList>
            <Flex>
              <Tab fontSize="22px" fontWeight="700" lineHeight="100%">
                기본정보
              </Tab>
              <Tab fontSize="22px" fontWeight="700" lineHeight="100%">
                부서원 정보
              </Tab>
            </Flex>
            <Spacer />
            <DepInfoBox
              depDto={depDto}
              updateBtn={updateBtn}
              onOpen={onOpen}
              setTest={setTest}
              setEditState={setEditState}
              setDepDto={setDepDto}
              tabStatus={tabStatus}
              setTabStatus={setTabStatus}
              setAlertInfo={setAlertInfo}
            />
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box w={"100%"} justifyContent={"center"} alignContent={"center"}>
                <DepBasic
                  depDto={depDto}
                  editState={editState}
                  change={change}
                  setAlertInfo={setAlertInfo}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <DepGroup value={dg} isLoading={isLoading} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      {/* 삭제 확인 모달 */}
      {isOpen && isEditing && (
        <DeleteModal
          isOpen={isOpen}
          onClose={onClose}
          handleCheck={deleteBtn}
        />
      )}
    </>
  );
};

export default DepInfo;
