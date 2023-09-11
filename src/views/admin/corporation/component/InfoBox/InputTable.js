import {
    Table,
    Input,
    Tr,Td,
    useColorModeValue,
    Tbody,
    Select,
    Button
  } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
  import React, { useState } from "react";

  const InputTable = () => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    
    return (
          <Table  color="gray.500">
            {/* Tbody */}
            <Tbody>
            <Tr>
                <Td colSpan={2}>
                    <label htmlFor="coCd">회사코드</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="coCd" name="coCd"  size="md" boarder="1" borderRadius="14px" readOnly/>
                </Td>
                <Td colSpan={2}>
                    <label htmlFor="useY">사용여부</label>
                </Td>
                <Td colSpan={1}>
                    <input id="useY" name="useYn" value="1" type="radio"  /> <label htmlFor="useY">사용</label>
                </Td>
                <Td colSpan={1}>
                    <input id="uesN" name="useYn" value="0"  type="radio" /> <label htmlFor="uesN">미사용</label>
                </Td>
            </Tr>
            <Tr>
                <Td colSpan={2}>
                    <label htmlFor="coNm">회사명</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="coNm" name="coNm"  size="md" borderRadius="14px" placeholder="회사명을 입력하세요."/>
                </Td>
                <Td colSpan={2}>
                    <label htmlFor="coAbb">회사약칭</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="coAbb" name="coAbb"  size="md" borderRadius="14px" placeholder="회사약칭을 입력하세요."/>
                </Td>
            </Tr>
            <Tr>
                <Td colSpan={2}>
                    <label htmlFor="stnd">행정표준코드</label>
                </Td>
                <Td colSpan={8}>
                    <Input id="stnd" name="stnd"  size="md" borderRadius="14px" placeholder="행정표준코드를 입력하세요."/>
                </Td>
            </Tr>
            <Tr>
                <Td colSpan={2}>
                    <label htmlFor="bsType">업태</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="bsType" name="bsType"  size="md" borderRadius="14px" placeholder="업태을 입력하세요."/>
                </Td>
                <Td colSpan={2}>
                    <label htmlFor="bsStock">업종</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="bsStock" name="bsStock"  size="md" borderRadius="14px" placeholder="업종을 입력하세요."/>
                </Td>
            </Tr>
            <Tr>
                <Td colSpan={2}>
                    <label htmlFor="bsnsNum">사업자번호</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="bsnsNum" name="bsnsNum"  size="md" borderRadius="14px" placeholder="사업자번호를 입력하세요."/>
                </Td>
                <Td colSpan={2}>
                    <label htmlFor="bsCd">법인번호</label>
                </Td>
                <Td colSpan={1}>
             
                    <Select borderRadius="14px" id="bsCd" >
						          <option name="bsCd" value='option1' >개인</option>
						          <option name="bsCd" value='option1'>법인</option>
					          </Select>
                    </Td>
                    <Td colSpan={2}>
                     <Input id="coNum" name="coNum"  size="md" borderRadius="14px" placeholder="법인번호를 입력하세요."/>
              
                </Td>
            </Tr>
            <Tr>
                <Td colSpan={2}>
                    <label htmlFor="estDt">설립일</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="estDt" name="estDt"  size="md" borderRadius="14px" placeholder="회사약칭을 입력하세요."/>
                </Td>
                <Td colSpan={2}>
                    <label htmlFor="opDt">개/폐업일</label>
                </Td>
                <Td colSpan={1.5}>
                    <Input id="opDt" name="opDt"  size="md" borderRadius="14px" placeholder="회사약칭을 입력하세요."/>
                </Td>
                <Td colSpan={1.5}>
                    <Input id="clsDt" name="clsDt"  size="md" borderRadius="14px" placeholder="회사약칭을 입력하세요."/>
                </Td>
            </Tr>
            <Tr>
                <Td colSpan={2}>
                    <label htmlFor="ceoNm">대표자명</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="ceoNm" name="ceoNm"  size="md" borderRadius="14px" placeholder="대표자명을 입력하세요."/>
                </Td>
                <Td colSpan={2}>
                    <label htmlFor="fax">대표팩스</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="fax" name="fax"  size="md" borderRadius="14px" placeholder="대표팩스를 입력하세요."/>
                </Td>
            </Tr>
            <Tr>
                <Td colSpan={2} rowSpan={3}>
                    <label htmlFor="postNumBtn">회사주소</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="postNum" name="postNum"  size="md" borderRadius="14px" placeholder="우편번호" readOnly/>
                </Td>
                <Td colSpan={3}>
                    <Button id="postNumBtn">우편번호</Button>
                </Td>
            </Tr>
            <Tr>
              <Td colSpan={10}>
                    <Input id="addr" name="addr"  size="md" borderRadius="14px" placeholder="주소를 선택하세요" readOnly/>
                </Td>
                </Tr>
                <Tr>
                <Td colSpan={10}>
                    <Input id="addrDetail" name="addrDetail"  size="md" borderRadius="14px" placeholder="상세주소를 입력하세요."/>
                </Td>
            </Tr>
            <Tr>
                <Td colSpan={2}>
                    <label htmlFor="pageUrl">홈페이지 주소</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="pageUrl" name="pageUrl"  size="md" borderRadius="14px" placeholder="홈페이지 주소를 입력하세요."/>
                </Td>
                <Td colSpan={2}>
                    <label htmlFor="coDomain">기본도메인</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="coDomain" name="coDomain"  size="md" borderRadius="14px" placeholder="기본도메인을 입력하세요."/>
                </Td>
            </Tr>
            <Tr>
                <Td colSpan={2}>
                    <label htmlFor="sort">정렬</label>
                </Td>
                <Td colSpan={3}>
                    <Input id="sort" name="sort"  size="md" borderRadius="14px" placeholder="정렬값을 입력하세요."/>
                </Td>
            </Tr>
            </Tbody>
          </Table>

    );
  };
  
  export default InputTable;
  