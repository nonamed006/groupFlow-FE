import {
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import { UseMouseOver } from "hook/UseMouseOver";
const DepGroupTableTr = ({ data, index }) => {
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
      <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.dpNm}
        </Text>
      </Td>
      <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.rankName}
        </Text>
      </Td>
      <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.pstnName}
        </Text>
      </Td>
      <Td align="center">
        <Text color={textColor} fontSize="sm" fontWeight="600">
          {data.empNm}
        </Text>
      </Td>
    </Tr>
  );
};

export default DepGroupTableTr;
