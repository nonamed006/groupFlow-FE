import {
  Box,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { minTimeDate } from "common";
import React, { useState } from "react";
import { MdAttachFile} from "react-icons/md";
import { useSelector } from "react-redux";

const EmpTab1 = () => {
  const empList = useSelector((state) => state.solution.dataList);
  const isReadStatus = useSelector((state) => state.solution.isRead);

  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [empInfo, setEmpInfo] = useState([]);

  // 등록을 위한 사원 정보 리스트
  let empAddList = [];

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

  // 저장 버튼
  const insertEmp = () => {
    const fd = new FormData();
    Object.values(imgFile).forEach((file) => fd.append("file", file));
    
    fd.append("empNm", );

  }

  return (
    <div>
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
                border='1px solid lightgray'
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
            id="empMail"
            placeholder="example@mail.com"
            size="md"
            borderRadius="14px"
            value={empList?.empMail}
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
            value={empList?.empNm}
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
              <Radio value="M" name="gender" isReadOnly={isReadStatus}>
                남성
              </Radio>
              <Radio value="F" name="gender" isReadOnly={isReadStatus}>
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
              <Radio value="1" name="useYn" isReadOnly={isReadStatus}>
                사용
              </Radio>
              <Radio value="0" name="useYn" isReadOnly={isReadStatus}>
                미사용
              </Radio>
            </HStack>
          </RadioGroup>
        </GridItem>
      </Grid>
    </div>
  );
};

export default EmpTab1;
