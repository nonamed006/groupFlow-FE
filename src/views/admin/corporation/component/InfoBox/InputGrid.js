import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect } from "react";

import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { formatDate } from "common/common";
import AddrBox from "common/addressAPI/AddrBox";
import FormInput from "common/component/FormInput";

const InputGrid = ({ corp, setCorp, isEditing }) => {
  const {
    coCd,
    coNm,
    ceoNm,
    bsType,
    bsStock,
    bsCd,
    coNum,
    fax,
    coDomain,
    pageUrl,
    bsnsNum,
    estDt,
    opDt,
    clsDt,
    coAbb,
    stnd,
    sort,
  } = corp; // 비구조화 할당을 통해 값 추출
  const useYn = new Boolean(corp.useYn === undefined ? true : corp.useYn); // 사용자 여부 toString 형변환을 위해 따로 선언

  const onChange = (e) => {
    let { value, name } = e.target;
    if (e.target.name === "useYn") {
       value = JSON.parse(e.target.value.toLowerCase());
    }
    setCorp({
      ...corp,
      [name]: value, // name 키를 가진 값을 value 로
    })
  };

  return (
    <Box display={'flex'} justifyContent={"center"}>
      <Grid
        templateColumns="repeat(8, 1fr)"
        templateRows="repeat(8, 1fr)"
        gap={1}
        w={"100%"}
        pl={10}
      >
        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormInput
            title={"회사코드"}
            name={"coCd"}
            value={coCd}
            pk={coCd}
            onChange={onChange}
            readOnly={true}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormInput
            type={'radio'}
            title={"사용여부"}
            name={"useYn"}
            defaultValue={useYn.toString()}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={true}
            values={[
              {
                value: "true",
                name: "사용",
              },
              {
                value: "false",
                name: "미사용",
              },
            ]}
          />
        </GridItem>

        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormInput
            title={"회사명"}
            name={"coNm"}
            value={coNm}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={true}
          />
        </GridItem>

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormInput
            title={"회사약칭"}
            name={"coAbb"}
            value={coAbb}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormInput
            title={"업태"}
            name={"bsType"}
            value={bsType}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormInput
            title={"업종"}
            name={"bsStock"}
            value={bsStock}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormInput
            title={"행정표준코드"}
            name={"stnd"}
            value={stnd}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormInput
            title={"설립일"}
            name={"estDt"}
            value={estDt !== null && formatDate(estDt)}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={true}
            inputType={"date"}
          />
        </GridItem>

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormInput
            title={"개업일"}
            name={"opDt"}
            value={opDt !== null && formatDate(opDt)}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={true}
            inputType={"date"}
          />
        </GridItem>

        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormInput
            title={"폐업일"}
            name={"clsDt"}
            value={clsDt !== null && formatDate(clsDt)}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={false}
            inputType={"date"}
          />
        </GridItem>

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormInput
            title={"사업자번호"}
            name={"bsnsNum"}
            value={bsnsNum}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={1} colEnd={4}>
        <FormInput
            type={'select'}
            title={"회사구분"}
            name={"bsCd"}
            defaultValue={bsCd === "COA0001" || bsCd === "COA0002" ? bsCd : ''}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            placeholder={"회사구분"}
            isRequired={true}
            values={[
              {
                value: "COA0001",
                name: "개인",
              },
              {
                value: "COA0002",
                name: "법인",
              },
            ]}
          />
        </GridItem>

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormInput
            title={"법인번호"}
            name={"coNum"}
            value={coNum}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormInput
            title={"대표자명"}
            name={"ceoNm"}
            value={ceoNm}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={true}
          />
        </GridItem>

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormInput
            title={"대표팩스"}
            name={"fax"}
            value={fax}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={false}
          />
        </GridItem>
        <AddrBox
          title={"회사주소"}
          data={corp}
          setData={setCorp}
          dataPk={coCd}
          editState={isEditing && "update"}
          isRequired={true}
        />

        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormInput
            title={"홈페이지"}
            name={"pageUrl"}
            value={pageUrl}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormInput
            title={"기본도메인"}
            name={"coDomain"}
            value={coDomain}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormInput
            title={"정렬"}
            name={"sort"}
            value={sort}
            pk={coCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={true}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default InputGrid;
