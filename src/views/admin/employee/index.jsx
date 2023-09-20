import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchCardBar from "./component/SearchCardBar";
import { PORT } from "set";
import EmpCard from "./component/empCard/EmpCard";
import EmpInfo from "./component/empInfo/EmpInfo";
import { useDispatch } from "react-redux";
import { setIsRead } from "redux/emp";

const Employee = () => {
  //리덕스
  const dispatch = useDispatch();

  //state
  const [empList, setEmpList] = useState([]);
  const [empNum, setEmpNum] = useState();
  const [empDetail, setEmpDetail] = useState({});
  const [empDept, setEmpDept] = useState({});
  const [imgFile, setImgFile] = useState(null); //파일

  //사원 목록 조회
  const getEmpList = (searchCorp, searchWorkType, searchNm) => {
    fetch(
      `${PORT}/emp/getEmp?searchCorp=${searchCorp}&searchWorkType=${searchWorkType}&searchNm=${searchNm}`,
      {
        method: "GET",
        // res에 결과가 들어옴
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setEmpList(res.data);
        setEmpNum(res.strData);
      });
  };

  // 사원의 조직 정보
  const getDeptInfo = (empCd) => {
    fetch(`${PORT}/emp/selectEmpDeptList/${empCd}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setEmpDept(res.data);
      });
  };

  // 사원 목록 클릭시
  const onClickRow = (empList) => {
    getDeptInfo(empList.empCd);
    setEmpDetail(empList);
    dispatch(setIsRead(true));
  };

  // input 값 초기화
  const resetInput = () => {
    setEmpDetail({
      empNm: "",
      mailId: "",
      loginId: "",
      loginPw: "",
      signPw: "",
      psnMail: "",
      payMail: "",
      empTel: "",
      postNum: "",
      addr: "",
      addrDetail: "",
      joinDt: "",
      reDt: "",
      workTypeCd: "",
      useYn: "1",
      gender: "M",
    });
  };

  //사원 기본정보 저장
  const onSaveEmpDetail= () => {
    const fd = new FormData();
    Object.values(imgFile).forEach((file) => fd.append("file", file));

    fd.append("empNm", empDetail.empNm);
    fd.append("mailId", empDetail.mailId);
    fd.append("loginId", empDetail.loginId);
    fd.append("loginPw", empDetail.loginPw);
    fd.append("signPw", empDetail.signPw);
    fd.append("gender", empDetail.gender);
    fd.append("psnMail", empDetail.psnMail);
    fd.append("payMail", empDetail.payMail);
    fd.append("empTel", empDetail.empTel);
    fd.append("postNum", empDetail.postNum);
    fd.append("addr", empDetail.addr);
    fd.append("addrDetail", empDetail.addrDetail);
    fd.append("joinDt", empDetail.joinDt);
    fd.append("workTypeCd", empDetail.workTypeCd);
    fd.append("useYn", empDetail.useYn);

    fetch(`${PORT}/emp/insertEmp`, {
      method: "POST",
      body: fd,
      // res에 결과가 들어옴
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result == "success") {
        }else{
        }
      });
  }

  useEffect(() => {
    getEmpList("", "", "");
  }, []);

  return (
    <div>
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <Grid
          h="1000px"
          templateRows="repeat(11, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={5}
        >
          <GridItem colSpan={6} rowSpan={1}>
            <SearchCardBar getEmpList={getEmpList} />
          </GridItem>
          <GridItem colSpan={2} rowSpan={5}>
            <EmpCard
              empList={empList}
              empNum={empNum}
              onClickRow={onClickRow}
              resetInput={resetInput}
            />
          </GridItem>
          <GridItem colSpan={4} rowSpan={5}>
            <EmpInfo
              empDetail={empDetail}
              setEmpDetail={setEmpDetail}
              empDept={empDept}
              setImgFile={setImgFile}
              resetInput={resetInput}
              onSaveEmpDetail={onSaveEmpDetail}
            />
          </GridItem>
        </Grid>
      </Box>
    </div>
  );
};

export default Employee;
