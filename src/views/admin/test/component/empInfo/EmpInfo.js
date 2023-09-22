import {
  Box,
  Button,
  Flex,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Input,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import EmpTab1 from "./EmpTab1";
import EmpTab2 from "./EmpTab2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PORT } from "set";
import { MdAttachFile } from "react-icons/md";
import { minTimeDate } from "common/common";
import { setIsRead } from "redux/emp";
import { setEmpList } from "redux/emp";

const EmpInfo = () => {

  //리덕스
	const dispatch = useDispatch();

  const empList = useSelector((state) => state.emp.empList);
  const isReadStatus = useSelector((state) => state.emp.isRead);

  const [tabStatus, setTabStatus] = useState(1);
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [empInfo, setEmpInfo] = useState({
    empNm: '',
    mailId: '',
    loginId: '',
    loginPw: '',
    signPw: '',
    psnMail: '',
    payMail: '',
    empTel: '',
    postNum: '',
    addr: '',
    addrDetail: '',
    joinDt: '',
    workTypeCd: '',
    useYn: "1",
    gender: "M",
  });

  // 파일 등록 버튼
  const fileUploadBtn = () => {
    document.getElementById("fileUpBtn").click();
  };

  // file 값 받기
  const handleChangeFile = (e) => {
    setImgFile(e.target.files);
    setImgBase64([]);
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          if (base64) {
            var base64Sub = base64.toString();

            setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };

  // input value값 받기 이벤트
  const handleChange = (e) => {
    setEmpInfo({ ...empInfo, [e.target.id]: e.target.value });
  };

  //radio 값 받기 이벤트
  const handleRadioChange = (e) => {
    setEmpInfo({ ...empInfo, [e.target.name]: e.target.checked });
  };

  // input 값 초기화
  const resetInput = () => {
    setEmpInfo({
      empNm: '',
      mailId: '',
      loginId: '',
      loginPw: '',
      signPw: '',
      psnMail: '',
      payMail: '',
      empTel: '',
      postNum: '',
      addr: '',
      addrDetail: '',
      joinDt: '',
      workTypeCd: '',
      useYn: "1",
      gender: "M",
    });
    //스토어에 값 바꿔주기
    dispatch(setEmpList({
      empNm: '',
      mailId: '',
      loginId: '',
      loginPw: '',
      signPw: '',
      psnMail: '',
      payMail: '',
      empTel: '',
      postNum: '',
      addr: '',
      addrDetail: '',
      joinDt: '',
      workTypeCd: '',
      useYn: "1",
      gender: "M",
    }));
  }

  //사원 등록
  const insertEmp = () => {
    const fd = new FormData();
    Object.values(imgFile).forEach((file) => fd.append("file", file));

    fd.append("empNm", empInfo.empNm);
    fd.append("mailId", empInfo.mailId);
    fd.append("loginId", empInfo.loginId);
    fd.append("loginPw", empInfo.loginPw);
    fd.append("signPw", empInfo.signPw);
    fd.append("gender", empInfo.gender);
    fd.append("psnMail", empInfo.psnMail);
    fd.append("payMail", empInfo.payMail);
    fd.append("empTel", empInfo.empTel);
    fd.append("postNum", empInfo.postNum);
    fd.append("addr", empInfo.addr);
    fd.append("addrDetail", empInfo.addrDetail);
    fd.append("joinDt", empInfo.joinDt);
    fd.append("workTypeCd", empInfo.workTypeCd);
    fd.append("useYn", empInfo.useYn);

    fetch(`${PORT}/emp/insertEmp`, {
      method: "POST",
      body: fd,
      // res에 결과가 들어옴
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.result == "success") {
          alert("저장되었습니다.");
        }
      });
  };



  return (
    <div>
      <Box borderRadius="lg" bg="white" h="700px" p="6">
        <Tabs colorScheme="brandScheme">
          <TabList>
            <Flex align={{ sm: "flex-start", lg: "center" }} w="100%">
              <Tab
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
                onClick={() => {
                  setTabStatus(1);
                }}
              >
                기본정보
              </Tab>
              <Tab
                fontSize="22px"
                fontWeight="700"
                lineHeight="100%"
                onClick={() => {
                  setTabStatus(2);
                }}
              >
                조직정보
              </Tab>
              <Spacer />
              <Flex>
                {isReadStatus ? (
                  <Stack direction="row" spacing={4} align="center">
                  <Button variant="action" onClick={{}}>
                    ID 변경
                  </Button>
                  <Button variant="action" onClick={()=>{alert("asd");}}>
                    비밀번호 초기화
                  </Button>
                  <Button variant="action" onClick={{}}>
                    퇴사처리
                  </Button>
                </Stack>
                ) : (
                  <Stack direction="row" spacing={4} align="center">
                    <Button variant="brand" onClick={() => insertEmp()}>
                      저장
                    </Button>
                    <Button variant="action" onClick={()=>{dispatch(setIsRead(true)); resetInput();}}>취소</Button>
                  </Stack>
                )}
              </Flex>
            </Flex>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid
                templateColumns="repeat(13, 1fr)"
                templateRows="repeat(12, 1fr)"
                gap={2}
              >
                <GridItem colSpan={2} rowSpan={4}>
                  <Text fontSize="sm" fontWeight="600">
                    사진
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7} rowSpan={4}>
                  <Box>
                    <Stack direction="row">
                      <Image
                        w="150px"
                        h="200px"
                        fallbackSrc="https://via.placeholder.com/150"
                        src={imgBase64}
                        alt="사원사진"
                        border="1px solid lightgray"
                      />

                      <IconButton
                        variant="outline"
                        colorScheme="brand"
                        borderRadius="5px"
                        aria-label="Call Fred"
                        fontSize="20px"
                        icon={<MdAttachFile />}
                        onClick={() => fileUploadBtn()}
                      />
                      <Input
                        type="file"
                        id="fileUpBtn"
                        multiple
                        display="none"
                        onChange={handleChangeFile}
                      ></Input>
                    </Stack>
                  </Box>
                </GridItem>

                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                    개인메일
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14}>
                  <Input
                    id="psnMail"
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    value={empList.psnMail}
                    isReadOnly={isReadStatus}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                    급여메일
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14}>
                  <Input
                    id="payMail"
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    value={empList?.payMail}
                    isReadOnly={isReadStatus}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                    최초입사일
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14}>
                  <Input
                    id="joinDt"
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    style={{ color: "gray" }}
                    value={minTimeDate(empList?.joinDt)}
                    isReadOnly={isReadStatus}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                    최종퇴사일
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14}>
                  <Input
                    id="reDt"
                    placeholder="Select Date and Time"
                    size="md"
                    type="date"
                    style={{ color: "gray" }}
                    value={minTimeDate(empList?.reDt)}
                    isReadOnly={isReadStatus}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem colStart={1}>
                  <Text fontSize="sm" fontWeight="600">
                    이름
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    id="empNm"
                    placeholder="이름"
                    size="md"
                    borderRadius="14px"
                    value={empList.empNm}
                    isReadOnly={isReadStatus}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem colStart={8} colEnd={10} rowSpan={8}>
                  <Text fontSize="sm" fontWeight="600">
                    주소
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14} rowSpan={8}>
                  <Input
                    id="addr"
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    value={empList?.addr}
                    isReadOnly={isReadStatus}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    성별
                  </Text>
                </GridItem>
                <GridItem colSpan={4}>
                  <RadioGroup defaultValue="M">
                    <HStack spacing="24px">
                      <Radio
                        value="M"
                        id="M"
                        name="gender"
                        onChange={handleRadioChange}
                        isReadOnly={isReadStatus}
                      >
                        남성
                      </Radio>
                      <Radio
                        value="F"
                        id="F"
                        name="gender"
                        onChange={handleRadioChange}
                        isReadOnly={isReadStatus}
                      >
                        여성
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    메일ID
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    id="mail_id"
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    value={empList?.mailId}
                    isReadOnly={isReadStatus}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    로그인ID
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    id="loginId"
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    value={empList?.loginId}
                    isReadOnly={isReadStatus}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    로그인 비밀번호
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    id="loginPw"
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    name="loginPw"
                    type="password"
                    value={empList?.loginPw}
                    isReadOnly={isReadStatus}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    결재 비밀번호
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    id="signPw"
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    type="password"
                    value={empList?.signPw}
                    isReadOnly={isReadStatus}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    휴대전화
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <Input
                    id="empTel"
                    placeholder="example@mail.com"
                    size="md"
                    borderRadius="14px"
                    name="empTel"
                    value={empList?.empTel}
                    isReadOnly={isReadStatus}
                    onChange={handleChange}
                  />
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    계정사용
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                  <RadioGroup defaultValue="1">
                    <HStack spacing="24px">
                      <Radio
                        value="1"
                        name="useYn"
                        onChange={handleRadioChange}
                        isReadOnly={isReadStatus}
                      >
                        사용
                      </Radio>
                      <Radio
                        value="0"
                        name="useYn"
                        onChange={handleRadioChange}
                        isReadOnly={isReadStatus}
                      >
                        미사용
                      </Radio>
                    </HStack>
                  </RadioGroup>
                </GridItem>
              </Grid>
            </TabPanel>
            <TabPanel>
              <EmpTab2/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};

export default EmpInfo;
