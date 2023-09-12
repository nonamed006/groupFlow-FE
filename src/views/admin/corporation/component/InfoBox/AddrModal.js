import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,

  } from "@chakra-ui/react"
import React from "react";
import DaumPostcode from 'react-daum-postcode';

  const AddrModal = ({ isOpen, onClose, setAddr, setPostNum}) => {

    const finalRef = React.useRef();
    const onCompletePost = data => {
        setAddr(data.address);
        setPostNum(data.zonecode);
        onClose();
      }; // onCompletePost 함수
    return (

    <>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{'주소 찾기'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
                <DaumPostcode
	                onComplete={onCompletePost}
                ></DaumPostcode> 
          </ModalBody>
          
        </ModalContent>
      </Modal>
    </>
    );
  };
  
  export default AddrModal;
  