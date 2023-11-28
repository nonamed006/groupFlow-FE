import {
  Grid,
  Input,
  GridItem,
  Text,
  Flex,
  Button,
  useColorModeValue,
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
import { DragHandleIcon } from "@chakra-ui/icons";
import RealGrid from "./UpperRealGrid";
import api from "api/Fetch";
import FormInput from "common/component/FormInput";
import { menuSchema } from "common/Schema";

const LnbInputGrid = ({
  title,
  menuInfo,
  setMenuInfo,
  setAlertInfo,
  isEditing,
  setIsEditing,
  isEditingReset,
  isSave,
  setIsSave,
  setIsLoading
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [category, setCategory] = useState([]);
  const [menuInputData, setMenuInputData] = useState({
    menuCd: "",
    upperCd: "",
    fileCd: "",
    menuNm: "",
    useYn: true,
    sort: "",
    depth: "",
    typeCd: "",
    menuPath: "",
    delYn: 0,
  });
  const useYn = new Boolean(
    menuInputData.useYn === undefined ? true : menuInputData.useYn
  );

  const onChange = (e) => {
    let { value, name } = e.target;

    if (name === "useYn") {
      value = JSON.parse(value.toLowerCase());
    }
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

  // 유효성 검사
  const menuValidation = () => {
    menuSchema
      .validate(menuInputData)
      .then((res) => {
        if (res.menuCd) {
          modifyLnb();
        }
      })
      .catch((err) => {
        setAlertInfo({
          isOpen: true,
          status: "error",
          title: "입력값을 확인해주세요.",
          detail: err.message,
          width: "fit-content",
        });
      });
  };

  // 수정
  const modifyLnb = async () => {
    if (!menuInputData.menuCd) {
      setAlertInfo({
        isOpen: true,
        status: "warning",
        title: "수정할 메뉴를 선택해주세요.",
        width: "fit-content",
      });

      return false;
    }

    setIsLoading(true);
    menuInputData.useYn = menuInputData.useYn ? 1 : 0;
    const responseJson = await api.menu.modifyLnb(menuInputData);

    if (responseJson.status === 200) {
      setAlertInfo({
        isOpen: true,
        status: "success",
        title: responseJson.resultMsg,
        width: "fit-content",
      });
      setMenuInfo(responseJson.voData);
      setIsSave(!isSave);
    } else {
      setAlertInfo({
        isOpen: true,
        status: "error",
        title: responseJson.resultMsg,
        width: "fit-content",
      });
    }
    setIsLoading(false);
  };

  const getCategory = async () => {
    const resultTag = null;

    const responseJson = await api.menu.getLnbMenuList();
    setCategory(responseJson.data);
    // fetch(`${PORT}/menu/`, {method: 'GET'})//category-${cd}
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     setCategory(responseJson.data);
    //   });
    return resultTag;
  };

  const click = () => {
    if (!updateData) {
      setAlertInfo({
        isOpen: true,
        status: "error",
        title: "상위 메뉴를 선택해주세요.",
        width: "fit-content",
      });
      return false;
    }

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
    setIsEditing(false);
  }, [menuInfo]);

  return (
    <>
      <Flex
        align={{ sm: "flex-start", lg: "center" }}
        justify="space-between"
        w="100%"
        px="22px"
        pb="20px"
        mb="20px"
        borderBottom={"1px"} color={'lightgray'}
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
          {isEditing ? (
            <>
              <Button
                variant="brand"
                borderRadius={"10px"}
                fontWeight={"600"}
                m={1}
                onClick={menuValidation}
              >
                저장
              </Button>
              <Button
                onClick={() => isEditingReset()}
                variant="action"
                borderRadius={"10px"}
                fontWeight={"600"}
                m={1}
              >취소</Button>
            </>
          ) : (
            <Button
              variant="brand"
              borderRadius={"10px"}
              fontWeight={"600"}
              m={1}
              onClick={() => {
                if (menuInfo.menuCd) {
                  setIsEditing(true);
                } else {
                  setAlertInfo({
                    isOpen: true,
                    status: "warning",
                    title: "수정할 메뉴를 선택해주세요.",
                    width: "fit-content",
                  });
                }
              }}
            >
              수정
            </Button>
          )}
        </Flex>
      </Flex>
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(4, 1fr)"
        gap={2}
      >
        <GridItem colSpan={4}>
          <FormControl display={"flex"} w={"100%"} isRequired={true}>
            <FormLabel
              fontSize="md"
              fontWeight="600"
              w={"50%"}
              lineHeight={"40px"}
            >
              상위메뉴
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
            <Button
              onClick={() => {
                if (isEditing) {
                  getCategory();
                  onOpen();
                }
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
          </FormControl>
        </GridItem>
        {/* <GridItem colSpan={1}>
          <Button
            onClick={() => {
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
        </GridItem> */}

        <GridItem colSpan={4}>
          <FormInput
            title="메뉴명"
            name="menuNm"
            value={menuInputData.menuNm}
            pk={menuInfo.menuCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={true}
          />
        </GridItem>

        <GridItem colSpan={4}>
          <FormInput
            type={"radio"}
            title="사용여부"
            name="useYn"
            defaultValue={useYn.toString()}
            pk={menuInfo.menuCd}
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

        <GridItem colSpan={4}>
          <FormInput
            title="정렬"
            name="sort"
            value={menuInputData.sort}
            pk={menuInfo.menuCd}
            readOnly={!isEditing}
            isRequired={true}
            inputType="number"
            onChange={(e) => onChange(e)}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default LnbInputGrid;
