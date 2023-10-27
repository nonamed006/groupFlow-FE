import {
  Button,
  Grid,
  GridItem,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Text,
} from "@chakra-ui/react";
import { getDepOrganizationApi } from "api/dep/DepApi";
import { getCorpNmListApi } from "api/dep/DepApi";
import AddrBox from "common/addressAPI/AddrBox";
import { minTimeDate } from "common/common";
import FormInput from "common/component/FormInput";
import FormRadio from "common/component/FormRadio";
import SelectCommon from "common/component/SelectCommon";
import React, { useEffect, useState } from "react";

const EmpDeptInput = ({ column, handleChange, editState }) => {

  const [corpNm, setCorpNm] = useState([]);
  const [corpCd, setCorpCd] = useState([]);

  //회사 조회
  const getCorpNmList = async () => {
    const response = await getCorpNmListApi();
    setCorpNm(response.data);
  };

  useEffect(() => {
    getCorpNmList();
  }, []);

  //조직도 조회
  const onClickSearchText = async () => {
    const response = await getDepOrganizationApi(corpCd, "");
    //setOrg(response.data);
    console.log(response.data);
  };

  return (
    <Grid
      templateColumns="repeat(13, 1fr)"
      templateRows="repeat(12, 1fr)"
      gap={2}
    >
      <GridItem colStart={0} colEnd={2}>
        <Text fontSize="sm" fontWeight="600">
          회사/부서
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={6}>
      <Select
              placeholder="전체"
              onChange={(e)=> {handleChange(e); setCorpCd(e.target.value);}}
            >
              {corpNm.map((item, index) => (
                <option key={index} name="coCd" value={item.coCd}>
                  {item.coNm}
                </option>
              ))}
            </Select>
      </GridItem>
      <GridItem colStart={6} colEnd={13}>
        <Input
          placeholder="이름"
          size="md"
          borderRadius="14px"
          isReadOnly={editState === "read"}
        />
      </GridItem>
      <GridItem colStart={13} colEnd={14}>
          <Button bg={'#E2E8F0'}
          borderRadius={'10px'}
          fontWeight={600}
          id="postNumBtn"
          onClick={() => {
            
          }}>asd</Button>
      </GridItem>

      <GridItem colStart={1} colEnd={7}>
        <FormInput
          title={"사번"}
          id="dpGrpNum"
          name="dpGrpNum"
          placeholder="사번"
          value={column?.dpGrpNum}
          readOnly={editState === "read"}
          onChange={handleChange}
          isRequired={true}
          pk={column?.dpGrpcd}
        />
      </GridItem>

      <GridItem colStart={1} colEnd={7}>
        <FormRadio
              title={'회사구분'}
              name={'coType'}
              defaultValue={column?.coType}
              pk={column?.dpGrpcd}
              onChange={handleChange}
              readOnly={editState === "read"}
              isRequired={true}
              values={[
                {
                  value: "DGA0001",
                  name: '주회사'
                },
                {
                  value: 'DGA0002',
                  name: '부회사'
                }]}
            />
      </GridItem>

      <GridItem colStart={8} colEnd={14}>
      <FormRadio
              title={'부서구분'}
              name={'dpType'}
              defaultValue={column?.dpType}
              pk={column?.dpGrpcd}
              onChange={handleChange}
              readOnly={editState === "read"}
              isRequired={true}
              values={[
                {
                  value: "DGB0001",
                  name: '주부서'
                },
                {
                  value: "DGB0002",
                  name: '부부서'
                }]}
            />
      </GridItem>

      <GridItem>
        <Text fontSize="md" fontWeight="600">
          직급
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <SelectCommon handleChange={handleChange} name="rankCd" values={column?.rankCd} ccNum="EM" ccType="A" defaultMsg="선택없음" isReadOnly={editState === "read"}/>
      </GridItem>

      <GridItem colStart={8} colEnd={10}>
        <Text fontSize="md" fontWeight="600">
          직책
        </Text>
      </GridItem>
      <GridItem colStart={10} colEnd={14}>
        <SelectCommon handleChange={handleChange} name="pstnCd" ccNum="EM" ccType="B" defaultMsg="선택없음" values={column?.pstnCd} isReadOnly={editState === "read"}/>
      </GridItem>

      <GridItem colSpan={2}>
        <Text fontSize="md" fontWeight="600">
          재직구분
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <SelectCommon handleChange={handleChange} name="workTypeCd" ccNum="EM" ccType="C" defaultMsg="선택없음" values={column?.workTypeCd} isReadOnly={editState === "read"}/>
      </GridItem>

      <GridItem colStart={8} colEnd={10}>
        <Text fontSize="md" fontWeight="600">
          고용구분
        </Text>
      </GridItem>
      <GridItem colStart={10} colEnd={14}>
        <SelectCommon handleChange={handleChange} name="empTypeCd" ccNum="EM" ccType="D" defaultMsg="선택없음" values={column?.empTypeCd} isReadOnly={editState === "read"}/>
      </GridItem>

      <GridItem colSpan={2}>
        <Text fontSize="md" fontWeight="600">
          직무
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <SelectCommon handleChange={handleChange} name="jobCd" ccNum="EM" ccType="E" defaultMsg="선택없음" values={column?.jobCd} isReadOnly={editState === "read"} />
      </GridItem>

      <GridItem colStart={8} colEnd={14}>
        <FormInput
          title={"상세업무"}
          placeholder="상세업무를 입력하세요."
          name="jobDetail"
          value={column?.payMail}
          readOnly={editState === "read"}
          onChange={handleChange}
          isRequired={false}
          pk={column?.dpGrpcd}
        />
      </GridItem>

      <GridItem colSpan={2}>
        <Text fontSize="sm" fontWeight="600">
          입사일 / 퇴사일
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={5}>
        <Input
          id="joinDt"
          name="joinDt"
          placeholder="Select Date and Time"
          size="md"
          type="date"
          style={{ color: "gray" }}
          value={minTimeDate(column?.joinDt)}
          isReadOnly={editState === "read"}
          onChange={handleChange}
        />
      </GridItem>

      <GridItem colStart={5} colEnd={7}>
        <Input
          id="reDt"
          name="reDt"
          placeholder="Select Date and Time"
          size="md"
          type="date"
          style={{ color: "gray" }}
          value={minTimeDate(column?.reDt)}
          isReadOnly={true}
        />
      </GridItem>

      <GridItem colStart={8} colEnd={14}>
        <FormInput
          title={"팩스번호"}
          id="fax"
          name="fax"
          placeholder="팩스번호를 입력하세요."
          value={column?.faxNum}
          readOnly={editState === "read"}
          onChange={handleChange}
          isRequired={false}
          pk={column?.dpGrpcd}

        />
      </GridItem>

      <GridItem colStart={1} colEnd={7}>
        <FormInput
          title={"전화번호"}
          name="telNum"
          id="telNum"
          placeholder="전화번호를 입력하세요."
          value={column?.empNm}
          readOnly={editState === "read"}
          onChange={handleChange}
          isRequired={false}
          pk={column?.dpGrpcd}
        />
      </GridItem>

      <AddrBox
          title={'회사주소'}
          data={column}
          //setData={setCorp}
          //dataPk={coCd}
          editState={editState != "read" && 'update'}
          isRequired={true}
        />
    </Grid>
  );
};

export default EmpDeptInput;
