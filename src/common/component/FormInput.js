import { Input, FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";

import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
const FormInput = ({
  title,
  name,
  value,
  pk,
  onChange,
  readOnly,
  isRequired,
  inputType,
  placeholder,
}) => {
  return (
    <FormControl display={"flex"} w={"100%"} isRequired={isRequired}>
      {title && (
        <FormLabel fontSize="md" fontWeight="600" w={"50%"}>
          {title}
        </FormLabel>
      )}
      <Input
        name={name}
        w={"100%"}
        fontSize={"14px"}
        borderRadius="5px"
        defaultValue={value}
        key={pk}
        onChange={onChange}
        readOnly={readOnly}
        type={inputType}
        placeholder={placeholder}
      />
    </FormControl>
  );
};

export default FormInput;
