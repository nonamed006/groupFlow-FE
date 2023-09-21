import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import { React, useState, useEffect } from "react";
import { PORT } from "set";
import GnbCardList from "./GnbCardList";
import GnbCardBar from "./GnbCardBar";


const GnbCard = ({title}) => {
  const [ list, setList ] = useState([]);

  const getGnbMenuList = async () => {
    await fetch(`${PORT}/menu/`, { 'method': 'GET'})
      .then((response) => response.json())
      .then((responseJson) => setList(responseJson.data));
  }

  useEffect(() => {
    getGnbMenuList();
  }, []);

  return (
      <Box borderRadius="lg" bg="white" h="fit-content"  p="6">
          {/* 목록 상단 */}
        <GnbCardBar title={title} count={list&&list.length}/>
          {/* 목록 테이블(카드형식) */}
        <GnbCardList list={list}/>
      </Box>
  );
};
  
  export default GnbCard;
  