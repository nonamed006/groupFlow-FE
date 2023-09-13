import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { Text, Icon } from "@chakra-ui/react";
// Chakra imports
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// Custom components
import Card from "components/card/Card.js";
import moment from "moment";

const CalendarCustom = ({onClose, setDate }) =>{

  const [value, onChange] = useState(new Date());
  const handleDateChange = (selectedDate) => {
      onChange(selectedDate);
      onClose();
      setDate(moment(selectedDate).format("YYYY-MM-DD"));
    };
  
  return (
    <Card
      align='center'
      direction='column'
      w='100%'
      maxW='max-content'
      p='20px 15px'
      h='max-content'
      >
      <Calendar
       // onChange={onChange}
        value={value}
     
        onChange={handleDateChange} 
        view={"month"}
        tileContent={<Text color='brand.500'></Text>}
        prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px' />}
        nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px' />}
        formatDay={(locale, date) => moment(date).format("DD")}
      />
      
    </Card>
  );
}
export default CalendarCustom;