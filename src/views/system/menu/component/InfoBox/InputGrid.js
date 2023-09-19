import { Grid, Input, GridItem, Text, RadioGroup, HStack, Stack, Radio, Box, Icon, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { MdHome } from 'react-icons/md';
import { AttachmentIcon } from '@chakra-ui/icons';

const InputGrid = ({menu, sortValue}) => {
  const [menuData, setmenuData] = useState({
    menuCd: '',
    upperCd: '',
    fileCd: '',
    menuNm: '',
    useYn:'',
    sort : '',
    depth : '',
    typeCd: '',
    menuPath : '',
    delYn : '',
    cdt: '',
    mdt : '',
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    menuData({
      ...menuData,
      [name]: value // name 키를 가진 값을 value 로
    });
  };
  
  // useEffect(()=> {
  //   setmenuData(menuData);
  // }, [corp]);
  return (
    <>
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
            <Input id="menuNm" name="menuNm"  size="md" boarder="1" borderRadius="14px" value={menu&&menu.menuNm} onChange={onChange} readOnly/>
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontSize="sm" fontWeight="600">
            사용여부
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
          <RadioGroup  defaultValue={menuData.useYn}>
            <HStack spacing="24px">
              <Radio name="useYn"  value="1" >사용</Radio>
              <Radio name="useYn" value="0">미사용</Radio>
            </HStack>
          </RadioGroup>
        </GridItem>

        <GridItem colSpan={1}>
          <Text fontSize="sm" fontWeight="600">
            정렬
          </Text>
        </GridItem>
        <GridItem colSpan={3}>
            <Input id="sort" name="sort"  size="md" boarder="1" borderRadius="14px" value={menu&&menu.sort} onChange={onChange} type='number'/>
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
            <Input id="file" name="file" size="md" boarder="1" borderRadius="14px" value='' onChange={onChange} type='file' display={'none'}/>
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
  