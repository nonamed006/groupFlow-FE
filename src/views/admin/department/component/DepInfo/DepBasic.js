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
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useState } from "react";
import { useEffect } from "react";
import DepUpperCd from "./DepUpperCd";
import { DragHandleIcon } from "@chakra-ui/icons";
import { PORT } from "set";
import AddrBox from "common/addressAPI/AddrBox";
const DepBasic = (props) => {
  const [depDto, setDepDto] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [org, setOrg] = useState([]);
  const recYN = new Boolean(depDto.recYN);
  const useYN = new Boolean(depDto.useYN);
  const organYN = new Boolean(depDto.organYN);
  const onChange = (e) => {
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
    updatedDepDto = { ...depDto };
    updatedDepDto.upperCd = text._values[2];
    updatedDepDto.upperName = text.values[1];
  };

  const click = () => {
    onChange2({
      target: {
        name: ["upperCd", "upperName"], // 여러 값을 배열에 넣음
        value: [updatedDepDto.upperCd, updatedDepDto.upperName], // 값을 배열에 넣음
      },
    });
    onClose();
  };
  const getOrg = () => {
    let url = `${PORT}/dep?text=&coCd=`;
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
    <div>
      <Grid
        templateColumns="repeat(13, 1fr)"
        templateRows="repeat(12, 1fr)"
        gap={2}
      >
        <GridItem colSpan={2}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            상위부서
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={6}>
          <Input
            placeholder="-"
            size="md"
            borderRadius="14px"
            name="upperName"
            value={depDto.upperName || ""}
            key={depDto.dpCd}
            readOnly
          />
        </GridItem>
        <GridItem colStart={6} colEnd={7}>
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

        <GridItem colStart={8} colEnd={10}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            대내외 수신여부
          </Text>
        </GridItem>
        <GridItem colSpan={4}>
          <RadioGroup
            value={recYN.toString()}
            onChange={(value) =>
              onChange({ target: { name: "recYN", value: value === "true" } })
            }
          >
            <HStack spacing="24px">
              <Radio value="true" isReadOnly={props.editState === "read"}>
                사용
              </Radio>
              <Radio value="false" isReadOnly={props.editState === "read"}>
                미사용
              </Radio>
            </HStack>
          </RadioGroup>
        </GridItem>

        <GridItem colSpan={2}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            표준행정코드
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input
            placeholder="표준행정코드"
            size="md"
            borderRadius="14px"
            name="stnd"
            value={depDto.stnd || ""}
            key={depDto.dpCd}
            isReadOnly={props.editState === "read"}
            onChange={onChange}
          />
        </GridItem>

        <GridItem colStart={8} colEnd={10}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            발신인명
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <Input
            placeholder="발신인명"
            size="md"
            borderRadius="14px"
            name="reqNm"
            value={depDto.reqNm || ""}
            key={depDto.dpCd}
            isReadOnly={props.editState === "read"}
            onChange={onChange}
          />
        </GridItem>

        <GridItem colSpan={2}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            부서코드
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Text color={textColor} fontSize="sm" fontWeight="500">
            {depDto.dpCd}
          </Text>
        </GridItem>

        <GridItem colStart={8} colEnd={10}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            부서유형
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <Select
            placeholder=""
            borderRadius="14px"
            name="typeCd"
            value={depDto.typeCd || ""}
            key={depDto.dpCd}
            isDisabled={props.editState === "read"}
            onChange={onChange}
          >
            <option value="부서">부서</option>
            <option value="임시">임시</option>
            <option value="팀">팀</option>
          </Select>
        </GridItem>

        <GridItem colSpan={2}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            부서명
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input
            placeholder="부서명"
            size="md"
            borderRadius="14px"
            name="dpNm"
            value={depDto.dpNm || ""}
            key={depDto.dpCd}
            isReadOnly={props.editState === "read"}
            onChange={onChange}
          />
        </GridItem>

        <GridItem colStart={8} colEnd={10}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            부서약칭
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <Input
            placeholder="부서약칭"
            size="md"
            borderRadius="14px"
            name="dpAbb"
            value={depDto.dpAbb || ""}
            key={depDto.dpCd}
            isReadOnly={props.editState === "read"}
            onChange={onChange}
          />
        </GridItem>

        {/*<GridItem colStart={2} colEnd={4}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            부서주소
          </Text>
        </GridItem>
        <GridItem colStart={4} colEnd={7}>
          <Input
            placeholder="우편번호"
            size="md"
            borderRadius="14px"
            name="postNum"
            value={depDto.postNum || ""}
            key={depDto.dpCd}
            isReadOnly={props.editState === "read"}
            onChange={onChange}
          />
        </GridItem>
        <GridItem colStart={7} colEnd={8}>
          <Button size="xs" variant="outline">
            우편번호
          </Button>
        </GridItem>*/}
        <AddrBox
          title={"부서주소"}
          data={depDto}
          setData={setDepDto}
          editState={props.editState}
        ></AddrBox>

        <GridItem colSpan={2}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            사용여부
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <RadioGroup
            value={useYN.toString()}
            key={depDto.dpCd}
            onChange={(value) =>
              onChange({ target: { name: "useYN", value: value === "true" } })
            }
          >
            <HStack spacing="24px">
              <Radio value="true" isReadOnly={props.editState === "read"}>
                사용
              </Radio>
              <Radio value="false" isReadOnly={props.editState === "read"}>
                미사용
              </Radio>
            </HStack>
          </RadioGroup>
        </GridItem>

        {/*<GridItem colStart={4} colEnd={8}>
          <Input
            placeholder="주소"
            size="md"
            borderRadius="14px"
            name="addr"
            value={depDto.addr || ""}
            key={depDto.dpCd}
            onChange={onChange}
            isReadOnly={props.editState === "read"}
          />
        </GridItem>*/}

        <GridItem colStart={8} colEnd={10}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            조작도표시
          </Text>
        </GridItem>
        <GridItem colStart={10} colEnd={14}>
          <RadioGroup
            value={organYN.toString()}
            key={depDto.dpCd}
            onChange={(value) =>
              onChange({ target: { name: "organYN", value: value === "true" } })
            }
          >
            <HStack spacing="24px">
              <Radio value="true" isReadOnly={props.editState === "read"}>
                표시
              </Radio>
              <Radio value="false" isReadOnly={props.editState === "read"}>
                미표시
              </Radio>
            </HStack>
          </RadioGroup>
        </GridItem>

        {/*<GridItem colStart={4} colEnd={8}>
          <Input
            placeholder="상세주소"
            size="md"
            borderRadius="14px"
            name="addrDetail"
            value={depDto.addrDetail || ""}
            key={depDto.dpCd}
            onChange={onChange}
            isReadOnly={props.editState === "read"}
          />
        </GridItem>*/}

        <GridItem colSpan={2}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            정렬
          </Text>
        </GridItem>
        <GridItem colStart={3} colEnd={7}>
          <Input
            placeholder="정렬"
            size="md"
            borderRadius="14px"
            name="sort"
            value={depDto.sort || ""}
            onChange={onChange}
            isReadOnly={props.editState === "read"}
          />
        </GridItem>
      </Grid>
    </div>
  );
};

export default DepBasic;
