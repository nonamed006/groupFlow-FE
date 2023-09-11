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
  useColorModeValue,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";

const EmpCard = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

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
            사용자
          </Text>
          <Button variant="action">추가</Button>
        </Flex>
        <Table variant="simple" color="gray.500">
          <Thead>
            <Tr>
              <Th>이름</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Flex align="center">
                <Avatar src="" w="30px" h="30px" me="8px" />
                <Text color={textColor} fontSize="sm" fontWeight="600">
                  이름
                </Text>
              </Flex>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </div>
  );
};

export default EmpCard;
