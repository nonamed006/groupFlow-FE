// Chakra imports
import { Box, Button, Flex, Input, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import ModalLayout from "common/modal/ModalLayout";
// Assets
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone(props) {
  const { content, setOnDrag, handleEvent, ...rest } = props;
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");
  const [ files, setFiles ] = useState([]);

  // 모달 관련
  const { isOpen, onOpen, onClose } = useDisclosure();

  const upload = () => {
    handleEvent(files);
    onClose();
  }
  // 파일을 드롭했을 때
  const onDrop = useCallback((acceptFiles) => {
    setFiles(acceptFiles);// 파일 세팅
    onOpen();             // 모달 오픈
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

  useEffect(() => {
    if(!isDragActive) setOnDrag(false);
  }, [isDragActive])

  return (
    <Flex
      align='center'
      justify='center'
      bg={bg}
      border='3px dashed'
      borderColor={borderColor}
      borderRadius='16px'
      w='100%'
      h='max-content'
      minH='100%'
      cursor='pointer'
      {...getRootProps({ className: "dropzone" })}
      {...rest}>
      <Input variant='main' {...getInputProps()} />
      <Button variant='no-effects'>{content}</Button>

      { isOpen && (
        <ModalLayout
          title={'파일 업로드'}
          buttonYn={true}
          btnText={'확인'}
          onClose={onClose}
          size={'sm'}
          handleCheck={upload} // prop으로 받아온 업로드 함수에 파일 담아서 실행
        >
          <Box>
            <Text>{'파일 ' + files.length + '건을 업로드 하시겠습니까?'}</Text>
          </Box>
        </ModalLayout>
      )}
    </Flex>
  );
}

export default Dropzone;
