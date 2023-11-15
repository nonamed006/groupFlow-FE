import React from "react";
import ChangeTableTr from "./ChangeTableTr";
import { Tbody } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
const ChangeTableTbody = (chHistory) => {
  return (
    <Tbody minHeight={1000}>
      {chHistory.chHistory?.list?.length > 0 &&
        chHistory.chHistory?.list?.map((data, index) => {
          return <ChangeTableTr key={index} index={index} data={data} />;
        })}
    </Tbody>
  );
};

export default ChangeTableTbody;
