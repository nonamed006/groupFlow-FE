import React from "react";
import ChangeTableTr from "./ChangeTableTr";
import { Tbody } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
const ChangeTableTbody = (chHistory) => {
  return (
    <Tbody>
      {chHistory.chHistory.length > 0 &&
        chHistory.chHistory.map((data, index) => {
          return <ChangeTableTr key={index} index={index} data={data} />;
        })}
    </Tbody>
  );
};

export default ChangeTableTbody;
