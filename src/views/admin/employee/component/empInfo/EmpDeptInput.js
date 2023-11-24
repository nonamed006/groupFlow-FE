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

    if ("CO" === updatedDepDto?._values[2].substr(0,2)) {
      idx++;
      setAlertInfo({
        isOpen: true,
        status: 'warning',
        title: "회사는 선택할 수 없습니다.",
        width: 'fit-content'
      });
    }

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
      templateColumns="repeat(8, 1fr)"
      templateRows="repeat(11, 1fr)"
      gap={1}
    >
      <GridItem colStart={0} colSpan={13}>
      <Checkbox
        me='5px'
        size="lg"
        colorScheme='brandScheme'
        name="dpGrpCd"
        value={column.dpGrpCd}
        onChange={(e) => {
          handleChangeChk(e);
        }}
        style={{visibility: editState === "deptDelete" ? "visible" : "hidden"}}
      />
      </GridItem>

      <GridItem colStart={1} colEnd={4} colSpan={4}>
      <FormInput
          title={"회사/부서"}
          type="selectEmp"
          id="coCd"
          name="coCd"
          placeholder="전체"
          defaultValue={column?.coCd}
          readOnly={editState === "read"}
          onChange={(e) => handleChange(e, index)}
          values={corpNm}
          isRequired={true}
          pk={column?.dpGrpCd}
        />
      </GridItem>
      <GridItem colStart={4} colEnd={7} colSpan={3}>
      <FormInput
          id="dpNm"
          name="dpNm"
          placeholder="부서명"
          value={column?.dpNm}
          readOnly={editState === "read"}
          onChange={(e) => handleChange(e, index)}
          isRequired={true}
          pk={column?.dpGrpCd}
        />
        <Input
          name="dpCd"
          id="dpCd"
          value={column?.dpCd}
          placeholder="부서코드"
          display="none"
        />
      </GridItem>

      <GridItem colStart={7} colEnd={8}>
        <Button bg={'#E2E8F0'}
          borderRadius={'10px'}
          fontWeight={600}
          id="postNumBtn"
          onClick={() => {
            if (editState !== "read") {
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

      <GridItem colStart={1} colEnd={4} colSpan={4}>
        <FormInput
          title={"사번"}
          id="dpGrpNum"
          name="dpGrpNum"
          placeholder="사번"
          value={column?.dpGrpNum}
          readOnly={editState === "read"}
          onChange={(e) => handleChange(e, index)}
          isRequired={true}
          pk={column?.dpGrpCd}
        />
      </GridItem>

      <GridItem colStart={1} colEnd={4} colSpan={4} lineHeight="40px">
        <FormInput
            type={'radio'}
          title={'회사구분'}
          name={'coType'}
          defaultValue={column?.coType}
          pk={column?.dpGrpCd}
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

      <GridItem colStart={5} colEnd={8} colSpan={4} lineHeight="40px">
        <FormInput
          type={'radio'}
          title={'부서구분'}
          name={'dpType'}
          defaultValue={column?.dpType}
          pk={column?.dpGrpCd}
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

      <GridItem colStart={1} colEnd={4} colSpan={4}>
        <SelectCommon handleChange={(e) => handleChange(e, index)} name="rankCd" values={column?.rankCd} ccNum="EM" ccType="A" defaultMsg="선택없음" isReadOnly={editState === "read"} pk={column?.dpGrpCd} title={"직급"} isRequired={true}/>
      </GridItem>

      <GridItem colStart={5} colEnd={8} colSpan={4}>
        <SelectCommon handleChange={(e) => handleChange(e, index)} name="pstnCd" ccNum="EM" ccType="B" defaultMsg="선택없음" values={column?.pstnCd} isReadOnly={editState === "read"} pk={column?.dpGrpCd} title={"직책"} isRequired={true}/>
      </GridItem>

      <GridItem colStart={1} colEnd={4} colSpan={4}>
        <SelectCommon handleChange={(e) => handleChange(e, index)} name="workTypeCd" ccNum="EM" ccType="C" defaultMsg="선택없음" values={column?.workTypeCd} isReadOnly={editState === "read"} pk={column?.dpGrpCd} title={"재직구분"} isRequired={true}/>
      </GridItem>

      <GridItem colStart={5} colEnd={8} colSpan={4}>
        <SelectCommon handleChange={(e) => handleChange(e, index)} name="empTypeCd" ccNum="EM" ccType="D" defaultMsg="선택없음" values={column?.empTypeCd} isReadOnly={editState === "read"} pk={column?.dpGrpCd} title={"고용구분"} isRequired={true}/>
      </GridItem>

      <GridItem colStart={1} colEnd={4} colSpan={4}>
        <SelectCommon handleChange={(e) => handleChange(e, index)} name="jobCd" ccNum="EM" ccType="E" defaultMsg="선택없음" values={column?.jobCd} isReadOnly={editState === "read"} pk={column?.dpGrpCd} title={"직무"} isRequired={true}/>
      </GridItem>

      <GridItem colStart={5} colEnd={8} colSpan={4}>
        <FormInput
          title={"상세업무"}
          placeholder="상세업무를 입력하세요."
          name="jobDetail"
          value={column?.jobDetail}
          readOnly={editState === "read"}
          onChange={(e) => handleChange(e, index)}
          isRequired={false}
          pk={column?.dpGrpCd}
        />
      </GridItem>

      <GridItem colStart={1} colEnd={4} colSpan={4}>
      <FormInput
            title={"입사일"}
            name="joinDt"
            id="joinDt"
            inputType="date"
            placeholder="Select Date and Time"
            style={{ color: "gray" }}
            value={minTimeDate(column?.joinDt)}
            readOnly={editState === "read"}
            onChange={(e) => handleChange(e, index)}
            isRequired={true}
            pk={column?.dpGrpCd}
          />
      </GridItem>

      <GridItem colStart={5} colEnd={8} colSpan={4}>
      <FormInput
            title={"퇴사일"}
            name="reDt"
            id="reDt"
            inputType="date"
            placeholder="Select Date and Time"
            style={{ color: "gray" }}
            value={minTimeDate(column?.reDt)}
            readOnly={editState === "read"}
            onChange={(e) => handleChange(e, index)}
            pk={column?.dpGrpCd}
          />
      </GridItem>

      <GridItem colStart={1} colEnd={4} colSpan={4}>
        <FormInput
          title={"팩스번호"}
          id="fax"
          name="fax"
          placeholder="팩스번호를 입력하세요."
          value={column?.fax}
          readOnly={editState === "read"}
          onChange={(e) => handleChange(e, index)}
          isRequired={false}
          pk={column?.dpGrpCd}

        />
      </GridItem>

      <GridItem colStart={5} colEnd={8} colSpan={4}>
        <FormInput
          title={"전화번호"}
          name="telNum"
          id="telNum"
          placeholder="전화번호를 입력하세요."
          value={column?.telNum}
          readOnly={editState === "read"}
          onChange={(e) => handleChange(e, index)}
          isRequired={false}
          pk={column?.dpGrpCd}
        />
      </GridItem>

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
