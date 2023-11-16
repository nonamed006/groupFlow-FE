
import { FormControl, FormLabel, Select, useColorModeValue } from '@chakra-ui/react';
import React from "react";

import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
const FormSelect = ({
  title,
  name,
  defaultValue,
  pk,
  onChange,
  readOnly,
  isRequired,
  placeholder,
  values,
}) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <FormControl display={"flex"} w={"100%"} isRequired={isRequired}>
      <FormLabel color={textColor} fontSize="md" fontWeight="600" w={"40%"} lineHeight={"40px"}>
        {title}
      </FormLabel>
      <Select
        w={"102%"}
        name={name}
        value={defaultValue}
        key={pk}
        onChange={onChange}
        placeholder={placeholder}
        disabled={readOnly}
      >
        {values.map((value) => {
          return (
            <option name={name} value={value.value}>
              {value.name}
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
