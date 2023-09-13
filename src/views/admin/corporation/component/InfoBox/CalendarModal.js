import Calendar from "./CalendarCustom"
import React, { useState } from "react";
import ModalLayout from "./ModalLayout";

  const CalendarModal = ({isOpen, onClose, setDate }) => {
    return (
        <ModalLayout title={''}  isOpen={isOpen} onClose={onClose}>
           <Calendar onClose={onClose} setDate={setDate}/>
        </ModalLayout>
       
    );
  };
  
  export default CalendarModal;
  