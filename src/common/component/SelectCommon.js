import { FormControl, FormLabel, Select, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PORT } from "set";

const SelectCommon = ({ ccNum, ccType, defaultMsg, handleChange, values, isReadOnly, name, isRequired, searchBar, title, pk }) => {
  const [options, setOptions] = useState([]);
  const textColor = useColorModeValue("secondaryGray.900", "white");
  
  const getCopn = (ccNum, ccType) => {
    let url = `${PORT}/common/selectCopn`;
    let obj = new Object();
    obj.ccNum = ccNum;
    obj.ccType = ccType;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => {
        setOptions(res.data);
      }); 
  };

  useEffect(() => {
    getCopn(ccNum, ccType);
  }, []);

  return (
    <FormControl display={"flex"} w={"100%"} h={'fit-content'} isRequired={isRequired}>
      {title && (
        <FormLabel
          color={textColor}
          fontSize={searchBar ? '16px' : "md"}
          fontWeight={searchBar ? '400' : "600"}
          w={searchBar ? '18%' : "40%"}
          whiteSpace={searchBar ? "nowrap" : 'normal'}
          lineHeight={"40px"}
          textAlign="left"
        >
          {title}
        </FormLabel>
      )}
      <Select
        placeholder={defaultMsg}
        onChange={handleChange}
        name={name}
        value={values}
        w={"102%"}
        key={pk}
        disabled={isReadOnly}
      >
        {options.map((column, index) => {
          return (
            <option
              id={column.ccCd}
              name={ccNum + ccType}
              key={index}
              value={column.ccCd}
            >
              {column.ccNm} 
            </option>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectCommon;
