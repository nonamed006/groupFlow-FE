import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton
  } from "@chakra-ui/react"

import React, { useState } from "react";

  const ModalLayout = ({title, isOpen, onClose, children }) => {
    const finalRef = React.useRef(null);
    return (
        <>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {children }
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default ModalLayout;
  