/* eslint-disable */

import {
  Box,
  Flex,
  TabPanels,
  TabPanel,
  Tab,
  Tabs,
  TabList,
  Spacer,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";

import React, { useEffect, useState } from "react";
import DepInfoBox from "./DepInfoBox";
import { PORT } from "set";
import DepBasic from "./DepBasic";
import DepGroup from "./DepGroup/DepGroup";
import { depSchema } from "common/Schema";
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
}) => {
  const [isEditing, setIsEditing] = useState(false); // 저장 및 수정 상태 (기본값 false - 저장)
  const [depDto, setDepDto] = useState({});
  const [dg, setDg] = useState([]);

  //부서 상세조회
  const getDepDto = async () => {
    const response = await getDepDtoApi(dpCd);
    setDepDto(response.voData);
  };

  //부서원 조회
  const getDepGroup = async () => {
    const response = await getDepGroupApi(dpCd);
    setDg(response.data);
  };

  //부서 등록
  const fetchSaveDep = async () => {
    const response = await fetchSaveDepApi(depDto);
    if (response.status !== 200) {
      alert(response.resultMsg);
    } else {
      setTest(true);
      setDepDto([]);
      setTabStatus(1);
      setEditState("read");
      alert(response.resultMsg);
    }
  };

  //부서 수정
  const fetchUpdateDep = async () => {
    const response = await fetchUpdateDepApi(depDto);
    if (response.status !== 200) {
      alert(response.resultMsg);
    } else {
      setTest(true);
      setDepDto([]);
      setTabStatus(1);
      setEditState("read");
      alert(response.resultMsg);
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
        // 유효성 검사 실패한 경우 에러 메세지
        alert(errors.message);
      });
  };

  const deleteBtn = async () => {
    const response = await deleteBtnApi(dpCd);
    if (response.status !== 200) {
      alert(response.resultMsg);
    } else {
      setDepDto([]);
      setTest(true);
      alert(response.resultMsg);
    }
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
              updateBtn={updateBtn}
              deleteBtn={deleteBtn}
              setTest={setTest}
              setEditState={setEditState}
              setDepDto={setDepDto}
              tabStatus={tabStatus}
              setTabStatus={setTabStatus}
            />
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box w={"100%"} justifyContent={"center"} alignContent={"center"}>
                <DepBasic
                  depDto={depDto}
                  editState={editState}
                  change={change}
                />
              </Box>
            </TabPanel>
            <TabPanel>
              <DepGroup value={dg} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
};

export default DepInfo;
