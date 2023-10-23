import {
  Text,
  useColorModeValue,
  Input,
  useDisclosure,
  Button,
  Radio,
  RadioGroup,
  HStack,
  Select,
  Grid,
  GridItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useState } from "react";
import { useEffect } from "react";
import DepUpperCd from "./DepUpperCd";
import { DragHandleIcon } from "@chakra-ui/icons";
import { PORT } from "set";
import AddrBox from "common/addressAPI/AddrBox";
import FormRadio from "common/component/FormRadio";
import FormInput from "common/component/FormInput";
import FormSelect from "common/component/FormSelect";
const DepBasic = (props) => {
  console.log(props);
  const [depDto, setDepDto] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  //const [updatedDepDto, setUpdatedDepDto] = useState({});
  const [org, setOrg] = useState([]);
  console.log(depDto);
  const recYN = new Boolean(depDto?.recYN);
  const useYN = new Boolean(depDto?.useYN);
  const onChange = (e) => {
    console.log(e.target.value);
    const { value, name } = e.target;
    const updateData = {
      ...depDto,
      [name]: value,
    };
    props.change(updateData);
  };

  const onChange2 = (e) => {
    const { value, name } = e.target;
    const updateData = {
      ...depDto,
      upperCd: value[0],
      upperName: value[1],
    };
    props.change(updateData);
  };

  let updatedDepDto;
  const getValue = (text) => {
    //setUpdatedDepDto(text);
    updatedDepDto = text;
  };

  const click = () => {
    onChange2({
      target: {
        name: ["upperCd", "upperName"], // 여러 값을 배열에 넣음
        value: [updatedDepDto?._values[2], updatedDepDto?._values[1]], // 값을 배열에 넣음
      },
    });
    onClose();
  };
  const getOrg = () => {
    let url = `${PORT}/roleEmp/list?empYn=N&searchCoCd=&keyword=&search=dep`;
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setOrg(res.data);
      });
  };
  useEffect(() => {
    setDepDto(props.depDto);
  }, [props]);

  return (
    <>
      <Grid
        templateColumns="repeat(10, 1fr)"
        templateRows="repeat(10, 1fr)"
        gap={2}
        w={"100%"}
        paddingLeft={10}
      >
        <GridItem colStart={1} colEnd={5} colSpan={5}>
          <FormControl display={"flex"} w={"100%"} isRequired={true}>
            <FormLabel fontSize="md" fontWeight="600" w={"50%"}>
              상위부서
            </FormLabel>
            <Input
              w={"100%"}
              fontSize={"14px"}
              borderRadius="5px"
              name="upperName"
              value={depDto?.upperName}
              key={depDto?.dpCd}
              readOnly
            />
          </FormControl>
        </GridItem>
        <GridItem colStart={5} colEnd={6}>
          <Button
            onClick={() => {
              if (props.editState === "update") {
                getOrg();
                onOpen();
              }
            }}
          >
            <DragHandleIcon />
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>상위부서</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <DepUpperCd value={org} data={props} getValue={getValue} />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={click}>
                  선택
                </Button>
                <Button onClick={onClose}>취소</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </GridItem>

        <GridItem colStart={6} colEnd={10} colSpan={5}>
          <FormRadio
            title={"대내외 수신여부"}
            name={"recYN"}
            value={recYN.toString()}
            pk={depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
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
        <GridItem colSpan={5} colStart={1} colEnd={5}>
          <FormInput
            title={"표준행정코드"}
            name={"stnd"}
            value={depDto?.stnd}
            pk={depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={6} colEnd={10} colSpan={5}>
          <FormInput
            title={"발신인명"}
            name={"reqNm"}
            value={depDto?.reqNm}
            pk={depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
            isRequired={false}
          />
        </GridItem>
        <GridItem colStart={1} colEnd={5} colSpan={5}>
          <FormInput
            title={"부서코드"}
            name={"dpCd"}
            value={depDto?.dpCd}
            pk={depDto?.dpCd}
            onChange={onChange}
            readOnly={true}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={6} colEnd={10} colSpan={5}>
          <FormSelect
            title={"부서유형"}
            name={"typeCd"}
            value={depDto?.typeCd}
            pk={depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
            isRequired={true}
            values={[
              {
                value: "DPA0001",
                name: "부서",
              },
              {
                value: "DPA0002",
                name: "팀",
              },
              {
                value: "DPA0003",
                name: "임시",
              },
            ]}
          />
        </GridItem>

        <GridItem colStart={1} colEnd={5} colSpan={5}>
          <FormInput
            title={"부서명"}
            name={"dpNm"}
            value={depDto?.dpNm}
            pk={depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
            isRequired={true}
          />
        </GridItem>

        <GridItem colStart={6} colEnd={10} colSpan={5}>
          <FormInput
            title={"발신인명"}
            name={"dpAbb"}
            value={depDto?.dpAbb}
            pk={depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
            isRequired={false}
          />
        </GridItem>
        <AddrBox
          title={"부서주소"}
          data={depDto}
          setData={setDepDto}
          editState={props.editState}
        ></AddrBox>

        <GridItem colStart={1} colEnd={5} colSpan={5}>
          <FormRadio
            title={"사용여부"}
            name={"useYN"}
            value={useYN.toString()}
            pk={depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
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

        <GridItem colStart={6} colEnd={10} colSpan={5}>
          <FormInput
            title={"정렬"}
            name={"sort"}
            value={depDto?.sort}
            pk={depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
            isRequired={true}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default DepBasic;
