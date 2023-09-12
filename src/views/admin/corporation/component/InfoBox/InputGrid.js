import { Box, Button, Select, Grid, Input, GridItem, Text, RadioGroup, HStack, Radio} from '@chakra-ui/react';
import MiniCalendar from "components/calendar/MiniCalendar"
  const InputGrid = () => {

    return (
    
         <Grid
                templateColumns="repeat(13, 1fr)"
                templateRows="repeat(12, 1fr)"
                gap={2}
              >
                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    회사코드
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7} >
                    <Input id="coCd" name="coCd"  size="md" boarder="1" borderRadius="14px" readOnly/>
                </GridItem>

                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                    사용여부
                  </Text>
                </GridItem>
                <GridItem colSpan={4}>
                  <RadioGroup defaultValue="1">
                    <HStack spacing="24px">
                      <Radio name="useYn" value="1">사용</Radio>
                      <Radio name="useYn" value="0">미사용</Radio>
                    </HStack>
                  </RadioGroup>
                </GridItem>

                <GridItem colSpan={2} colStart={0}>
                  <Text fontSize="sm" fontWeight="600">
                  회사명
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                    <Input id="coNm" name="coNm"  size="md" borderRadius="14px" placeholder="회사명을 입력하세요."/>
                </GridItem>
                
                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                  회사약칭
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14}>
                    <Input id="coAbb" name="coAbb"  size="md" borderRadius="14px" placeholder="회사약칭을 입력하세요."/>
                
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    <label htmlFor="stnd">행정표준코드</label>
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={14}>
                <Input id="stnd" name="stnd"  size="md" borderRadius="14px" placeholder="행정표준코드를 입력하세요."/>
                </GridItem>

                <GridItem colSpan={2} >
                  <Text fontSize="sm" fontWeight="600">
                    업태
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                    <Input id="bsType" name="bsType"  size="md" borderRadius="14px" placeholder="업태을 입력하세요."/>
                </GridItem>

                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                  업종
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14}>
                    <Input id="bsStock" name="bsStock"  size="md" borderRadius="14px" placeholder="업종을 입력하세요."/>
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                  사업자번호
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                    <Input id="bsnsNum" name="bsnsNum"  size="md" borderRadius="14px" placeholder="사업자번호를 입력하세요."/>
               
                </GridItem>

                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                    법인번호
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={12}>
                    <Select borderRadius="14px" id="bsCd" >
						<option name="bsCd" value='option1' >개인</option>
			            <option name="bsCd" value='option1'>법인</option>
					</Select>
                </GridItem>
                <GridItem colStart={12} colEnd={14}>
                    <Input id="coNum" name="coNum"  size="md" borderRadius="14px" placeholder="법인번호를 입력하세요."/>
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    설립일
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                    <Input id="estDt" name="estDt"  size="md" borderRadius="14px" placeholder="회사약칭을 입력하세요."/>
                </GridItem>

                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                    개/폐업일
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={12}>
                    <Input id="opDt" name="opDt"  size="md" borderRadius="14px" placeholder="회사약칭을 입력하세요."/>
                </GridItem>
                <GridItem colStart={12} colEnd={14}>
                    <Input id="clsDt" name="clsDt"  size="md" borderRadius="14px" placeholder="회사약칭을 입력하세요."/>
                </GridItem>
                
                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    대표자명
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                    <Input id="ceoNm" name="ceoNm"  size="md" borderRadius="14px" placeholder="대표자명을 입력하세요."/>
                </GridItem>
                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                    대표팩스
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14}>
                    <Input id="fax" name="fax"  size="md" borderRadius="14px" placeholder="대표팩스를 입력하세요."/>
                </GridItem>

                <GridItem colSpan={2} rowSpan={3}>
                  <Text fontSize="sm" fontWeight="600">
                    회사주소
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                    <Input id="postNum" name="postNum"  size="md" borderRadius="14px" placeholder="우편번호" readOnly/>
               </GridItem>
                <GridItem colStart={7} colEnd={14}>
                    <Button id="postNumBtn">우편번호</Button>
                </GridItem>
                <GridItem colStart={3} colEnd={14}>
                    <Input id="addr" name="addr"  size="md" borderRadius="14px" placeholder="주소를 선택하세요" readOnly/>
                </GridItem>
                <GridItem colStart={3} colEnd={14}>
                    <Input id="addrDetail" name="addrDetail"  size="md" borderRadius="14px" placeholder="상세주소를 입력하세요."/>
                </GridItem>

                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                    홈페이지 주소
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                <Input id="pageUrl" name="pageUrl"  size="md" borderRadius="14px" placeholder="홈페이지 주소를 입력하세요."/>
                </GridItem>
                <GridItem colStart={8} colEnd={10}>
                  <Text fontSize="sm" fontWeight="600">
                  기본도메인
                  </Text>
                </GridItem>
                <GridItem colStart={10} colEnd={14}>
                <Input id="coDomain" name="coDomain"  size="md" borderRadius="14px" placeholder="기본도메인을 입력하세요."/>
               </GridItem>
                <GridItem colSpan={2}>
                  <Text fontSize="sm" fontWeight="600">
                  정렬
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                    <Input id="sort" name="sort"  size="md" borderRadius="14px" placeholder="정렬값을 입력하세요."/>
                </GridItem>
                
              </Grid>
        

    );
  };
  
  export default InputGrid;
  