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
import { depGrpSchema } from "common/Schema";


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
      dpGrpCd: "DGA0001",
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
      reDt: "",
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
      empCd: "",
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
        delYn: 0,
        dpCd: "",
        dpGrpNum: "",
        dpGrpCd: "",
        dpNm: "",
        dpType: "DGB0001",
        dpTypeNm: "",
        empCd: empCdTmp, //수정필요
        empTypeCd: "",
        empTypeNm: "",
        fax: "",
        jobCd: "",
        jobDetail: "",
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

  //사원, 조직정보 등록 유효성 검사
  const handleInsertCheck = () => {
    if (imgFile != null) {
      //사원 정보 유효성
      empSchema
        .validate(empDetail)
        .then(() => {
          // 유효성 검사 통과한 데이터 처리
          //onSaveEmpDetail();

          //조직정보 유효성
          depGrpSchema.validate(empDept[0])
          .then(() => {
            // 유효성 검사 통과한 데이터 처리
            onSaveEmpDetail();
          })
          .catch((errors) => {
            // 유효성 검사 실패한 경우 에러 메세지
            setAlertInfo({
              isOpen: true,
              status: "warning",
              title: "조직 정보 입력값을 확인해주세요.",
              detail: errors.message,
              width: "fit-content",
            });
          });

        })
        .catch((errors) => {
          // 유효성 검사 실패한 경우 에러 메세지
          setAlertInfo({
            isOpen: true,
            status: "warning",
            title: "기본 정보 입력값을 확인해주세요.",
            detail: errors.message,
            width: "fit-content",
          });
        });
    } else {
      // 유효성 검사 실패한 경우 에러 메세지
      setAlertInfo({
        isOpen: true,
        status: "warning",
        title: "기본 정보 입력값을 확인해주세요.",
        detail: "사진을 등록해주세요.",
        width: "fit-content",
      });
    }
  };

  //사원, 조직 수정 유효성 검사
  const handleUpdateCheck = () => {
    let idx = 0;
    empUpdateSchema
      .validate(empDetail)
      .then(() => {
        empDept.map((data, index)=>{
          // 유효성 검사 통과한 데이터 처리
          depGrpSchema.validate(data)
          .then(() => {
            // 유효성 검사 통과한 데이터 처리
            //updateEmpInfo();
          })
          .catch((errors) => {
            idx++;
            // 유효성 검사 실패한 경우 에러 메세지
            setAlertInfo({
              isOpen: true,
              status: "warning",
              title: "조직 정보 입력값을 확인해주세요.",
              detail: errors.message,
              width: "fit-content",
            });
          });
        })
      }).then(()=>{
        updateEmpInfo();
      })
      .catch((errors) => {
        // 유효성 검사 실패한 경우 에러 메세지
        setAlertInfo({
          isOpen: true,
          status: "warning",
          title: "사원 정보 입력값을 확인해주세요.",
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

    //조직정보 추가
    fd.append("depGrpDtoList[0].addr", empDept[0].addr);
    fd.append("depGrpDtoList[0].addrDetail", empDept[0].addrDetail);
    fd.append("depGrpDtoList[0].coCd", empDept[0].coCd);
    fd.append("depGrpDtoList[0].coNm", empDept[0].coNm);
    fd.append("depGrpDtoList[0].coType", empDept[0].coType);
    fd.append("depGrpDtoList[0].coTypeNm", empDept[0].coTypeNm);
    fd.append("depGrpDtoList[0].delYn", empDept[0].delYn);
    fd.append("depGrpDtoList[0].dpCd", empDept[0].dpCd);
    fd.append("depGrpDtoList[0].dpGrpNum", empDept[0].dpGrpNum);
    fd.append("depGrpDtoList[0].dpGrpCd", empDept[0].dpGrpCd);
    fd.append("depGrpDtoList[0].dpNm", empDept[0].dpNm);
    fd.append("depGrpDtoList[0].dpType", empDept[0].dpType);
    fd.append("depGrpDtoList[0].dpTypeNm", empDept[0].dpTypeNm);
    fd.append("depGrpDtoList[0].empTypeCd", empDept[0].empTypeCd);
    fd.append("depGrpDtoList[0].empTypeNm", empDept[0].empTypeNm);
    fd.append("depGrpDtoList[0].fax", empDept[0].fax);
    fd.append("depGrpDtoList[0].jobCd", empDept[0].jobCd);
    fd.append("depGrpDtoList[0].jobDetail", empDept[0].jobDetail);
    fd.append("depGrpDtoList[0].joinDt", empDept[0].joinDt);
    fd.append("depGrpDtoList[0].postNum", empDept[0].postNum);
    fd.append("depGrpDtoList[0].pstnCd", empDept[0].pstnCd);
    fd.append("depGrpDtoList[0].rankCd", empDept[0].rankCd);
    fd.append("depGrpDtoList[0].reDt", empDept[0].reDt);
    fd.append("depGrpDtoList[0].telNum", empDept[0].telNum);
    fd.append("depGrpDtoList[0].workTypeCd", empDept[0].workTypeCd);

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
     empDetail.depGrpDtoList = empDept;
    //const res = await api.emp.updateEmpInfo(empDetail); 

    const fd = new FormData();
    if(imgFile != null){
      Object.values(imgFile).forEach((file) => fd.append("file", file));
    }

    fd.append("empCd", empDetail.empCd)
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

    //조직정보 추가
    empDept.map((data, i)=>{
    fd.append("depGrpDtoList["+i+"].addr", data.addr);
    fd.append("depGrpDtoList["+i+"].addrDetail", data.addrDetail);
    fd.append("depGrpDtoList["+i+"].coCd", data.coCd);
    fd.append("depGrpDtoList["+i+"].coNm", data.coNm);
    fd.append("depGrpDtoList["+i+"].coType", data.coType);
    fd.append("depGrpDtoList["+i+"].coTypeNm", data.coTypeNm);
    fd.append("depGrpDtoList["+i+"].delYn", data.delYn);
    fd.append("depGrpDtoList["+i+"].dpCd", data.dpCd);
    fd.append("depGrpDtoList["+i+"].dpGrpNum", data.dpGrpNum);
    fd.append("depGrpDtoList["+i+"].dpGrpCd", data.dpGrpCd);
    fd.append("depGrpDtoList["+i+"].dpNm", data.dpNm);
    fd.append("depGrpDtoList["+i+"].dpType", data.dpType);
    fd.append("depGrpDtoList["+i+"].dpTypeNm", data.dpTypeNm);
    fd.append("depGrpDtoList["+i+"].empTypeCd", data.empTypeCd);
    fd.append("depGrpDtoList["+i+"].empTypeNm", data.empTypeNm);
    fd.append("depGrpDtoList["+i+"].fax", data.fax);
    fd.append("depGrpDtoList["+i+"].jobCd", data.jobCd);
    fd.append("depGrpDtoList["+i+"].jobDetail", data.jobDetail);
    fd.append("depGrpDtoList["+i+"].joinDt", data.joinDt);
    fd.append("depGrpDtoList["+i+"].postNum", data.postNum);
    fd.append("depGrpDtoList["+i+"].pstnCd", data.pstnCd);
    fd.append("depGrpDtoList["+i+"].rankCd", data.rankCd);
    fd.append("depGrpDtoList["+i+"].reDt", data.reDt);
    fd.append("depGrpDtoList["+i+"].telNum", data.telNum);
    fd.append("depGrpDtoList["+i+"].workTypeCd", data.workTypeCd);
    fd.append("depGrpDtoList["+i+"].empCd", data.empCd);
    });

    fetch(`${PORT}/emp/updateEmpInfo`, {
      method: "POST",
      body: fd,
      credentials: "include",
      // res에 결과가 들어옴
    }).then((res) => res.json())
    .then((res) => {
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

    });
  };

  useEffect(() => {
    getEmpList("", "", "");
  }, [isReload]);


  return (
      <Box h={'full'}  overflowY={'hidden'}>{/* pt={{ base: "150px", md: "100px", xl: "100px" }} 혜윤 수정 */}
        <Grid
          //h="100px"
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
              resetEmpDept={resetEmpDept}
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
