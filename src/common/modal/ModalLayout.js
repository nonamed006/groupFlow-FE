import {
  Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useColorModeValue,
    ModalFooter,
    Button,
  } from "@chakra-ui/react"

import React from "react";

// title: 모달 제목, children: 모달 내용 컴포넌트, buttonYn: 확인 및 취소 버튼 유무, handleCheck: buttonYn가 true 시, 확인 버튼 클릭할 때 핸들러 함수
// onClose: useDisclosure() 관련 쓰던 거 넣기
// size = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'full']
  const ModalLayout = ({title, onClose, children, buttonYn, handleCheck, size }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const finalRef = React.useRef(null);
    
    return (
        <>
        <Modal scrollBehavior={'inside'} finalFocusRef={finalRef} size={size} isOpen={true} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            {/* 모달 제목 */}
            <ModalHeader color={textColor} >{title}</ModalHeader>
            {/* 모달 닫기 버튼 */}
            <ModalCloseButton />
            {/* 모달 내용 */}
            <ModalBody  >
                {children}
            </ModalBody>
            {/* 확인 및 취소 버튼 */}
            {buttonYn&&
            <ModalFooter >
                <Button m='2' variant="brand" onClick={handleCheck}>확인</Button>
                <Button onClick={onClose} variant="action">취소</Button>
            </ModalFooter>
            }
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalLayout;
  