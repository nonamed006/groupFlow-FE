import { Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { PORT } from "set";

const SelectCommon = ({ ccNum, ccType, defaultMsg, handleChange, values }) => {
  const [options, setOptions] = useState([]);

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
    <Select
      placeholder={defaultMsg}
      onChange={handleChange}
      name={ccNum + ccType}
      value={values}
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
  );
};

export default SelectCommon;
