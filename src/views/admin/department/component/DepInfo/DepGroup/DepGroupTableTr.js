import {
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import { UseMouseOver } from "hook/UseMouseOver";
const DepGroupTableTr = ({ data, index }) => {
  const dpNm = data.dpPathNm[data.dpPathNm.length-1];
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

  return (
    <Tr
      backgroundColor={mouseOverIndex === index ? "navy.50" : "white"}
      onMouseOut={onMouseOut}
      onMouseOver={() => {
        onMouseOver(index);
      }}
    >
      <Td textAlign="center">
        <Text color={textColor} fontSize="sm" fontWeight="500">
          {dpNm}
        </Text>
      </Td>
      <Td textAlign="center">
        <Text color={textColor} fontSize="sm" fontWeight="500">
          {data.rankNm}
        </Text>
      </Td>
      <Td textAlign="center">
        <Text color={textColor} fontSize="sm" fontWeight="500">
          {data.pstnNm}
        </Text>
      </Td>
      <Td textAlign="center">
        <Text color={textColor} fontSize="sm" fontWeight="500">
          {data.empDto.empNm}
        </Text>
      </Td>
    </Tr>
  );
};

export default DepGroupTableTr;
