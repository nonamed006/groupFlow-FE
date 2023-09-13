import {
  Avatar,
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  IconButton,
  useColorModeValue
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import {AddIcon, ChevronDownIcon } from '@chakra-ui/icons'
import React, { useState } from "react";
import { useEffect } from "react";
import { PORT } from "set";
import RealGrid from "./RealGrid";

const EmpCard = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  //테이블 헤더
  const headerGroups = ["이름", "ID", "최초입사일"];

  //state
  const [emp, setEmp] = useState([]);

  const getEmpList = (searchCorp, searchWorkType, searchNm) => {
    fetch(`${PORT}/emp/getEmp/${searchCorp}/${searchWorkType}/${searchNm}`, {
      method: "GET",
      // res에 결과가 들어옴
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setEmp(res);
      });
  };

  useEffect(() => {
    // getEmpList("noSearch","noSearch","noSearch");
  }, []);

  // const tableInstance = useTable(
  //     {
  //       columns,
  //       data,
  //     },
  //     useGlobalFilter,
  //     useSortBy,
  //     usePagination
  //   );

  return (
    <div>
      <Box borderRadius="lg" bg="white" h="600px" p="6">
        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          justify="space-between"
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
            조직도
          </Text>
         
          <IconButton
            colorScheme="brand"
            borderRadius="10px"
            aria-label="Call Fred"
            fontSize="20px"
            icon={<AddIcon />}
          />
        </Flex>
        <RealGrid></RealGrid>
      </Box>
    </div>
  );
};

export default EmpCard;
