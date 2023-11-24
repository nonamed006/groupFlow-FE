import {
  Input,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Select,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
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
  type,
  searchBar,
  values,
  defaultValue,
  btnText,
  handleSearchBtn,
}) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <FormControl
      display={"flex"}
      w={"100%"}
      h={"fit-content"}
      isRequired={isRequired}
    >
      {title && (
        <FormLabel
          color={textColor}
          fontSize={searchBar ? "16px" : "md"}
          fontWeight={searchBar ? "400" : "600"}
          w={searchBar ? "18%" : "40%"}
          // whiteSpace={searchBar ? "nowrap" : 'normal'}
          whiteSpace={"nowrap"}
          lineHeight={"40px"}
          textAlign="left"
        >
          {title}
        </FormLabel>
      )}
      {
        (type !== 'select' && type !== 'radio') ?
          inputType !== 'roleGroup' ?
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
            :
            <Input
              name={name}
              w={"100%"}
              fontSize={"14px"}
              borderRadius="5px"
              value={value}
              key={pk}
              onKeyUp={onChange}
              readOnly={readOnly}
              placeholder={placeholder}
            />
          :
          type === 'select' ?
            <Select
              w={"102%"}
              name={name}
              value={defaultValue}
              key={pk}
              onChange={onChange}
              placeholder={placeholder}
              disabled={readOnly}
            >
              {values &&
                values.map((value) => {
                  return (
                    <option name={name} value={value.value}>
                      {value.name}
                    </option>
                  );
                })}
            </Select>
            :
            type === 'radio' ?
              <RadioGroup name={name} value={defaultValue} key={pk} w={'100%'}>
                <HStack spacing="25px" >
                  {values.map((value) => {
                    return (
                      <Radio
                        name={name}
                        value={value.value}
                        onChange={onChange}
                        isReadOnly={readOnly}
                      >
                        {value.name}
                      </Radio>
                    );
                  })}
                </HStack>
              </RadioGroup>
              : <></>
      }
      {
        btnText &&
        <Button
          ml={2}
          float={"right"}
          w={"80px"}
          variant="brand"
          borderRadius="10px"
          fontWeight={600}
          onClick={handleSearchBtn}
        >
          {btnText}
        </Button>
    }
    </FormControl>
  );
};

export default FormInput;
