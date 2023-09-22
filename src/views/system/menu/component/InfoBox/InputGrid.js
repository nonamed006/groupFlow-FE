import { Grid, Input, GridItem, Text, RadioGroup, HStack, Stack, Radio, Box, Icon, InputGroup, InputLeftAddon, Flex, Button, useColorModeValue, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, useNumberInput } from '@chakra-ui/react';
import { React, useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { MdHome } from 'react-icons/md';
import { AttachmentIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { PORT } from 'set';

const InputGrid = ({title, menuInfo, setMenuInfo}) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
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
  console.log(menuInputData.useYn);
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
      alert("수정할 메뉴를 선택해주세요.");
      
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

  useEffect(()=> {
    console.log('menuInfo');
    if(Object.keys(menuInfo).length > 0)
    setMenuInputData(menuInfo);
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
            <Button variant="action" onClick={modifyGnb}>저장</Button>
        </Flex>
      </Flex>
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(8, 1fr)"
        gap={2}
      >
        <GridItem colSpan={1}>
          <Text fontSize="sm" fontWeight="600">
            메뉴명
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
            <Input id="menuNm" name="menuNm"  size="md" boarder="1" borderRadius="14px" defaultValue={menuInputData.menuNm} onChange={onChange}/>
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontSize="sm" fontWeight="600">
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
          </RadioGroup>
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontSize="sm" fontWeight="600">
            정렬
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
          <HStack>
            <Input  id="sort" name="sort"  size="md" boarder="1" borderRadius="14px" defaultValue={menuInputData.sort} onChange={onChange} min={0} type='number'/>
          </HStack>
        </GridItem>

        <GridItem colSpan={1} rowSpan={2}>
          <Text fontSize="sm" fontWeight="600">
            아이콘
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
        <InputGroup>
          <InputLeftAddon children={<AttachmentIcon/>} />
          <Input id="fileInput" name="fileInput" size="md" boarder="1" borderRadius="14px" value='' onChange={onChange} readOnly='readOnly' placeholder='마우스로 파일을 끌어오세요'/>
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
          <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
            <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
          </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
            <Box p={5} shadow='sm' borderWidth='1px' borderRadius={'md'}>
              <Icon as={MdHome} width='20px' height='20px' color='inherit'/>
            </Box>
          </Stack>
        </GridItem>

      </Grid>
    </>
  );
};
  
export default InputGrid;
  