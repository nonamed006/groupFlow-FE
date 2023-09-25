import {
  Box,
  Flex,
  TabPanels,
  TabPanel,
  Tab,
  Tabs,
  TabList,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";

import React, { useEffect, useState } from "react";
import DepInfoBox from "./DepInfoBox";
import { useSelector } from "react-redux";
import { PORT } from "set";
import DepBasic from "./DepBasic";
import DepGroup from "./DepGroup";

const EmpInfo = ({ setTest, dpCd }) => {
  //const dpCd = useSelector((state) => state.depDetail.dataPk);
  const [isEditing, setIsEditing] = useState(false); // 저장 및 수정 상태 (기본값 false - 저장)

  const [depDto, setDepDto] = useState({});
  const [dg, setDg] = useState([]);
  //부서 상세조회
  const getDepDto = () => {
    let url = `${PORT}/dep/detail?dpCd=${dpCd}`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setDepDto(res.voData);
      });
  };

  //부서원 조회
  const getDepGroup = () => {
    let url = `${PORT}/dep/dg?dpCd=${dpCd}`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setDg(res.data);
      });
  };

  const fetchSaveDep = () => {
    let url = `${PORT}/dep`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(depDto),
    })
      .then((res) => res.json())
      .then((res) => {});
  };

  const fetchUpdateDep = () => {
    let url = `${PORT}/dep`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(depDto),
    })
      .then((res) => res.json())
      .then((res) => {
        setDepDto(res);
      });
  };
  const change = (depDto) => {
    console.log(depDto);
    setDepDto(depDto);
  };
  const updateBtn = () => {
    setTest(true);
    isEditing ? fetchUpdateDep() : fetchSaveDep(); // isEditing: true => 수정 / false => 저장
  };
  const deleteBtn = () => {
    setTest(true);
    let url = `${PORT}/dep?dpCd=${dpCd}`;
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  };
  useEffect(() => {
    if (dpCd != 0) {
      getDepDto();
      getDepGroup();
      setIsEditing(true);
    } else {
      setDepDto([]);
      setIsEditing(false);
    }
  }, [dpCd]);
  return (
    <div>
      <Box borderRadius="lg" bg="white" h="600px" p="6" w={"100%"}>
        <DepInfoBox
          title={"상세정보"}
          updateBtn={updateBtn}
          deleteBtn={deleteBtn}
          setTest={setTest}
        />
        <Tabs colorScheme="brandScheme">
          <TabList>
            <Flex align={{ sm: "flex-start", lg: "center" }} w="100%">
              <Tab fontSize="22px" fontWeight="700" lineHeight="100%">
                기본정보
              </Tab>
              <Tab fontSize="22px" fontWeight="700" lineHeight="100%">
                조직정보
              </Tab>
            </Flex>
          </TabList>
          <TabPanels>
            <TabPanel>
              <DepBasic value={depDto} change={change} />
            </TabPanel>
            <TabPanel>
              <DepGroup value={dg} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default EmpInfo;
