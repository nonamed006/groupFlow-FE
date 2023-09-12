import { Box, Button, Select, Grid, Input, GridItem, Text, RadioGroup, HStack, Radio, SelectField} from '@chakra-ui/react';
import Calendar from "components/calendar/MiniCalendar"
import React, { useState } from "react";
import { useEffect } from "react";
import DaumPostcode from 'react-daum-postcode';

  const PostCode = () => {
    const postCodeStyle = {
        width: '400px',
        height: '400px',
        // display: modalState ? 'block' : 'none',
      }; // 스타일 정의 code
      const onCompletePost = data => {
        // setModalState(false);
        // setInputAddressValue(data.address);
        // setInputZipCodeValue(data.zonecode);
      }; // onCompletePost 함수
    return (
      
           <DaumPostcode
	            style={postCodeStyle}
	            onComplete={onCompletePost}
            ></DaumPostcode> 
        
    );
  };
  
  export default PostCode;
  