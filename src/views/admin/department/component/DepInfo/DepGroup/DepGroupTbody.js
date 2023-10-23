import React from "react";
import DepGroupTableTr from "./DepGroupTableTr";
import { Tbody } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
const DepGroupTbody = (dg) => {
  return (
    <Tbody>
      {dg.dg?.length > 0 &&
        dg.dg?.map((data, index) => {
          return <DepGroupTableTr key={index} index={index} data={data} />;
        })}
    </Tbody>
  );
};

export default DepGroupTbody;
