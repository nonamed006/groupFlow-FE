import { LockIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  color,
} from "@chakra-ui/react"; 
import AddrBox from "common/addressAPI/AddrBox";
import { minTimeDate } from "common/common";
import FormInput from "common/component/FormInput";
import React, { useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { PORT } from "set";
import EmpIcon from "assets/img/profile/solutionapslfintek2352.png";
const EmpTab1 = (props) => {
  console.log(props);
  const useYN = new Boolean(
    props.empDetail?.useYN === undefined ? true : props.empDetail?.useYN
  );

  const fileUploadBtn = () => {
    document.getElementById("fileUpBtn").click();
  };

  // file 값 받기
  const handleChangeFile = (e) => {
    props.setImgFile(e.target.files);
    props.setImgBase64([]);
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

            props.setImgBase64((imgBase64) => [...imgBase64, base64Sub]);
          }
        };
      }
    }
  };
  if (
    props.empDetail.empCd !== "" ||
    props.editState === "update" ||
    props.editState === "insert" ||
    props.editState === "deptInsert"
  ) {
    return (
      <div>
        <Grid templateColumns="repeat(8, 1fr)" gap={1} w={"100%"} pl={10}>
          <GridItem colSpan={1} rowSpan={1}>
            <Text fontSize="md" fontWeight="600">
              사진
            </Text>
          </GridItem>
          <GridItem colStart={2} colEnd={4} rowSpan={4}>
            <Box>
              <Stack direction="row">
                {props.empDetail.empCd === undefined ||
                props.empDetail.empCd === "" ? (
                  <Image
                    w="150px"
                    h="200px"
                    fallbackSrc={EmpIcon}
                    src={props.imgBase64}
                    alt="사원사진"
                    border="1px solid lightgray"
                  />
                ) : props.empDetail?.modiNm !== null ? (
                  <Image
                    w="150px"
                    h="200px"
                    fallbackSrc={`${PORT}/emp/display/${props.empDetail?.modiNm}`}
                    src={props.imgBase64}
                    alt="사원사진"
                    border="1px solid lightgray"
                  />
                ) : (
                  <Image
                    w="150px"
                    h="200px"
                    fallbackSrc={EmpIcon}
                    src={props.imgBase64}
                    alt="사원사진"
                    border="1px solid lightgray"
                  />
                )}

                <IconButton
                  variant="outline"
                  colorScheme="brand"
                  borderRadius="5px"
                  aria-label="Call Fred"
                  fontSize="20px"
                  visibility={
                    props.editState === "read" ||
                    props.editState === "deptInsert"
                      ? "hidden"
                      : "show"
                  }
                  icon={<MdAttachFile />}
                  onClick={() => fileUploadBtn()}
                />
                <Input
                  type="file"
                  name="fileUpBtn"
                  id="fileUpBtn"
                  multiple
                  display="none"
                  onChange={handleChangeFile}
                ></Input>
              </Stack>
            </Box>
          </GridItem>

          <GridItem colStart={5} colEnd={8} colSpan={4}>
            <FormInput
              title={"개인메일"}
              name="psnMail"
              id="psnMail"
              placeholder="example@mail.com"
              value={props.empDetail?.psnMail}
              readOnly={
                props.editState === "read" || props.editState === "deptInsert"
              }
              onChange={props.handleChange}
              isRequired={false}
              pk={props.empDetail?.empCd}
            />
          </GridItem>

          <GridItem colStart={5} colEnd={8} colSpan={4}>
            <FormInput
              title={"급여메일"}
              name="payMail"
              id="payMail"
              placeholder="example@mail.com"
              value={props.empDetail?.payMail}
              readOnly={
                props.editState === "read" || props.editState === "deptInsert"
              }
              onChange={props.handleChange}
              isRequired={false}
              pk={props.empDetail?.empCd}
            />
          </GridItem>

          <GridItem colStart={5} colEnd={8} colSpan={4}>
            <FormInput
              title={"최초입사일"}
              name="joinDt"
              id="joinDt"
              inputType="date"
              placeholder="Select Date and Time"
              style={{ color: "gray" }}
              value={minTimeDate(props.empDetail?.joinDt)}
              readOnly={
                props.editState === "read" || props.editState === "deptInsert"
              }
              onChange={props.handleChange}
              isRequired={true}
              pk={props.empDetail?.empCd}
            />
          </GridItem>

          <GridItem colStart={5} colEnd={8} colSpan={4}>
            <FormInput
              title={"최종퇴사일"}
              id="reDt"
              placeholder="Select Date and Time"
              inputType="date"
              style={{ color: "gray" }}
              value={minTimeDate(props.empDetail?.reDt)}
              readOnly={true}
              isRequired={false}
              onChange={props.handleChange}
              pk={props.empDetail?.empCd}
            />
          </GridItem>

          <GridItem colStart={1} colEnd={4} colSpan={4}>
            <FormInput
              title={"이름"}
              name="empNm"
              id="empNm"
              placeholder="이름"
              value={props.empDetail?.empNm}
              readOnly={
                props.editState === "read" || props.editState === "deptInsert"
              }
              onChange={props.handleChange}
              isRequired={true}
              pk={props.empDetail?.empCd}
            />
          </GridItem>

          <GridItem colStart={5} colEnd={8} colSpan={4}>
            <InputGroup>
              <InputRightElement pointerEvents="none">
                <LockIcon color="gray.300" />
              </InputRightElement>
              <FormInput
                title={"로그인 비밀번호"}
                id="loginPw"
                name="loginPw"
                inputType="password"
                readOnly={
                  props.editState === "read" ||
                  props.editState === "update" ||
                  props.editState === "deptInsert"
                }
                onChange={props.handleChange}
                value={
                  props.editState === "insert"
                    ? props.empDetail?.loginPw
                    : props.empDetail?.empPw
                }
                isRequired={props.editState === "insert"}
                pk={props.empDetail?.empCd}
              />
            </InputGroup>
          </GridItem>

          <GridItem colStart={1} colEnd={4} colSpan={4} lineHeight="40px">
            <FormInput
              type={"radio"}
              title={"성별"}
              name="gender"
              defaultValue={props.empDetail.gender ?? "M"}
              pk={props.empDetail?.empCd}
              onChange={props.handleRadioChange}
              readOnly={
                props.editState === "read" || props.editState === "deptInsert"
              }
              isRequired={true}
              values={[
                {
                  value: "M",
                  name: "남성",
                },
                {
                  value: "F",
                  name: "여성",
                },
              ]}
            />
          </GridItem>

          <GridItem colStart={5} colEnd={8} colSpan={4}>
            <InputGroup>
              <InputRightElement pointerEvents="none">
                <LockIcon color="gray.300" />
              </InputRightElement>
              <FormInput
                title={"결재 비밀번호"}
                id="signPw"
                name="signPw"
                inputType="password"
                readOnly={
                  props.editState === "read" || props.editState === "update"
                }
                onChange={props.handleChange}
                value={
                  props.editState === "insert"
                    ? props.empDetail?.signPw
                    : props.empDetail?.empPw
                }
                isRequired={props.editState === "insert"}
                pk={props.empDetail?.empCd}
              />
            </InputGroup>
          </GridItem>

          <GridItem colStart={1} colEnd={4} colSpan={4}>
            <FormInput
              title={"메일ID"}
              name="mailId"
              id="mailId"
              placeholder="메일ID"
              value={props.empDetail?.mailId}
              readOnly={
                props.editState === "read" ||
                props.editState === "update" ||
                props.editState === "deptInsert"
              }
              onChange={props.handleChange}
              isRequired={true}
              pk={props.empDetail?.empCd}
            />
          </GridItem>

          <GridItem colStart={5} colEnd={8} colSpan={4}>
            <FormInput
              type={"radio"}
              title={"계정사용"}
              name="useYn"
              defaultValue={useYN.toString()}
              pk={props.empDetail?.empCd}
              onChange={props.handleRadioChange}
              readOnly={
                props.editState === "read" || props.editState === "deptInsert"
              }
              isRequired={true}
              values={[
                {
                  value: "true",
                  name: "사용",
                },
                {
                  value: "false",
                  name: "미사용",
                },
              ]}
            />
          </GridItem>

          <GridItem colStart={1} colEnd={4} colSpan={4}>
            <FormInput
              title={"로그인ID"}
              name="loginId"
              id="loginId"
              placeholder="로그인ID"
              value={props.empDetail?.loginId}
              readOnly={
                props.editState === "read" ||
                props.editState === "update" ||
                props.editState === "deptInsert"
              }
              onChange={props.handleChange}
              isRequired={true}
              pk={props.empDetail?.empCd}
            />
          </GridItem>

          <GridItem colStart={1} colEnd={4} colSpan={4}>
            <FormInput
              title={"휴대전화"}
              id="empTel"
              name="empTel"
              placeholder="000-0000-0000"
              value={props.empDetail?.empTel}
              readOnly={
                props.editState === "read" || props.editState === "deptInsert"
              }
              onChange={props.handleChange}
              isRequired={true}
              pk={props.empDetail?.empCd}
            />
          </GridItem>

          <AddrBox
            title={"회사주소"}
            data={props.empDetail}
            setData={props.setEmpDetail}
            editState={props.editState === "insert"  && "update" || props.editState === "update"  && "update"}
            isRequired={false}
          />
        </Grid>
      </div>
    );
  } else if (props.editState === "read") {
    return (
      <Text
        pt={200}
        align={"center"}
        fontWeight={600}
        color={"lightgray"}
        fontSize={"18px"}
      >
        사원을 선택해 주세요.
      </Text>
    );
  }
};

export default EmpTab1;
