/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/douzoneImg.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { PORT } from "set";
import { useDispatch } from "react-redux";
import { setEmpData } from "redux/solution";
import { setCookie } from "common/common";
import CommonAlert from "common/component/CommonAlert";
import api from "api/Fetch";

function SignIn(props) {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);
  const [empInfo, setEmpInfo] = useState({ loginId: "", loginPw: "" });
  const handleClick = () => setShow(!show);
  const [alertInfo, setAlertInfo] = useState({
    isOpen: false,
  });

  const handleChange = (e) => {
    setEmpInfo({ ...empInfo, [e.target.id]: e.target.value });
  }

  const empLogin = () => {
    let status = "fail";
    fetch(`${PORT}/common/loginEmp`, {
      method: "POST",
      body: JSON.stringify(empInfo),
      headers: {
        'Content-Type': "application/json; charset=utf-8"
      },
      credentials: 'include'
    }).then((res) => res.json())
    .then((res) => {
        if(res.status === 200){
          setCookie("Emp_Dp_Type", res.voData.dpGrpCd, 2);
          status="success";
      }else{
        setAlertInfo({
          isOpen: true,
          status: 'warning',
          title: res.resultMsg,
          width: 'fit-content',
        })
      }
    }).then(()=>{
      if(status === "success"){
        window.location.replace("/MU000000/home");
      }
    });
  }

  useEffect(() => {
    const status = new URLSearchParams(props.location.search).get('status');
    switch(status) {
      case '401' : 
        setAlertInfo({
          isOpen: true,
          status: 'warning',
          title: '로그인이 필요한 서비스입니다.',
          width: 'fit-content',
        })
    }
  }, [])

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            로그인
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            {/* Enter your email and password to sign in! */}
            등록된 로그인 ID와 비밀번호를 입력해주세요.
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>

          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Id<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              id="loginId"
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='text'
              placeholder='아이디를 입력하세요.'
              mb='24px'
              fontWeight='500'
              size='lg'
              onChange={handleChange}
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                id="loginPw"
                isRequired={true}
                fontSize='sm'
                placeholder='비밀번호를 입력하세요.'
                mb='10px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
                onChange={handleChange}
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {/* <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  아이디 저장
                </FormLabel>
              </FormControl>
              <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  비밀번호 찾기
                </Text>
              </NavLink>
            </Flex> */}
            <Text
              mb='35px'
              ms='4px'
              color={textColorSecondary}
              fontWeight='400'
              fontSize='sm'
            >
            * ID 변경 및 비밀번호 변경은 관리자에게 문의해주세요.
            </Text>
            <Button
              onClick={empLogin}
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'>
              로그인
            </Button>
          </FormControl>
        </Flex>
      </Flex>
      {alertInfo.isOpen &&
				<CommonAlert
					alertInfo={alertInfo}
					setAlertInfo={setAlertInfo}
				/>
			}
    </DefaultAuth>
  );
}

export default SignIn;
