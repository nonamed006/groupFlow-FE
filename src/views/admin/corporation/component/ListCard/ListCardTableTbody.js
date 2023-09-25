import React from "react";
import ListCardTableTr from "./ListCardTableTr";
import {

  Tbody,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
const ListCardTableTbody = ({ listData, setCoCd }) => {

  return (
    <Tbody >
      {listData &&
        listData.map((data, index) => {
          return <ListCardTableTr setCoCd={setCoCd} key={index} index={index} data={data} />
        })}
    </Tbody >

  );
};

export default ListCardTableTbody;
