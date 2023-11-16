import {
  Input,
  FormControl,
  FormLabel,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import Accounting from "./../../views/system/accounting/index";

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
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <FormControl display={"flex"} w={"100%"} isRequired={isRequired}>
      {title && (
        <FormLabel color={textColor} fontSize="md" fontWeight="600" w={"40%"} lineHeight={"40px"}>
          {title}
        </FormLabel>)}
      <Input
        name={name}
        w={"100%"}
        fontSize={"14px"}
        borderRadius="5px"
        value={value}
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
