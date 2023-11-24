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
import BottomDrawer from "common/component/BottomDrawer";
import { UseDrawerOpen } from "hook/UseDrawerOpen";
import { UseMouseOver } from "hook/UseMouseOver";
import React from "react";
import { useState } from "react";
import ListCardTableHeader from "views/system/roleGroup/component/tableList/TableHeader";

const EmpCard = (props) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textNumColor = useColorModeValue("brand.500", "white");
  const headerColor = useColorModeValue("#8F9BBA", "white");

  //테이블 헤더
  const headerGroups = ["이름", "ID", "최초입사일", "재직상태"];
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

  return (
    <>
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
            marginRight={2}
          >
            사용자 
          </Text>
          <Text
            color={textNumColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            {props.empList.length}
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
            borderRadius={'10px'} 
            fontWeight={'600'}
            onClick={() => {
              props.setEditState("insert");
              props.resetInput();
            }}
          >
            추가
          </Button>
        </Flex>
        <Table variant="simple" w={"100%"} colorScheme={"facebook"}>
          {/* Thead */}
          <ListCardTableHeader headerGroups={headerGroups} />
          <Tbody>
            {props.empList?.map((column, index) => (
              <Tr
                backgroundColor={
                  props.selectedIndex === index
                    ? "navy.50"
                    : mouseOverIndex === index
                    ? "gray.200"
                    : "white"
                }
                onMouseOut={onMouseOut}
                onMouseOver={() => {
                  onMouseOver(index);
                }}
                onClick={() => {
                  props.resetInput();
                  props.onClickRow(column);
                  props.setSelectedIndex(index);
                }}
              >
                <Td fontWeight="500" fontSize={"sm"} textAlign="center">
                  <Flex align="center">
                    <Avatar src="" w="30px" h="30px" me="8px" />
                    <Text color={textColor} fontSize="sm" fontWeight="500">
                      {column.empNm}
                    </Text>
                  </Flex>
                </Td>
                <Td fontWeight="500" fontSize={"sm"} textAlign="center">
                  <Flex align="center">
                    <Text color={textColor} fontSize="sm" fontWeight="500">
                      {column.loginId}
                    </Text>
                  </Flex>
                </Td>
                <Td fontWeight="500" fontSize={"sm"} textAlign="center">
                  <Flex align="center">
                    <Text color={textColor} fontSize="sm" fontWeight="500">
                      {minTimeDate(column.joinDt)}
                    </Text>
                  </Flex>
                </Td>
                <Td fontWeight="500" fontSize={"sm"} textAlign="center">
                  <Flex align="center">
                    <Text color={textColor} fontSize="sm" fontWeight="500" >
                      {column.workTypeCd === "EMC0001" ? "재직" : "퇴사" }
                    </Text>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default EmpCard;
