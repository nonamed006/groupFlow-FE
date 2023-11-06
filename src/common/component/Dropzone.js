// Chakra imports
import { Button, Flex, Input, useColorModeValue } from "@chakra-ui/react";
// Assets
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function Dropzone(props) {
  const { content, setOnDrag, upload, ...rest } = props;
  const bg = useColorModeValue("gray.100", "navy.700");
  const borderColor = useColorModeValue("secondaryGray.100", "whiteAlpha.100");

  // 파일을 드롭했을 때
  const onDrop = useCallback((acceptFiles) => {
    upload(acceptFiles); // prop으로 받아온 업로드 함수에 파일 담아서 실행
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
    </Flex>
  );
}

export default Dropzone;
