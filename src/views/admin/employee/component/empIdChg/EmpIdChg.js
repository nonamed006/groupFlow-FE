import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import LoginIdChg from "./LoginIdChg";
import EmailIdChg from "./EmailIdChg";
import api from "api/Fetch";

const EmpIdChg = (props) => {
  // input value값 받기 이벤트
  const handleChange = (e) => {
    props.setEmpId(e.target.value);
  };

  //사원 ID 중복체크
  const chkEmpId = async() => {
    if(props.empId != ""){
      const res = await api.emp.updateEmpInfo(props.empId,props.modalTabStatus);

      if (res.status === 200) {
        props.setAlertInfo({
          isOpen: true,
          status: "success",
          title: res.resultMsg,
          width: "fit-content",
        });
        props.setIsIdChk(false);
      }else{
        props.setAlertInfo({
          isOpen: true,
          status: "success",
          title: res.resultMsg,
          width: "fit-content",
        });
      }
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
                props.setIsIdChk(false);
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
              props.setIsIdChk(false);
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
