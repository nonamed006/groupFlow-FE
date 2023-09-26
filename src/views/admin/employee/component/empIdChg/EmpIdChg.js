import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React, { useState } from "react";
import LoginIdChg from "./LoginIdChg";
import EmailIdChg from "./EmailIdChg";
import { PORT } from "set";

const EmpIdChg = (props) => {
  // input value값 받기 이벤트
  const handleChange = (e) => {
    props.setEmpId(e.target.value);
  };

  //사원 ID 중복체크
  const chkEmpId = () => {
    if(props.empId != ""){
    fetch(`${PORT}/emp/selectChkEmpId/${props.empId}/${props.modalTabStatus}`, {
      method: "GET",
      // res에 결과가 들어옴
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.resultMsg);
      });
    }else{
        alert("ID를 입력해주세요.");
    }
  };

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
            로그인ID변경
          </Tab>
          <Tab
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
            onClick={() => {
              props.setModalTabStatus("type2");
            }}
          >
            이메일ID변경
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <LoginIdChg
              loginId={props.empDetail.loginId}
              chkEmpId={chkEmpId}
              handleChange={handleChange}
            />
          </TabPanel>
          <TabPanel>
            <EmailIdChg
              mailId={props.empDetail.mailId}
              chkEmpId={chkEmpId}
              handleChange={handleChange}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default EmpIdChg;
