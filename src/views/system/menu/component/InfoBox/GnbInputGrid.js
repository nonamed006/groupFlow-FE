import { Grid, Input, GridItem, Text, HStack, Stack, Box, Icon, InputGroup, InputLeftAddon, Flex, Button, useColorModeValue, Image } from '@chakra-ui/react';
import { React, useState, useEffect, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { MdHome } from 'react-icons/md';
import { AttachmentIcon } from '@chakra-ui/icons';
import { PORT } from 'set';
import FormInput from 'common/component/FormInput';
import FormRadio from 'common/component/FormRadio';
import api from 'api/Fetch';
import Upload from 'common/component/Upload';

const GnbInputGrid = ({title, menuInfo, setMenuInfo, setAlertInfo}) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  //const test = useRef(false);
  const [ onDrag, setOnDrag ] = useState(false);
  const [ icons, setIcons ] = useState([]);
  //const dispatch = useDispatch();
  //const { menu } = useSelector(state => state.menu);
  const [menuInputData, setMenuInputData] = useState({
    menuCd: '',
    upperCd: '',
    fileCd: '',
    menuNm: '',
    useYn: 'true',
    sort : '',
    depth : '',
    typeCd: '',
    menuPath : '',
    delYn : 0,
  });
  const useYn = new Boolean(menuInputData.useYn);
  const reset = () => {
    setMenuInfo({
      menuCd: '',
      upperCd: '',
      fileCd: '',
      menuNm: '',
      useYn: 1,
      sort : '',
      depth : '',
      typeCd: '',
      menuPath : '',
      delYn : 0,
    });
  }

  const onChange = (e) => {
    const { value, name } = e.target;
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

  const modifyGnb = () => {
    if(!menuInputData.menuCd) {
      setAlertInfo({
        isOpen: true,
        status: 'error',
        title: '수정할 메뉴를 선택해주세요.',
        width: 'fit-content',
      })
      //alert("수정할 메뉴를 선택해주세요.");
      
      return false;
    }

    menuInputData.useYn = menuInputData.useYn === 'true' ? 1 : 0;

    fetch(`${PORT}/menu/gnb-${menuInputData.menuCd}`, { 
      method: 'PUT', 
      body: JSON.stringify(menuInputData),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.result === 'SUCCESS') {
          alert('성공적으로 저장했습니다.');
          reset();
        } else if(responseJson.result === 'FAIL') {
          alert('저장에 실패했습니다.');
        }
      });
  }

  // 아이콘 목록 조회
  const getIcons = async () => {
    const responseJson = await api.menu.getIcons();

    setIcons(responseJson.data);
  }

  // 아이콘(파일) 업로드
  const registIcon = async (files) => {
    const responseJson = await api.menu.registIcon(files[0]);

    if(responseJson.status === 200) {
      alert(responseJson.resultMsg);
      getIcons();
    }
  }

  useEffect(()=> {
    setMenuInputData(menuInfo);
    getIcons();
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
            <Button variant="action" onClick={modifyGnb}>저장</Button>
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
          />
        </GridItem>

        <GridItem colSpan={4}>
          <FormRadio
            title='사용여부'
            name=''
            defaultValue={useYn.toString()}
            pk={menuInfo.menuCd}
            onChange={onChange}
            isRequired={true}
            values={[
              {
                value: 'true',
                name: '사용',
              },
              {
                value: 'false',
                name: '미사용',
              },
            ]}
          />
          {/* <Text fontSize="sm" fontWeight="600">
            사용여부
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
          <RadioGroup name='useYn' defaultValue={useYn.toString()} onChange={(value) => {
            setValue('useYn', value);
          }}
          key={menuInputData.menuCd}>
            <HStack spacing="24px">
              <Radio name='useYn'  value='true'>사용</Radio>
              <Radio name='useYn' value='false'>미사용</Radio>
            </HStack>
          </RadioGroup> */}
        </GridItem>

        <GridItem colSpan={1}>
          {/* <FormSort
            title='정렬'
            name='sort'
            value={menuInputData.sort}
            pk={menuInfo.menuCd}
            onChange={(value) => {
              setMenuInputData({
                ...menuInputData,
                sort: value,
              })
            }}
          /> */}
          <Text fontSize="sm" fontWeight="600">
            정렬
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
          <HStack>
            <Input  id="sort" name="sort"  size="md" boarder="1" borderRadius="14px" defaultValue={menuInputData.sort} onChange={onChange} min={0} type='number'/>
          </HStack>
        </GridItem>

        <GridItem colSpan={1} rowSpan={5}>
          <Text fontSize="sm" fontWeight="600">
            아이콘
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
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
              placeholder='마우스로 파일을 끌어오세요'
              onClick={() => {
                document.getElementById('file').click();
              }}
            />
          </InputGroup>
          <Input id="file" name="file" size="md" boarder="1" borderRadius="14px" onChange={onChange} type='file' display={'none'}/>
        </GridItem>
        <GridItem colSpan={3} borderWidth={1} rowSpan={4} h={'200px'} overflowY={'scroll'}>
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
                    setValue('fileCd', icon.fileCd);
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
        display={onDrag ? 'block' : 'none'}
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
          upload={registIcon}
        />
      </Box>
    </Box>
  );
};
  
export default GnbInputGrid;
  