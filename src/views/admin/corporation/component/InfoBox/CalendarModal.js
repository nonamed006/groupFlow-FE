import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,

  } from "@chakra-ui/react"
import Calendar from "components/calendar/MiniCalendar"
import React, { useState } from "react";
import { useEffect } from "react";
import AddrBox from './AddrBox';

  const CalendarModal = ({title, isOpen, onClose}) => {
    const finalRef = React.useRef(null);
    return (
        <>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                 <Calendar />
            </ModalBody>
            
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default CalendarModal;
  