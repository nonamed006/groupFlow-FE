import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AddrBox from "common/addressAPI/AddrBox";
import { minTimeDate } from "common/common";
import FormInput from "common/component/FormInput";
import FormRadio from "common/component/FormRadio";
import SelectCommon from "common/component/SelectCommon";
import React, { useEffect, useState } from "react";
import api from "api/Fetch";
import { PORT } from "set";
import DepUpperCd from "views/admin/department/component/DepInfo/DepUpperCd";
import Loading from "common/Loading";
import { useInView } from "react-intersection-observer";

const EmpDeptInput = ({ column, handleChange, editState, index, setIsLoading, isLoading, setAlertInfo, empDeptTmp, setDelEmpDep, delEmpDep, empDept }) => {
  const [corpNm, setCorpNm] = useState([]);
  const [org, setOrg] = useState([]);
  const [infiniteScrollRef, inView] = useInView();
  const { isOpen, onOpen, onClose } = useDisclosure();

  //회사 조회
  const getCorpNmList = async () => {
    const response = await api.dep.getCorpNmListApi();
    setCorpNm(response.data);
  };

  const getOrg = async () => {
    setIsLoading(true);
    let url = `${PORT}/roleEmp/list?empYn=N&searchCoCd=${column?.coCd}&keyword=&search=dep`;
    await fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setOrg(res.data);
      });
    setIsLoading(false);
  };

  let updatedDepDto;
  const getValue = (text) => {
    //setUpdatedDepDto(text);
    updatedDepDto = text;
  };

  const click = () => {
    let idx = 0;

    empDeptTmp.map((data, index) => {
      if (data.dpCd === updatedDepDto?._values[2]) {
        idx++;
        setAlertInfo({
          isOpen: true,
          status: 'warning',
          title: "이미 존재하는 조직은 선택할 수 없습니다.",
          width: 'fit-content'
        });
      }
    })

    if (idx == 0) {
      handleChange({
        target: {
          name: "dpCd", // 여러 값을 배열에 넣음
          value: updatedDepDto?._values[2], // 값을 배열에 넣음
        }
      }, index, {
        target: {
          name: "dpNm", // 여러 값을 배열에 넣음
          value: updatedDepDto?._values[1], // 값을 배열에 넣음
        }
      });
      onClose();
    }

  };

  // 체크된 조직정보 삭제
  const handleChangeChk = (e) => {
    if (e.target.checked) {
      const result = [...delEmpDep, { [e.target.name]: e.target.value }];

      const uniqueArray = result.filter(
        (obj, index, self) =>
          index === self.findIndex((o) => o.dpGrpCd === obj.dpGrpCd)
      );
      setDelEmpDep(uniqueArray);
    } else {
      const result = delEmpDep.filter((obj, index) => {
        return obj.dpGrpCd !== e.target.value;
      });
      setDelEmpDep(result);
    }
  };

  useEffect(() => {
    getCorpNmList();
  }, []);

  return (
    <Grid
      templateColumns="repeat(13, 1fr)"
      templateRows="repeat(10, 1fr)"
      gap={2}
    >
      <Checkbox
        me='16px'
        size="lg"
        colorScheme='brandScheme'
        name="dpGrpCd"
        value={column.dpGrpCd}
        onChange={(e) => {
          handleChangeChk(e);
        }}
        style={{visibility: editState === "deptDelete" ? "visible" : "hidden"}}
      />
      <GridItem colStart={0} colEnd={2}>
        <Text fontSize="sm" fontWeight="600">
          회사/부서
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={6}>
        <Select
          isDisabled={editState === "read"}
          value={column?.coCd}
          placeholder="전체"
          name="coCd"
          onChange={(e) => {
            handleChange(e, index);
          }}
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
          name="dpNm"
          id="dpNm"
          value={column?.dpNm}
          placeholder="부서명"
          size="md"
          borderRadius="14px"
          isReadOnly={true}
        />
        <Input
          name="dpCd"
          id="dpCd"
          value={column?.dpCd}
          placeholder="부서코드"
          display="none"
        />
      </GridItem>
      <GridItem colStart={13} colEnd={14}>
        <Button bg={'#E2E8F0'}
          borderRadius={'10px'}
          fontWeight={600}
          id="postNumBtn"
          onClick={() => {
            if (editState === "deptInsert" || editState === "deptUpdate") {
              if (column.coCd != "") {
                getOrg();
                onOpen();
              } else {
                setAlertInfo({
                  isOpen: true,
                  status: 'warning',
                  title: "회사를 선택해주세요.",
                  width: 'fit-content'
                });
              }
            }
          }}>부서 조회</Button>
      </GridItem>

      <GridItem colStart={1} colEnd={7}>
        <FormInput
          title={"사번"}
          id="dpGrpNum"
          name="dpGrpNum"
          placeholder="사번"
          value={column?.dpGrpNum}
          readOnly={editState === "read"}
          onChange={(e) => handleChange(e, index)}
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
          onChange={(e) => handleChange(e, index)}
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
          onChange={(e) => handleChange(e, index)}
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
        <SelectCommon handleChange={(e) => handleChange(e, index)} name="rankCd" values={column?.rankCd} ccNum="EM" ccType="A" defaultMsg="선택없음" isReadOnly={editState === "read"} />
      </GridItem>

      <GridItem colStart={8} colEnd={10}>
        <Text fontSize="md" fontWeight="600">
          직책
        </Text>
      </GridItem>
      <GridItem colStart={10} colEnd={14}>
        <SelectCommon handleChange={(e) => handleChange(e, index)} name="pstnCd" ccNum="EM" ccType="B" defaultMsg="선택없음" values={column?.pstnCd} isReadOnly={editState === "read"} />
      </GridItem>

      <GridItem colSpan={2}>
        <Text fontSize="md" fontWeight="600">
          재직구분
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <SelectCommon handleChange={(e) => handleChange(e, index)} name="workTypeCd" ccNum="EM" ccType="C" defaultMsg="선택없음" values={column?.workTypeCd} isReadOnly={editState === "read"} />
      </GridItem>

      <GridItem colStart={8} colEnd={10}>
        <Text fontSize="md" fontWeight="600">
          고용구분
        </Text>
      </GridItem>
      <GridItem colStart={10} colEnd={14}>
        <SelectCommon handleChange={(e) => handleChange(e, index)} name="empTypeCd" ccNum="EM" ccType="D" defaultMsg="선택없음" values={column?.empTypeCd} isReadOnly={editState === "read"} />
      </GridItem>

      <GridItem colSpan={2}>
        <Text fontSize="md" fontWeight="600">
          직무
        </Text>
      </GridItem>
      <GridItem colStart={3} colEnd={7}>
        <SelectCommon handleChange={(e) => handleChange(e, index)} name="jobCd" ccNum="EM" ccType="E" defaultMsg="선택없음" values={column?.jobCd} isReadOnly={editState === "read"} />
      </GridItem>

      <GridItem colStart={8} colEnd={14}>
        <FormInput
          title={"상세업무"}
          placeholder="상세업무를 입력하세요."
          name="jobDetail"
          value={column?.jobDetail}
          readOnly={editState === "read"}
          onChange={(e) => handleChange(e, index)}
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
          onChange={(e) => handleChange(e, index)}
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
          value={column?.fax}
          readOnly={editState === "read"}
          onChange={(e) => handleChange(e, index)}
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
          value={column?.telNum}
          readOnly={editState === "read"}
          onChange={(e) => handleChange(e, index)}
          isRequired={false}
          pk={column?.dpGrpcd}
        />
      </GridItem>

      {/* <AddrBox
        title={'회사주소'}
        data={column}
        //setData={setCorp}
        //dataPk={coCd}
        editState={editState != "read" && 'update'}
        isRequired={true}
      /> */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>상위부서</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DepUpperCd
              value={org}
              getValue={getValue}
            />
            {isLoading ? (
              <Loading />
            ) : (
              <Box ref={infiniteScrollRef} h={"1px"} />
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={click}>
              선택
            </Button>
            <Button onClick={onClose}>취소</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  );
};

export default EmpDeptInput;
