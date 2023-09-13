import { Button, useDisclosure} from '@chakra-ui/react';
import React from "react";

import CalendarModal from './CalendarModal';
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";

  const DateButton = ({date, setDate}) => {
    const {isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Button onClick={onOpen} w='100%' color='gray'>{date?date:'날짜를 선택하세요'}</Button>
            {isOpen ? <CalendarModal  isOpen={isOpen} onClose={onClose} setDate={setDate}/>:''}
        </>
    );
  };
  
  export default DateButton;
  