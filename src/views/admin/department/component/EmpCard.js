import {
  Box,
  Flex,
  Text,
  useColorModeValue, Button
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
// import {AddIcon } from '@chakra-ui/icons'
import { useDispatch } from 'react-redux';
import { setDataPk } from 'redux/depDetail';
import React, { useState } from "react";
import { PORT } from "set";
import { useEffect } from "react";
import RealGrid from "./RealGrid";
import { useSelector } from "react-redux";

const EmpCard = () => {
  const dispatch = useDispatch();

  const org = useSelector((state) => state.dep.dataPk);
  // console.log(searchData)
  // console.log(searchList)
  const [org2, setOrg2] = useState();
  console.log(org)
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const depInsert = () => {
    // setOrg2(setDataPk(0));
  }
  useEffect(() => {
    
    // if(searchData != 0){
    //   setOrg(searchData)
     
    //   }
    //   else{
    //     let url = `${PORT}/dep?text=&coNm=`;
    //     fetch(url, {method : "GET" })	
    //       .then(res=>res.json())
    //       .then(res=>{
    //         console.log(res)
    //         setOrg(res.data); 
    //       });
    //   }
  }, []);

  return (
    <div>
      <Box borderRadius="lg" bg="white" h="600px" p="6">
        <Flex
          align={{ sm: "flex-start", lg: "center" }}
          justify="space-between"
          w="100%"
          px="22px"
          pb="20px"
          mb="10px"
        >
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            조직도
          </Text>
          <Button variant="action" onClick={depInsert}>추가</Button>
        </Flex>
        <RealGrid value={org}></RealGrid>
      </Box>
    </div>
  );
};

export default EmpCard;
