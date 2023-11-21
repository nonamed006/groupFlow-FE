import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchCardBar from "./component/SearchCardBar";
import { PORT } from "set";
import EmpCard from "./component/empCard/EmpCard";
import EmpInfo from "./component/empInfo/EmpInfo";
import { getCookie } from "common/common";
import CommonAlert from "common/component/CommonAlert";
import { empSchema } from "common/Schema";
import { empUpdateSchema } from "common/Schema";
import api from "api/Fetch";

const Employee = () => {
  //state
  const [empList, setEmpList] = useState([]);
  const [empNum, setEmpNum] = useState();
  const [empDetail, setEmpDetail] = useState({});
  const [imgFile, setImgFile] = useState(null); //파일
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [empCdTmp, setEmpCdTmp] = useState("");
  const [empTmp, setEmpTmp] = useState({});

  const [editState, setEditState] = useState("read");
  const [isReload, setIsReload] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(undefined);

  const [isLoading, setIsLoading] = useState(true);

  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
  });

  const [empDept, setEmpDept] = useState([
    {
      addr: "",
      addrDetail: "",
      coCd: "",
      coNm: "",
      coType: "",
      coTypeNm: "",
      delYn: "",
      dpCd: "",
      dpGrpNum: "",
      dpGrpcd: "DGA0001",
      dpNm: "",
      dpType: "DGB0001",
      dpTypeNm: "",
      empCd: empCdTmp,
      empTypeCd: "",
      empTypeNm: "",
      fax: "",
      jobCd: "",
      jobDetail: "",
      jobNm: "",
      joinDt: "",
      postNum: "",
      pstnCd: "",
      pstnNm: "",
      rankCd: "",
      rankNm: "",
      reDt: null,
      telNum: "",
      workTypeCd: "",
      workTypeNm: "",
    },
  ]);

  //사원 목록 조회
  const getEmpList = async(srhCorp, srhWorkType, srhNm) => {
    const res = await api.emp.getEmpList(srhCorp, srhWorkType, srhNm);

    if(res.status === 200){
      resetInput();
      setEmpList(res.data);
      setEmpNum(res.strData);
      setSelectedIndex(undefined);
    }
  };

  // 사원의 조직 정보
  const getDeptInfo = async(empCd) => {
    const res = await api.emp.getDeptInfo(empCd);

    if(res.status === 200){
      setEmpDept(res.data);
    }
  };

  // 사원 목록 클릭시
  const onClickRow = (empList) => {
    setEmpCdTmp(empList.empCd);
    resetInput();
    setEditState("read");
    getDeptInfo(empList.empCd);
    setEmpDetail(empList);
    setEmpTmp(empList);
  };

  const resetEmpDetail = () => {
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
      empPw: "",
    });
  }

  const resetEmpDept = () => {
    setEmpDept([
      {
        addr: "",
        addrDetail: "",
        coCd: "",
        coNm: "",
        coType: "DGA0001",
        coTypeNm: "",
        delYn: "",
        dpCd: "",
        dpGrpNum: "",
        dpGrpcd: "",
        dpNm: "",
        dpType: "DGB0001",
        dpTypeNm: "",
        empCd: empCdTmp, //수정필요
        empTypeCd: "",
        empTypeNm: "",
        fax: "",
        jobCd: "",
        jobDetail: "",
        jobNm: "",
        joinDt: "",
        postNum: "",
        pstnCd: "",
        pstnNm: "",
        rankCd: "",
        rankNm: "",
        reDt: "",
        telNum: "",
        workTypeCd: "",
        workTypeNm: "",
      },
    ]);
  }

  // input 값 초기화
  const resetInput = () => {
    setImgBase64([]);

    resetEmpDetail();
    resetEmpDept();
  };

  //유효성 검사
  const handleInsertCheck = () => {
    if (imgFile != null) {
      empSchema
        .validate(empDetail)
        .then(() => {
          // 유효성 검사 통과한 데이터 처리
          onSaveEmpDetail();
        })
        .catch((errors) => {
          // 유효성 검사 실패한 경우 에러 메세지
          setAlertInfo({
            isOpen: true,
            status: "warning",
            title: "입력값을 확인해주세요.",
            detail: errors.message,
            width: "fit-content",
          });
        });
    } else {
      // 유효성 검사 실패한 경우 에러 메세지
      setAlertInfo({
        isOpen: true,
        status: "warning",
        title: "입력값을 확인해주세요.",
        detail: "사진을 등록해주세요.",
        width: "fit-content",
      });
    }
  };

  //유효성 검사
  const handleUpdateCheck = () => {
    empUpdateSchema
      .validate(empDetail)
      .then(() => {
        // 유효성 검사 통과한 데이터 처리
        updateEmpInfo();
      })
      .catch((errors) => {
        // 유효성 검사 실패한 경우 에러 메세지
        setAlertInfo({
          isOpen: true,
          status: "warning",
          title: "입력값을 확인해주세요.",
          detail: errors.message,
          width: "fit-content",
        });
      });
  };

  //사원 기본정보 저장
  const onSaveEmpDetail = () => {
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
      credentials: "include",
      // res에 결과가 들어옴
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setAlertInfo({
            isOpen: true,
            status: "success",
            title: res.resultMsg,
            width: "fit-content",
          });
          setEditState("read");
          setIsReload(!isReload);
        } else {
          setAlertInfo({
            isOpen: true,
            status: "warning",
            title: res.resultMsg,
            width: "fit-content",
          });
        }
      });
  };

   //사원 정보 수정
   const updateEmpInfo = async() =>{
    const res = await api.emp.updateEmpInfo(empDetail);

    if(res.status === 200){
      setAlertInfo({
        isOpen: true,
        status: "success",
        title: res.resultMsg,
        width: "fit-content",
      });
      setEditState("read");
      setIsReload(!isReload);
    }else{
      setAlertInfo({
        isOpen: true,
        status: "error",
        title: res.resultMsg,
        width: "fit-content",
      });
    }
  };

  useEffect(() => {
    getEmpList("", "", "");
  }, [isReload]);

  const tabClick = () => {
    document.getElementById("tabs-44--tab-0").click();
  };

  return (
      <Box h={'full'}>{/* pt={{ base: "150px", md: "100px", xl: "100px" }} 혜윤 수정 */}
        <Grid
          //h="1000px"
          h={'full'} // 혜윤 수정
          templateRows="repeat(11, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={5}
        >
          <GridItem colSpan={6} rowSpan={1}>
            <SearchCardBar getEmpList={getEmpList} setSelectedIndex={setSelectedIndex}/> 
          </GridItem>
          <GridItem colSpan={2} rowSpan={5}>
            <EmpCard
              empList={empList}
              empNum={empNum}
              onClickRow={onClickRow}
              resetInput={resetInput}
              setEditState={setEditState}
              editState={editState}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              tabClick={tabClick}
            />
          </GridItem>
          <GridItem colSpan={4} rowSpan={5}>
            <EmpInfo
              setIsReload={setIsReload}
              isReload={isReload}
              empDetail={empDetail}
              setEmpDetail={setEmpDetail}
              empDept={empDept}
              setEmpDept={setEmpDept}
              setImgFile={setImgFile}
              resetInput={resetInput}
              onSaveEmpDetail={handleInsertCheck}
              setEditState={setEditState}
              editState={editState}
              updateEmpInfo={handleUpdateCheck}
              setAlertInfo={setAlertInfo}
              imgBase64={imgBase64}
              setImgBase64={setImgBase64}
              setSelectedIndex={setSelectedIndex}
              selectedIndex={selectedIndex}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              empCdTmp={empCdTmp}
              empTmp={empTmp}
              getDeptInfo={getDeptInfo}
            />
          </GridItem>
        </Grid>
        {alertInfo.isOpen &&
				<CommonAlert
					alertInfo={alertInfo}
					setAlertInfo={setAlertInfo}
				/>
			}
    </Box>
  );
};

export default Employee;
