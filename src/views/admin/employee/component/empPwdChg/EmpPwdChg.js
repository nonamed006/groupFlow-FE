import React, { useState } from "react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import LoginPwdTab from "./LoginPwdTab";
import SignPwdTab from "./SignPwdTab";

const EmpPwdChg = (props) => {

   // input value값 받기 이벤트
  const handleChange = (e) => {
    props.setEmpPwd(e.target.value);
  };

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <div>
      <Tabs colorScheme="brandScheme">
        <TabList>
          <Tab
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
            onClick={() => {
              props.setModalTabStatus("type1");
            }}
          >
            로그인 비밀번호
          </Tab>
          <Tab
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
            onClick={() => {
              props.setModalTabStatus("type2");
            }}
          >
            결재 비밀번호
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <LoginPwdTab
              handleChange={handleChange}
              handleClick={handleClick}
              show={show}
            />
          </TabPanel>
          <TabPanel>
            <SignPwdTab
              handleChange={handleChange}
              handleClick={handleClick}
              show={show}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default EmpPwdChg;
