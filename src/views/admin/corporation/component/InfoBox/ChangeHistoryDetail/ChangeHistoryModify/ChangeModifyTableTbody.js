import React from "react";
import {
  Tbody,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
const ChangeModifyTableTbody = ({ detail }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Tbody>
      {detail.co1Nm !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              회사명
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.co1Nm}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.co2Nm}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.co1Abb !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              회사약칭
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.co1Abb}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.co2Abb}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.bsnsNum1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              사업자번호
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.bsnsNum1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.bsnsNum2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.ceoNm1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              대표자명
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.ceoNm1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.ceoNm2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.bsType1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              업태
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.bsType1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.bsType2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.bsStock1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              업종
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.bsStock1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.bsStock2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.bsDiv1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              사업자구분
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.bsDiv1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.bsDiv2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.coNum1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              법인번호
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.coNum1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.coNum2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.estDt1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              설립일
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.estDt1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.estDt2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.opDt1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              개업일
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.opDt1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.opDt2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.clsDt1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              폐업일
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.clsDt1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.clsDt2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.coDoamin1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              도메인
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.coDoamin1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.coDoamin2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.pageUrl1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              홈페이지주소
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.pageUrl1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.pageUrl2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.sort1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              정렬
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.sort1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.sort2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.fax1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              팩스
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.fax1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.fax2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.stnd1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              행정표준코드
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.stnd1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.stnd2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.useYN1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              사용여부
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.useYN1 === "1" ? "사용" : "미사용"}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.useYN2 === "1" ? "사용" : "미사용"}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.postNum1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              우편번호
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.postNum1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.postNum2}
            </Text>
          </Td>
        </Tr>
      )}
      {detail.addr1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              회사주소
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.addr1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.addr2}
            </Text>
          </Td>
        </Tr>
      )}

      {detail.addrDetail1 !== undefined && (
        <Tr>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              상세주소
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.addrDetail1}
            </Text>
          </Td>
          <Td align="center">
            <Text color={textColor} fontSize="sm" fontWeight="600">
              {detail.addrDetail2}
            </Text>
          </Td>
        </Tr>
      )}
    </Tbody>
  );
};

export default ChangeModifyTableTbody;
