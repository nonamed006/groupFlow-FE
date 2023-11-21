import {
  Box,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import { UseMouseOver } from "hook/UseMouseOver";

const ListCardTableTr = ({ data, index, setCoCd, coCd }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const unusedTextColor = "secondaryGray.700";
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

  return (
    <Tr
      backgroundColor={(mouseOverIndex === index) ?  "gray.200" : (coCd === data.coCd) ? 'navy.50' :'white' }
      onMouseOut={onMouseOut}
      onMouseOver={() => {
        onMouseOver(index);
      }}
      onClick={() => {
        setCoCd(data.coCd);
      }}
      cursor={'pointer'}
      >
      <Td textAlign="center" fontWeight={500} fontSize={'sm'} >
        <Text fontSize={'sm'} color={data.useYn?textColor:unusedTextColor} textOverflow={'ellipsis'} whiteSpace={"nowrap"} w={'80px'} overflow={'hidden'} >
          {data.coNm}
        </Text>
      </Td>
      <Td textAlign="center" fontWeight={500} fontSize={'sm'} >
        <Text fontSize={'sm'} color={data.useYn?textColor:unusedTextColor} textOverflow={'ellipsis'} whiteSpace={"nowrap"} w={'80px'} overflow={'hidden'}>
          {data.ceoNm}
        </Text>
      </Td>
      <Td textAlign="center" fontWeight={500} fontSize={'sm'} >
        <Text fontSize={'sm'} color={data.useYn?textColor:unusedTextColor} textOverflow={'ellipsis'} whiteSpace={"nowrap"} w={'80px'} overflow={'hidden'}>
          {data.ccNm}
        </Text>
      </Td>

      <Td textAlign="center" fontWeight={500} fontSize={'sm'} >
        <Box color={data.useYn?textColor:unusedTextColor} fontSize="sm" fontWeight="500" textOverflow={'ellipsis'} whiteSpace={"nowrap"}  w={'80px'} overflow={'hidden'}>
          {data.useYn ? '사용' : '미사용'}
        </Box>
      </Td>

    </Tr>
  );
};

export default ListCardTableTr;
