import { Grid, Input, GridItem, Text, HStack, Stack, Box, Icon, InputGroup, InputLeftAddon, Flex, Button, useColorModeValue, Image, FormControl, FormLabel } from '@chakra-ui/react';
import { React, useState, useEffect, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { MdHome } from 'react-icons/md';
import { AttachmentIcon } from '@chakra-ui/icons';
import { PORT } from 'set';
import FormInput from 'common/component/FormInput';
import api from 'api/Fetch';
import Upload from 'common/component/Upload';
import { menuSchema } from 'common/Schema';

const GnbInputGrid = ({
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
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const [ onDrag, setOnDrag ] = useState(false); // 파일 드래그드롭 관련
  const [ icons, setIcons ] = useState([]);
  const [menuInputData, setMenuInputData] = useState({
    menuCd: '',
    upperCd: '',
    fileCd: '',
    menuNm: '',
    useYn: undefined,
    sort : '',
    depth : '',
    typeCd: '',
    menuPath : '',
    delYn : 0,
  });
  const useYn = new Boolean(menuInputData.useYn === undefined ? true : menuInputData.useYn);

  const onChange = (e) => {
    let { value, name } = e.target;

    if(name === 'useYn') {
      value = JSON.parse(value.toLowerCase());
    }
    setMenuInputData({
      ...menuInputData,
      [name]: value // name 키를 가진 값을 value 로
    });
  };
  const setValue = (key, value) => {
    setMenuInputData({
      ...menuInputData,
      [key]: value // 키를 가진 값을 value 로
    });
  }

  // 유효성 검사
  const menuValidation = () => {
    menuSchema.validate(menuInputData).then(res => {
      if(res.menuCd) {
        modifyGnb();
      }
    }).catch(err => {
      setAlertInfo({
        isOpen: true,
        status: 'error',
        title: '입력값을 확인해주세요.',
        detail: err.message,
        width: 'fit-content',
      })
    })
  }

  // 수정
  const modifyGnb = async () => {
    if(!menuInputData.menuCd) {
      setAlertInfo({
        isOpen: true,
        status: 'warning',
        title: '수정할 메뉴를 선택해주세요.',
        width: 'fit-content',
      })
      
      return false;
    }

    setIsLoading(true);
    menuInputData.useYn = menuInputData.useYn ? 1 : 0;
    const responseJson = await api.menu.modifyGnb(menuInputData);

    if(responseJson.status === 200) {
      setAlertInfo({
        isOpen: true,
        status: 'success',
        title: responseJson.resultMsg,
        width: 'fit-content',
      });
      setMenuInfo(responseJson.voData);
      setIsSave(!isSave)
    } else {
      setAlertInfo({
        isOpen: true,
        status: 'error',
        title: responseJson.resultMsg ? responseJson.resultMsg : '에러가 발생했습니다.',
        width: 'fit-content',
      });
    }
    setIsLoading(false);
  }

  // 아이콘 목록 조회
  const getIcons = async () => {
    const responseJson = await api.menu.getIcons(); 

    setIcons(responseJson.data);
  }

  // 아이콘(파일) 업로드
  const registIcon = async (files) => {
    setIsLoading(true);
    const responseJson = await api.menu.registIcon(files);

    if(responseJson.status === 200) {
      setAlertInfo({
        isOpen: true,
        status: 'success',
        title: responseJson.resultMsg,
        width: 'fit-content',
      });
      getIcons();
    } else {
      setAlertInfo({
        isOpen: true,
        status: 'error',
        title: responseJson.resultMsg ? responseJson.resultMsg : "파일 업로드에 실패했습니다.",
        width: 'fit-content',
      });
    }
    setIsLoading(false);
  }

  useEffect(()=> {
    setMenuInputData(menuInfo);
    getIcons();
    setIsEditing(false);
  }, [menuInfo]);

  return (
    <Box w={'100%'} h={'100%'} position={'relative'}
      onDragEnter={() => {
        setOnDrag(true);
      }}
    >
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
            {
              isEditing ? 
                <>
                  <Button
                    variant="brand"
                    borderRadius={"10px"}
                    fontWeight={"600"}
                    m={1}
                    onClick={menuValidation}
                  >저장</Button>
                  <Button
                    variant="action"
                    borderRadius={"10px"}
                    fontWeight={"600"}
                    m={1}
                    onClick={() => isEditingReset()}
                  >취소</Button>
                </>
              :
              <Button
                variant="brand"
                borderRadius={"10px"}
                fontWeight={"600"}
                m={1}
                onClick={() => {
                  if(menuInfo.menuCd) {
                    setIsEditing(true)
                  } else {
                    setAlertInfo({
                      isOpen: true,
                      status: 'warning',
                      title: '수정할 메뉴를 선택해주세요.',
                      width: 'fit-content',
                    });
                  }
                }}
              >수정</Button>
            }
        </Flex>
      </Flex>

      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(8, 1fr)"
        gap={2}
      >
        <GridItem colSpan={4}>
          <FormInput
            title='메뉴명'
            name='menuNm'
            value={menuInputData.menuNm}
            pk={menuInfo.menuCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={true}
          />
        </GridItem>

        <GridItem colSpan={4}>
          <FormInput
            type={'radio'}
            title='사용여부'
            name='useYn'
            defaultValue={useYn.toString()}
            pk={menuInfo.menuCd}
            onChange={onChange}
            readOnly={!isEditing}
            isRequired={true}
            values={[
              {
                value: "true",
                name: '사용',
              },
              {
                value: "false",
                name: '미사용',
              },
            ]}
          />
        </GridItem>

        <GridItem colSpan={4}>
          <FormInput
            title='정렬'
            name='sort'
            value={menuInputData.sort}
            pk={menuInfo.menuCd}
            readOnly={!isEditing}
            isRequired={true}
            inputType='number'
            onChange={(e) => onChange(e)}
          />
        </GridItem>

        <GridItem colSpan={4}>{/* colSpan={1} rowSpan={5}*/}
            <FormControl display={"flex"} w={"100%"} isRequired={true}>
              <FormLabel color={textColor} fontSize="md" fontWeight="600" w={"50%"} lineHeight={"40px"}>
                아이콘
              </FormLabel>
              <InputGroup>
            <InputLeftAddon children={<AttachmentIcon/>} />
            <Input
                id="fileInput"
                name="fileInput"
                size="md"
                boarder="1"
                borderRadius="14px"
                value=''
                readOnly='readOnly'
                placeholder='마우스로 파일을 끌어오세요.'
                onClick={(e) => {
                  if(isEditing) {
                    setOnDrag(true);
                    e.target.blur();
                  }
                }}
              />
            </InputGroup>
            <Input id="file" name="file" size="md" boarder="1" borderRadius="14px" onChange={onChange} type='file' display={'none'}/>
          </FormControl>
        </GridItem>
        <GridItem colSpan={4} borderWidth={1} rowSpan={4} h={'200px'} overflowY={'scroll'}>
          <Stack
            // divider={<StackDivider borderColor='gray.200' />}
            direction={['column', 'row']}
            wrap={'wrap'}
            justify={'flex-start'}
            spacing={0}
            align='baseline'
            p={3}
            overflowY={'scroll'}
          >
          {
            icons &&
            icons.map((icon, index) =>  {
              return (
                <Box
                  p={5}
                  bg={menuInputData.fileCd === icon.fileCd ? 'navy.50' : 'white'}
                  shadow='sm'
                  borderWidth='1px'
                  borderRadius={'md'}
                  key={index}
                  onClick={() => {
                    isEditing && setValue('fileCd', icon.fileCd);
                  }}
                  cursor={'pointer'}
                >
                  {
                    icon.typeCd === 'FIA0001' ?
                      // 기본 아이콘
                      <Image src={icon.filePath + '/' + icon.modiNm} alt={icon.menuNm} w='20px' h='20px'/>
                    :
                      // 업로드 아이콘
                      <Image src={`${PORT}/menu/icon-${icon.fileCd}`} alt={icon.menuNm} w='20px' h='20px'/>
                  }
                </Box>
              )
            })
          }
          </Stack>
        </GridItem>
      </Grid>

      <Box
        position={'absolute'}
        //bg={'gray.200'}
        w={'100%'}
        h={'100%'}
        left={0}
        top={0}
        display={onDrag && isEditing ? 'block' : 'none'}
        onClick={() => (onDrag && isEditing) && setOnDrag(false)}
      >
        <Upload
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "1 / 3 / 2 / 4",
          }}
          width='100%'
          height='100%'
          pe='20px'
          pb={{ base: "100px", lg: "20px" }}
          setOnDrag={setOnDrag}
          handleEvent={registIcon}
        />
      </Box>
    </Box>
  );
};
  
export default GnbInputGrid;
  