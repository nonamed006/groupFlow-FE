import { Input,FormControl, FormLabel, RadioGroup, HStack, Radio, Select } from '@chakra-ui/react';
import React from "react";

import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
;

const FormSelect = ({ title, name, defaultValue, pk, onChange, readOnly, isRequired, placeholder, values }) => {
  return (
    <FormControl  display={'flex'} w={'100%'} isRequired={isRequired}>
        <FormLabel fontSize="md" fontWeight="600" w={'50%'} >{title}</FormLabel>
        <Select w={'100%'} name={name} defaultValue={defaultValue} key={pk} onChange={onChange} placeholder={placeholder} disabled={readOnly} >
                {
                    values.map((value)=>{
                        return (
                            <option name={name} value={value.value} >{value.name}</option>
                        );
                    })
                }
          </Select>
    
    </FormControl>
  );
};

export default FormSelect;
