import {
  useColorModeValue,
  Input,
  useDisclosure,
  Button,
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
  Box,
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
import Loading from "common/Loading";
import { useInView } from "react-intersection-observer";
import { set } from "lodash";
const DepBasic = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [org, setOrg] = useState([]);
  let recYN = new Boolean(
    props.depDto?.recYN === undefined ? true : props.depDto?.recYN
  );
  let useYN = new Boolean(
    props.depDto?.useYN === undefined ? true : props.depDto?.useYN
  );
  const [infiniteScrollRef, inView] = useInView();
  const onChange = (e) => {
    let { value, name } = e.target;
    if (e.target.name === "recYN") {
      value = e.target.value.toLowerCase() === "true";
    }
    const updateData = {
      ...props.depDto,
      [name]: value,
    };
    props.change(updateData);
  };

  const onChange2 = (e) => {
    const { value, name } = e.target;
    const updateData = {
      ...props.depDto,
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
    if (updatedDepDto === undefined) {
      props.setAlertInfo({
        isOpen: true,
        title: "상위부서를 선택해주세요.",
        status: "warning",
        width: "fit-content",
      });
      return 0;
    }
    let dataArray = updatedDepDto._values[0].split("/");
    if (props.depDto.dpCd == "") {
    } else {
      if (dataArray.includes(props.depDto.dpCd)) {
        props.setAlertInfo({
          isOpen: true,
          title: "하위부서는 선택할 수 없습니다.",
          status: "warning",
          width: "fit-content",
        });
        return 0;
      }
    }

    onChange2({
      target: {
        name: ["upperCd", "upperName"], // 여러 값을 배열에 넣음
        value: [updatedDepDto?._values[2], updatedDepDto?._values[1]], // 값을 배열에 넣음
      },
    });
    onClose();
  };
  const getOrg = async () => {
    props.setIsLoading(true);
    let url = `${PORT}/roleEmp/list?empYn=N&searchCoCd=&keyword=&search=dep`;
    await fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setOrg(res.data);
      });
    props.setIsLoading(false);
  };
  useEffect(() => {
    recYN = true;
  }, [props]);

  return (
    <>
      <Grid
        templateColumns="repeat(8, 1fr)"
        templateRows="repeat(8, 1fr)"
        gap={1}
        w={"100%"}
        paddingLeft={10}
      >
        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormControl display={"flex"} w={"100%"} isRequired={true}>
            <FormLabel
              fontSize="md"
              fontWeight="600"
              w={"40%"}
              lineHeight={"40px"}
            >
              상위부서
            </FormLabel>
            <Input
              w={"100%"}
              fontSize={"14px"}
              borderRadius="5px"
              name="upperName"
              value={props.depDto?.upperName}
              key={props.depDto?.dpCd}
              readOnly
            />
          </FormControl>
        </GridItem>
        <GridItem colStart={4}>
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
                <DepUpperCd
                  value={org}
                  data={props}
                  getValue={getValue}
                  setAlertInfo={props.setAlertInfo}
                  setIsLoading={props.setIsLoading}
                />
                {props.isLoading ? (
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
        </GridItem>

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormRadio
            title={"대내외 수신여부"}
            name={"recYN"}
            defaultValue={recYN.toString()}
            pk={props.depDto?.dpCd}
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
        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormInput
            title={"표준행정코드"}
            name={"stnd"}
            value={props.depDto?.stnd}
            pk={props.depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormInput
            title={"발신인명"}
            name={"reqNm"}
            value={props.depDto?.reqNm}
            pk={props.depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
            isRequired={false}
          />
        </GridItem>
        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormInput
            title={"부서코드"}
            name={"dpCd"}
            value={props.depDto?.dpCd}
            pk={props.depDto?.dpCd}
            onChange={onChange}
            readOnly={true}
            isRequired={false}
          />
        </GridItem>

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormSelect
            title={"부서유형"}
            name={"typeCd"}
            defaultValue={props.depDto?.typeCd}
            pk={props.depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
            placeholder={"부서유형"}
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

        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormInput
            title={"부서명"}
            name={"dpNm"}
            value={props.depDto?.dpNm}
            pk={props.depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
            isRequired={true}
          />
        </GridItem>

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormInput
            title={"발신인명"}
            name={"dpAbb"}
            value={props.depDto?.dpAbb}
            pk={props.depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
            isRequired={false}
          />
        </GridItem>
        <AddrBox
          title={"부서주소"}
          data={props.depDto}
          setData={props.setDepDto}
          editState={props.editState}
        ></AddrBox>

        <GridItem colStart={1} colEnd={4} colSpan={4}>
          <FormRadio
            title={"사용여부"}
            name={"useYN"}
            defaultValue={useYN.toString()}
            pk={props.depDto?.dpCd}
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

        <GridItem colStart={5} colEnd={8} colSpan={4}>
          <FormInput
            title={"정렬"}
            name={"sort"}
            value={props.depDto?.sort}
            pk={props.depDto?.dpCd}
            onChange={onChange}
            readOnly={props.editState === "read"}
            isRequired={true}
          />
        </GridItem>
      </Grid>
      {props.isLoading ? (
        <Loading />
      ) : (
        <Box ref={infiniteScrollRef} h={"1px"} />
      )}
    </>
  );
};

export default DepBasic;
