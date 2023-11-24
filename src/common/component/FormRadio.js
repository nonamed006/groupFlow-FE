import {
  FormControl,
  FormLabel,
  RadioGroup,
  HStack,
  Radio,
  useColorModeValue,
} from "@chakra-ui/react";

import React from "react";

import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
const FormRadio = ({
  title,
  name,
  defaultValue,
  pk,
  onChange,
  readOnly,
  isRequired,
  values,
}) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <FormControl display={"flex"} w={"100%"} isRequired={isRequired}>
      <FormLabel color={textColor} fontSize="md" fontWeight="600" w={"30%"}>
        {title}
      </FormLabel>
      <RadioGroup name={name} value={defaultValue} key={pk}>
        <HStack spacing="24px">
          {values.map((value) => {
            return (
              <Radio
                name={name}
                value={value.value}
                key={value.value}
                onChange={onChange}
                isReadOnly={readOnly}
              >
                {value.name}
              </Radio>
            );
          })}
        </HStack>
      </RadioGroup>
    </FormControl>
  );
};

export default FormRadio;
