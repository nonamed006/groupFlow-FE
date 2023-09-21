import { Select, Grid, Input, GridItem, Text, RadioGroup, HStack, Radio} from '@chakra-ui/react';
import React from "react";

import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { formatDate } from "common/common";
import AddrBox from 'common/addressAPI/AddrBox';

const InputGrid = ({ corp, setCorp }) => {

  const { coCd, coNm, ceoNm, bsType, bsStock, bsCd, coNum,fax, coDomain, pageUrl, bsnsNum, estDt, opDt, clsDt, coAbb, stnd, sort } = corp; // 비구조화 할당을 통해 값 추출
  const useYn =  new Boolean(corp.useYn); // 사용자 여부 toString 형변환을 위해 따로 선언

  const onChange = (e) => {
    const { value, name } = e.target;
    setCorp({
      ...corp,
      [name]: value // name 키를 가진 값을 value 로
    });
    console.log(corp);
  };

  return (
    <>
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
          <Input id="coCd" name="coCd" size="md" boarder="1" borderRadius="14px" value={coCd} key={coCd} onChange={onChange} readOnly />
        </GridItem>

        <GridItem colStart={8} colEnd={10}>
          <Text fontSize="sm" fontWeight="600">
            사용여부
          </Text>
        </GridItem>
        <GridItem colSpan={4}>
          <RadioGroup  name="useYn"  defaultValue={useYn.toString()} key={coCd} >
            <HStack spacing="24px">
              <Radio name="useYn" value="true" onChange={onChange} >사용</Radio>
              <Radio name="useYn" value="false" onChange={onChange} >미사용</Radio>
            </HStack>
          </RadioGroup>
        </GridItem>

        <GridItem colSpan={2} colStart={0}>
          <Text fontSize="sm" fontWeight="600">
            회사명
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input id="coNm" name="coNm" size="md" borderRadius="14px" defaultValue={coNm} key={coCd} onChange={onChange} />
        </GridItem>

        <GridItem colStart={8} colEnd={10}>
          <Text fontSize="sm" fontWeight="600">
            회사약칭
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <Input id="coAbb" name="coAbb" size="md" borderRadius="14px" defaultValue={coAbb} key={coCd} onChange={onChange}  />
        </GridItem>

        <GridItem colSpan={3}>
          <Text fontSize="sm" fontWeight="600">
            행정표준코드
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={14}>
          <Input id="stnd" name="stnd" size="md" borderRadius="14px" defaultValue={stnd} key={coCd} onChange={onChange} />
        </GridItem>

        <GridItem colSpan={2} >
          <Text fontSize="sm" fontWeight="600">
            업태
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input id="bsType" name="bsType" size="md" borderRadius="14px" defaultValue={bsType} key={coCd}  onChange={onChange}  />
        </GridItem>

        <GridItem colStart={8} colEnd={10}>
          <Text fontSize="sm" fontWeight="600">
            업종
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <Input id="bsStock" name="bsStock" size="md" borderRadius="14px" defaultValue={bsStock} key={coCd} onChange={onChange}  />
        </GridItem>

        <GridItem colSpan={2}>
          <Text fontSize="sm" fontWeight="600">
            사업자번호
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input id="bsnsNum" name="bsnsNum" size="md" borderRadius="14px" defaultValue={bsnsNum} key={coCd} onChange={onChange} />
        </GridItem>

        <GridItem colStart={8} colEnd={10}>
          <Text fontSize="sm" fontWeight="600">
            법인번호
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={12}>
          <Select 
            borderRadius="14px" 
            name="bsCd" 
            onChange={onChange} 
            placeholder='회사구분'
            style={{ color: "gray" }} 
            defaultValue={bsCd}
            key={coCd}
           >
            <option 
              name="bsCd" 
              value='COA0001' 
            >개인</option>
            <option 
              name="bsCd" 
              value='COA0002' 
            >법인</option>
          </Select>
        </GridItem>
        <GridItem colStart={12} colEnd={14}>
          <Input id="coNum" name="coNum" size="md" borderRadius="14px" defaultValue={coNum} key={coCd} onChange={onChange} placeholder="법인번호" />
        </GridItem>
       
        <GridItem colSpan={2}>
          <Text fontSize="sm" fontWeight="600">
            설립일
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="date"
            name='estDt'
            defaultValue={estDt!==null&&formatDate(estDt)}
            style={{ color: "gray" }}
            onChange={onChange}
            key={coCd}
          />
        </GridItem>
        <GridItem colSpan={2} colStart={0} colEnd={2}>
          <Text fontSize="sm" fontWeight="600">
            개업일
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="date"
            name='opDt'
            defaultValue={opDt!==null&&formatDate(opDt)}
            style={{ color: "gray" }}
            onChange={onChange}
            key={coCd}
          />
        </GridItem>
        <GridItem colStart={8} colEnd={10}>
          <Text fontSize="sm" fontWeight="600">
            폐업일
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="date"
            name='clsDt'
            defaultValue={clsDt!==null&&formatDate(clsDt)}
            style={{ color: "gray" }}
            onChange={onChange}
            key={coCd}
          />
        </GridItem>
        <GridItem colSpan={2}>
          <Text fontSize="sm" fontWeight="600">
            대표자명
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input id="ceoNm" name="ceoNm" size="md" borderRadius="14px" defaultValue={ceoNm} key={coCd} onChange={onChange}/>
        </GridItem>
        <GridItem colStart={8} colEnd={10}>
          <Text fontSize="sm" fontWeight="600">
            대표팩스
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <Input id="fax" name="fax" size="md" borderRadius="14px" defaultValue={fax} key={coCd} onChange={onChange}  />
        </GridItem>

        <AddrBox title={'회사주소'} data={corp} setData={setCorp} dataPk={coCd}/>

        <GridItem colSpan={2}>
          <Text fontSize="sm" fontWeight="600">
            홈페이지
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input id="pageUrl" name="pageUrl" size="md" borderRadius="14px" defaultValue={pageUrl} key={coCd} onChange={onChange} />
        </GridItem>
        <GridItem colStart={8} colEnd={10}>
          <Text fontSize="sm" fontWeight="600">
            기본도메인
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <Input id="coDomain" name="coDomain" size="md" borderRadius="14px" defaultValue={coDomain} key={coCd} onChange={onChange}  />
        </GridItem>
        <GridItem colSpan={2}>
          <Text fontSize="sm" fontWeight="600">
            정렬
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input id="sort" name="sort" size="md" borderRadius="14px" defaultValue={sort} key={coCd} onChange={onChange}  />
        </GridItem>

      </Grid>
    </>
  );
};

export default InputGrid;
