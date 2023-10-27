import {
  Grid,
  Input,
  GridItem,
  Text,
  RadioGroup,
  HStack,
  Stack,
  Radio,
  Box,
  Icon,
  InputGroup,
  InputLeftAddon,
  Flex,
  Button,
  useColorModeValue,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useNumberInput,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { React, useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { AttachmentIcon, DragHandleIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { PORT } from "set";
import RealGrid from "./UpperRealGrid";

const InputGrid = ({ title, menuInfo, setMenuInfo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [category, setCategory] = useState([]);
  //const dispatch = useDispatch();
  //const { menu } = useSelector(state => state.menu);
  const [menuInputData, setMenuInputData] = useState({
    menuCd: "",
    upperCd: "",
    fileCd: "",
    menuNm: "",
    useYn: "true",
    sort: "",
    depth: "",
    typeCd: "",
    menuPath: "",
    delYn: 0,
  });
  const useYn = new Boolean(menuInputData.useYn);
  const reset = () => {
    setMenuInfo({
      menuCd: "",
      upperCd: "",
      fileCd: "",
      menuNm: "",
      useYn: 1,
      sort: "",
      depth: "",
      typeCd: "",
      menuPath: "",
      delYn: 0,
    });
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setMenuInputData({
      ...menuInputData,
      [name]: value, // name 키를 가진 값을 value 로
    });
  };
  const setValue = (key, value) => {
    setMenuInputData({
      ...menuInputData,
      [key]: value, // 키를 가진 값을 value 로
    });
  };

  let updateData;
  const getValue = (data) => {
    updateData = data;
  };

  const modifyGnb = () => {
    if (!menuInputData.menuCd) {
      alert("수정할 메뉴를 선택해주세요.");

      return false;
    }

    menuInputData.useYn = menuInputData.useYn === "true" ? 1 : 0;

    fetch(`${PORT}/menu/lnb-${menuInputData.menuCd}`, {
      method: "PUT",
      body: JSON.stringify(menuInputData),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.result.toUpperCase() === "SUCCESS") {
          alert(responseJson.resultMsg);
          reset();
        } else if (responseJson.result.toUpperCase() === "FAIL") {
          alert(responseJson.resultMsg);
        }
      });
  };

  const getCategory = (cd) => {
    const resultTag = null;
    fetch(`${PORT}/menu/`, { method: "GET" })
      .then((response) => response.json())
      .then((responseJson) => {
        setCategory(responseJson.data);
      });
    return resultTag;
  };

  const click = () => {
    console.log(updateData);
    const clickData = {
      ...menuInputData,
      upperCd: updateData._values[2],
      upperName: updateData._values[1],
    };
    setMenuInputData(clickData);
    onClose();
  };

  useEffect(() => {
    setMenuInputData(menuInfo);
    getCategory(menuInfo.upperCd);
  }, [menuInfo]);
  return (
    <>
      <Flex
        align={{ sm: "flex-start", lg: "center" }}
        justify="space-between"
        w="100%"
        px="22px"
        pb="20px"
        mb="10px"
      >
        <Text
          color={textColor}
          fontSize="22px"
          fontWeight="700"
          lineHeight="100%"
        >
          {title}
        </Text>

        <Flex>
          <Button variant="action" onClick={modifyGnb}>
            저장
          </Button>
        </Flex>
      </Flex>
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(4, 1fr)"
        gap={2}
      >
        <GridItem colSpan={3}>
          {/* <Select id='upperCd' name='upperCd' size="md" boarder="1" borderRadius="14px" defaultValue={menuInputData.upperCd}>
              {
                category.map((ctgr, key) => {
                  return <option key={key} value={ctgr.menuCd}>{ctgr.menuNm}</option>
                })
              }
            </Select> */}
          <FormControl display={"flex"} w={"100%"} isRequired={true}>
            <FormLabel
              fontSize="md"
              fontWeight="600"
              w={"50%"}
              lineHeight={"40px"}
            >
              상위부서
            </FormLabel>
            <Input
              w={"100%"}
              fontSize={"14px"}
              borderRadius="5px"
              name="upperCd"
              value={menuInputData?.upperName}
              key={menuInputData?.upperCd}
              readOnly
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1}>
          <Button
            onClick={() => {
              // if (props.editState === "update") {
              //   getCategory();
              //   onOpen();
              // }
              getCategory();
              onOpen();
            }}
          >
            <DragHandleIcon />
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>상위메뉴</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <RealGrid org={category} getValue={getValue} />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={click}>
                  선택
                </Button>
                <Button onClick={onClose}>취소</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {/* <Input id="upperCd" name="upperCd"  size="md" boarder="1" borderRadius="14px" />
            {/* <input list='data' type='text'/> 안되겠다
            <datalist id='data'>
              {
                category.map((ctgr) => {
                  return <option key={ctgr.menuCd} value={ctgr.menuCd}>{ctgr.menuNm}</option>
                })
              }
            </datalist> */}
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontSize="sm" fontWeight="600">
            메뉴명
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
          <Input
            id="menuNm"
            name="menuNm"
            size="md"
            boarder="1"
            borderRadius="14px"
            defaultValue={menuInputData.menuNm}
            onChange={onChange}
          />
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontSize="sm" fontWeight="600">
            사용여부
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
          <RadioGroup
            name="useYn"
            defaultValue={useYn.toString()}
            onChange={(value) => {
              setValue("useYn", value);
            }}
            key={menuInputData.menuCd}
          >
            <HStack spacing="24px">
              <Radio name="useYn" value="true">
                사용
              </Radio>
              <Radio name="useYn" value="false">
                미사용
              </Radio>
            </HStack>
          </RadioGroup>
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontSize="sm" fontWeight="600">
            정렬
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
          <HStack>
            <Input
              id="sort"
              name="sort"
              size="md"
              boarder="1"
              borderRadius="14px"
              defaultValue={menuInputData.sort}
              onChange={onChange}
              min={0}
              type="number"
            />
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default InputGrid;
