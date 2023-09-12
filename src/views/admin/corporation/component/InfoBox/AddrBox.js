import { Input, Button,GridItem, Text, useDisclosure} from '@chakra-ui/react';
import React, { useState } from "react";
import AddrModal from './AddrModal';

  const AddrBox = ({title, corp}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [postNum, setPostNum] = useState();
    const [addr, setAddr] = useState(); 

    return (
    <>
              <GridItem colSpan={2} rowSpan={3}>
                  <Text fontSize="sm" fontWeight="600">
                    {title}
                  </Text>
                </GridItem>
                <GridItem colStart={3} colEnd={7}>
                    <Input id="postNum" name="postNum"  size="md" borderRadius="14px" value={corp!==undefined?corp.postNum:postNum} placeholder="우편번호" readOnly/>
               </GridItem>
                <GridItem colStart={7} colEnd={14}>
                    <Button id="postNumBtn" onClick={onOpen}>우편번호 찾기</Button>
                </GridItem>
                <GridItem colStart={3} colEnd={14}>
                    <Input id="addr" name="addr"  size="md" borderRadius="14px" value={corp!==undefined?corp.addr:addr} placeholder="주소를 선택하세요" readOnly/>
                </GridItem>
                <GridItem colStart={3} colEnd={14}>
                    <Input id="addrDetail" name="addrDetail"  size="md" borderRadius="14px" defaultValue={corp!==undefined?corp.addrDetail:''} placeholder="상세주소를 입력하세요."/>
                </GridItem>

          {isOpen? <AddrModal isOpen={isOpen} onClose={onClose} setPostNum={setPostNum} setAddr={setAddr}/>:''}
         </>
    );
  };
  
  export default AddrBox; 