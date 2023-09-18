import {
  Avatar,
  Box,
  Button,
  Flex,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useState } from "react";
import { useEffect } from "react";
import { PORT } from "set";
import { minTimeDate } from "common";
import { UseMouseOver } from "hook/UseMouseOver";
import { useDispatch } from "react-redux";
import { setIsRead } from "redux/emp";
import { setEmpList } from "redux/emp";
import { setEmpDept } from "redux/emp";

const EmpCard = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textNumColor = useColorModeValue("brand.500", "white");

  //리덕스
  const dispatch = useDispatch();

  //테이블 헤더
  const headerGroups = ["이름", "ID", "최초입사일"];
  

  //state
  const [emp, setEmp] = useState([]);
  const [empNum, setEmpNum] = useState();
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

  //사원 목록 조회
  const getEmpList = (searchCorp, searchWorkType, searchNm) => {
    fetch(`${PORT}/emp/getEmp?searchCorp=${searchCorp}&searchWorkType=${searchWorkType}&searchNm=${searchNm}`, {
      method: "GET",
      // res에 결과가 들어옴
    })
      .then((res) => res.json())
      .then((res) => {
        setEmp(res.data);
        setEmpNum(res.strData);
      });
  };

   // 사원의 조직 정보
   const getDeptInfo = (empCd) =>{
		fetch(`${PORT}/emp/selectEmpDeptList/${empCd}`, {
			method : "GET"
		}).then(res=>res.json())
			.then(res=>{
        dispatch(setEmpDept(res.data));
			});
  }

  // 사원 목록 클릭시
  const onEmpRow = (empList) => {
    getDeptInfo(empList.empCd);
    dispatch(setEmpList({}));
    dispatch(setEmpList(empList));
    dispatch(setIsRead(true));
  }

  useEffect(() => {
    getEmpList("", "", "");
  }, []);



  return (
    <div>
      <Box borderRadius="lg" bg="white" h="700px" p="6">
        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          w="100%"
          px="22px"
          pb="20px"
          mb="10px"
          boxShadow="0px 40px 58px -20px rgba(112, 144, 176, 0.26)"
        >
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            사용자
          </Text>
          <Text
            color={textNumColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            {empNum}
          </Text>
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            명
          </Text>
          <Spacer />
          <Button variant="action" onClick={()=>{dispatch(setIsRead(false))}}>추가</Button>
        </Flex>
        <Table variant="simple" color="gray.500">
          <Thead>
            <Tr>
              {headerGroups.map((column, index) => (
                <Th pe="10px" key={index} borderColor="transparent">
                  <Flex
                    justify="space-between"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                  >
                    {column}
                  </Flex>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody >
            {emp?.map((column, index) => (
              <Tr
                backgroundColor={mouseOverIndex === index ? 'navy.50' : 'white'}
                onMouseOut={onMouseOut}
                onMouseOver={() => {
                  onMouseOver(index)
                }}
                onClick={() => {
                  onEmpRow(column);
                }} >
                <Td
                  fontSize={{ sm: "14px" }}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor="transparent"
                >
                  <Flex align="center">
                    <Avatar src="" w="30px" h="30px" me="8px" />
                    <Text color={textColor} fontSize="sm" fontWeight="600">
                      {column.empNm}
                    </Text>
                  </Flex>
                </Td>
                <Td
                  fontSize={{ sm: "14px" }}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor="transparent"
                >
                  <Flex align="center">
                    <Text color={textColor} fontSize="sm" fontWeight="600">
                      {column.empId}
                    </Text>
                  </Flex>
                </Td>
                <Td
                  fontSize={{ sm: "14px" }}
                  minW={{ sm: "150px", md: "200px", lg: "auto" }}
                  borderColor="transparent"
                >
                  <Flex align="center">
                    <Text color={textColor} fontSize="sm" fontWeight="600">
                      {minTimeDate(column.joinDt)}
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default EmpCard;
