import React from "react";
import {
  Tbody,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
const ChangeDeleteTableTbody = ({ detail }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Tbody>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            회사명
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.coNm}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            회사약칭
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.coAbb}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            사업자번호
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.bsnsNum}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            대표자명
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.ceoNm}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            업태
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.bsType}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            업종
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.bsStock}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            회사구분
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.bsCd === "COA0001" ? "개인" : "법인"}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            법인번호
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.coNum}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            설립일
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.estDt}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            개업일
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.opDt}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            폐업일
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.clsDt}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            도메인
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.coDomain}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            홈페이지주소
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.pageUrl}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            정렬
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.sort}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            팩스
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.fax}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            행정표준코드
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.stnd}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            사용유무
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.useYn === "1" ? "사용" : "미사용"}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            우편번호
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.postNum}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            회사주소
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.addr}
          </Text>
        </Td>
      </Tr>
      <Tr>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            상세주소
          </Text>
        </Td>
        <Td textAlign="center">
          <Text color={textColor} fontSize="sm" fontWeight="600">
            {detail.addrDetail}
          </Text>
        </Td>
      </Tr>
    </Tbody>
  );
};

export default ChangeDeleteTableTbody;
