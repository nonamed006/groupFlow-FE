// Chakra imports
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import React from "react";
// Assets
import Dropzone from "./Dropzone";

export default function Upload(props) {
  const { used, total, setOnDrag, handleEvent, ...rest } = props;
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  
  return (
      <Flex h='100%' direction={{ base: "column", "2xl": "row" }}>
        <Dropzone
          w={'100%'}
          h={'100%'}
          setOnDrag={setOnDrag}
          handleEvent={handleEvent}
          content={
            <Box>
              {/* <Icon as={MdUpload} w='80px' h='80px' color={brandColor} /> */}
              <Flex justify='center' mx='auto' mb='12px'>
                <Text fontSize='lg' fontWeight='500' color={brandColor}>
                  파일을 드래그하여 이곳에 놓아주세요.
                </Text>
              </Flex>
              <Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
                PNG, JPG 파일만 업로드 가능합니다.
              </Text>
            </Box>
          }
        />
      </Flex>
  );
}
