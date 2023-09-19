import {Text,useColorModeValue,Input, useDisclosure,
  Button, Radio, RadioGroup, HStack, Select, Grid, GridItem, 
  TabPanels, TabPanel, Tab,Tabs, TabList,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React, { useState } from "react";
import { useEffect } from "react";
import DepUpperCd from "./DepUpperCd";
import {DragHandleIcon} from '@chakra-ui/icons'
const DepBasic = (props) => {
  const [depDto, setDepDto] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure()
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const recYN = new Boolean(depDto.recYN);
  const useYN = new Boolean(depDto.useYN);
  const organYN = new Boolean(depDto.organYN);
  
  // console.log(props)asdas

  const onChange = (e) => {
    const { value, name } = e.target;
    const updateData = {
      ...depDto,
      [name]: value
    }
    props.change(updateData)
    
  };
  let updatedDepDto;
  const getValue = (text) => {
    updatedDepDto= { ...depDto };
    updatedDepDto.upperCd = text;
  };
  const click = () => {
    // 상태 업데이트
    if(updatedDepDto != undefined){
      setDepDto(updatedDepDto);
    }
    onClose();
  }
  useEffect(() => {
   setDepDto(props.value);
  }, [props]);

  return (
    <div>
      <Grid
        templateColumns="repeat(15, 1fr)"
        templateRows="repeat(12, 1fr)"
        gap={2}>
          
        <GridItem colStart={2} colEnd={4}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            상위부서
          </Text>
        </GridItem>
        <GridItem colStart={4} colEnd={7}>
          <Input placeholder="-" size="md" borderRadius="14px"
            name="upperCd" defaultValue={depDto.upperCd} key={depDto.dpCd}  onChange={onChange} />
        </GridItem>
        <GridItem colStart={7} colEnd={8}>
          <Button onClick={onOpen}><DragHandleIcon/></Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>상위부서</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <DepUpperCd value={depDto.dpNm} getValue={getValue}/>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={click}>
                    선택
                  </Button>
                  <Button  onClick={onClose}>취소</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
        </GridItem>

        <GridItem colStart={9} colEnd={11}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            대내외 수신여부
          </Text>
        </GridItem>
        <GridItem colStart={11} colEnd={15}>
          <RadioGroup defaultValue={recYN.toString()} key={depDto.dpCd} 
            onChange={(value) => onChange({ target: { name: "recYN", value: value === "true" }})}
          >
            <HStack spacing="24px">
              <Radio value="true">사용</Radio>
              <Radio value="false">미사용</Radio>
            </HStack>
          </RadioGroup>
        </GridItem>

        <GridItem colStart={2} colEnd={4}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            표준행정코드
          </Text>
        </GridItem>
        <GridItem colStart={4} colEnd={8}>
          <Input placeholder="표준행정코드" size="md" borderRadius="14px"
            name="stnd" defaultValue={depDto.stnd} key={depDto.dpCd}  onChange={onChange} />
        </GridItem>

        <GridItem colStart={9} colEnd={11}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            발신인명
          </Text>
        </GridItem>
        <GridItem colStart={11} colEnd={15}>
          <Input placeholder="발신인명" size="md" borderRadius="14px"
            name="reqNm" defaultValue={depDto.reqNm} key={depDto.dpCd} onChange={onChange}/>
        </GridItem>

        <GridItem colStart={2} colEnd={4}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            부서코드
          </Text>
        </GridItem>
        <GridItem colStart={4} colEnd={8}>
        <Text color={textColor} fontSize="sm" fontWeight="500">
          {depDto.dpCd}
        </Text>
        </GridItem>

        <GridItem colStart={9} colEnd={11}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            부서유형
          </Text>
        </GridItem>
        <GridItem colStart={11} colEnd={15}>
          <Select placeholder="" borderRadius="14px" name="typeCd"
            defaultValue={depDto.typeCd} key={depDto.dpCd} onChange={onChange}>
            <option value="임시">임시</option>
            <option value="부서">부서</option>
            <option value="팀">팀</option>
          </Select>
        </GridItem>

        <GridItem colStart={2} colEnd={4}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            부서명
          </Text>
        </GridItem>
        <GridItem colStart={4} colEnd={8}>
          <Input placeholder="부서명" size="md" borderRadius="14px" 
            name="dpNm" defaultValue={depDto.dpNm} key={depDto.dpCd}  onChange={onChange}/>
        </GridItem>

        <GridItem colStart={9} colEnd={11}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            부서약칭
          </Text>
        </GridItem>
        <GridItem colStart={11} colEnd={15}>
          <Input placeholder="부서약칭" size="md" borderRadius="14px"
            name="dpAbb" defaultValue={depDto.dpAbb} key={depDto.dpCd} onChange={onChange} />
        </GridItem>

        <GridItem colStart={2} colEnd={4}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            부서주소
          </Text>
        </GridItem>
        <GridItem colStart={4} colEnd={7}>
          <Input placeholder="우편번호" size="md" borderRadius="14px"
            name="postNum" defaultValue={depDto.postNum} key={depDto.dpCd}  onChange={onChange}/>
        </GridItem>
        <GridItem colStart={7} colEnd={8}>
          <Button size='xs'  variant='outline'>
            우편번호
          </Button>
        </GridItem>

        <GridItem colStart={9} colEnd={11}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            사용여부
          </Text>
        </GridItem>
        <GridItem colStart={11} colEnd={15}>
          <RadioGroup defaultValue={useYN.toString()} key={depDto.dpCd}
            onChange={(value) => onChange({ target: { name: "useYN", value: value === "true" }})}>
            <HStack spacing="24px">
              <Radio value="true">사용</Radio>
              <Radio value="false">미사용</Radio>
            </HStack>
          </RadioGroup>
        </GridItem>
        
        <GridItem colStart={4} colEnd={8}>
          <Input placeholder="주소" size="md" borderRadius="14px" 
            name="addr" defaultValue={depDto.addr} key={depDto.dpCd}  onChange={onChange}/>
        </GridItem>

        <GridItem colStart={9} colEnd={11}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            조작도표시
          </Text>
        </GridItem>
        <GridItem colStart={11} colEnd={15}>
          <RadioGroup defaultValue={organYN.toString()} key={depDto.dpCd}
          onChange={(value) => onChange({ target: { name: "organYN", value: value === "true" }})}>  
            <HStack spacing="24px">
              <Radio value="true">표시</Radio>
              <Radio value="false">미표시</Radio>
            </HStack>
          </RadioGroup>
        </GridItem>

        <GridItem colStart={4} colEnd={8}>
          <Input placeholder="상세주소" size="md" borderRadius="14px" 
            name="addrDetail" defaultValue={depDto.addrDetail} key={depDto.dpCd} onChange={onChange}/>
        </GridItem>
        
        
        <GridItem colStart={2} colEnd={4}>
          <Text color={textColor} fontSize="sm" fontWeight="700">
            정렬
          </Text>
        </GridItem>
        <GridItem colStart={4} colEnd={8}>
          <Input placeholder="정렬" size="md" borderRadius="14px" 
            name="sort" defaultValue={depDto.sort} onChange={onChange} />
        </GridItem>
      </Grid>
    </div>
  );
};

export default DepBasic;
