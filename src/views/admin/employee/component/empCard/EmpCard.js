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
} from "@chakra-ui/react";
import { minTimeDate } from "common/common";
import { UseMouseOver } from "hook/UseMouseOver";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsRead } from "redux/emp";

const EmpCard = (props) => {

	const textColor = useColorModeValue("secondaryGray.900", "white");
  const textNumColor = useColorModeValue("brand.500", "white");

	//리덕스
  const dispatch = useDispatch();

  //테이블 헤더
  const headerGroups = ["이름", "ID", "최초입사일"];
	const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();
const [selectedIndex, setSelectedIndex] = useState(undefined);

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
            {props.empNum}
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
          <Button
            variant="action"
            onClick={() => {
              dispatch(setIsRead(false));
							props.resetInput();
            }}
          >
            추가
          </Button>
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
          <Tbody>
            {props.empList?.map((column, index) => (
              <Tr
                backgroundColor={selectedIndex===index ? "navy.50" : mouseOverIndex === index ? 'navy.50': "white"}
                onMouseOut={onMouseOut}
                onMouseOver={() => {
                  onMouseOver(index);
                }}
                onClick={() => {
                  props.resetInput();
                  props.onClickRow(column);
                  setSelectedIndex(index);
                }}
              >
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
