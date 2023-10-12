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
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

  return (
    <Tr
      backgroundColor={(mouseOverIndex === index) || (coCd === data.coCd) ? 'navy.50' : 'white'}
      onMouseOut={onMouseOut}
      onMouseOver={() => {
        onMouseOver(index);
      }}
      onClick={() => {
        setCoCd(data.coCd);
      }}
      borderColor={coCd === data.coCd && 'brand.500'}
      shadow={coCd === data.coCd ? 'outline' : 'md'}
      cursor={'pointer'}>

      {/* <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.coCd}
        </Text>
      </Td> */}
      <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.coNm}
        </Text>
      </Td>
      <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.ceoNm}
        </Text>
      </Td>
      <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.ccNm}
        </Text>
      </Td>

      <Td align="center">
        <Box color={textColor} fontSize="sm" fontWeight="600">
          {data.useYn ? '사용' : '미사용'}
        </Box>
      </Td>

    </Tr>
  );
};

export default ListCardTableTr;
