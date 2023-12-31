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
import api from "api/Fetch";
import { set } from "lodash";
import dep from "api/dep/DepApi";

const DepInfo = ({
  org,
  setTest,
  setDpCd,
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
  const [depDto, setDepDto] = useState({ dpCd: "" });
  const [dg, setDg] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); // 모달 관련
  //부서 상세조회
  const getDepDto = async () => {
    setIsLoading(true);
    const response = await api.dep.getDepDtoApi(dpCd);
    setDepDto(response.voData);
    setIsLoading(false);
  };
  //부서원 조회
  const getDepGroup = async () => {
    setIsLoading(true);
    let corpDepCd = "";
    let search = "code";
    let res = await api.depGrp.getDepGepList(corpDepCd, search, dpCd, 1);
    setDg(res.pageInfo.list);
    setIsLoading(false);
  };

  //부서 등록
  const fetchSaveDep = async () => {
    const response = await api.dep.fetchSaveDepApi(depDto);
    if (response.status !== 200) {
      setAlertInfo({
        isOpen: true,
        title: response.resultMsg,
        status: "warning",
        width: "fit-content",
      });
    } else {
      setTest(true);
      setDepDto({
        dpNm: "",
        addr: "",
        upperCd: "",
        upperName: "",
        sort: "",
        stnd: "",
        recYN: true,
        typeCd: "",
        useYN: true,
        dpAbb: "",
        reqNm: "",
      });
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
    const response = await api.dep.fetchUpdateDepApi(depDto);
    if (response.status !== 200) {
      setAlertInfo({
        isOpen: true,
        title: response.resultMsg,
        status: "warning",
        width: "fit-content",
      });
    } else {
      setTest(true);
      setDepDto([
        {
          dpNm: "",
          addr: "",
          upperCd: "",
          upperName: "",
          sort: "",
          stnd: "",
          recYN: true,
          typeCd: "",
          useYN: true,
          dpAbb: "",
          reqNm: "",
        },
      ]);
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
    depSchema
      .validate(depDto)
      .then(() => {
        //  // 유효성 검사 통과한 데이터 처리
        isEditing ? fetchUpdateDep() : fetchSaveDep(); // isEditing: true => 수정 / false => 저장
      })
      .catch((errors) => {
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
    const response = await api.dep.deleteBtnApi(dpCd);
    if (response.status !== 200) {
      setAlertInfo({
        isOpen: true,
        title: response.resultMsg,
        status: "error",
        width: "fit-content",
      });
    } else {
      setDepDto({
        dpNm: "",
        addr: "",
        upperCd: "",
        upperName: "",
        sort: "",
        stnd: "",
        recYN: true,
        typeCd: "",
        useYN: true,
        dpAbb: "",
        reqNm: "",
      });
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
    if (dpCd !== undefined && dpCd !== 0) {
      getDepDto();
      getDepGroup();
      setIsEditing(true);
    } else {
      setDepDto({
        dpNm: "",
        addr: "",
        upperCd: "",
        upperName: "",
        sort: "",
        stnd: "",
        recYN: true,
        typeCd: "",
        useYN: true,
        dpAbb: "",
        reqNm: "",
      });
      setDg([]);
      setIsEditing(false);
    }
  }, [dpCd]);

  return (
    <>
      <Box
        borderRadius="5px"
        bg="white"
        h="700px"
        p="6"
        backgroundColor="white"
        overflowY={"auto"}
        // w={"1100px"} 혜윤 수정
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
              setDpCd={setDpCd}
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
                  setDepDto={setDepDto}
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
