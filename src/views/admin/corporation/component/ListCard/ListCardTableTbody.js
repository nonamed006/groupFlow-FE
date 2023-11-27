import React from "react";
import ListCardTableTr from "./ListCardTableTr";
import { Tbody } from "@chakra-ui/react/dist/chakra-ui-react.cjs";
const ListCardTableTbody = ({ type, listData, setCoCd, coCd }) => {
  return (
    <Tbody>
      {listData &&
        listData.map((data, index) => {
          return (
            <ListCardTableTr
            type={type}
              setCoCd={setCoCd}
              key={index}
              index={index}
              data={data}
              coCd={coCd}
            />
          );
        })}
    </Tbody>
  );
};

export default ListCardTableTbody;
