import {
  Box, Flex, Text, useColorModeValue, Image, Spacer
} from "@chakra-ui/react"
import Card from "components/card/Card";
import { UseMouseOver } from "hook/UseMouseOver";
import React, { useState } from "react";

import { PORT } from 'set';
import defaultProfile  from "assets/img/profile/solutionapslfintek2352.png";

const DepGrpCard = ({ depGrp, index, setDepGrp, depGrpInfo }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textNumColor = useColorModeValue("brand.500", "white");
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

  return (

    <Card
      key={index}
      backgroundColor={mouseOverIndex === index || depGrpInfo === depGrp ? 'navy.50' : 'white'}
      onMouseOut={onMouseOut}
      onMouseOver={() => {
        onMouseOver(index)
      }}
      onClick={() => setDepGrp(depGrp)}
      boxShadow='lg'
      rounded='md'
      bg='white'
      m={2}
      w='98%'
      display={'inline-block'}
      p='0'
      borderColor={( depGrpInfo === depGrp ) && 'brand.500'}
      shadow={ ( depGrpInfo === depGrp ) ? 'outline' : 'md'}
      >
      <Flex>
        {/* 프로필 */}
        <Box w={'90px'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Image
             src={depGrp.empDto.fileCd?`${PORT}/menu/icon-${depGrp.empDto.fileCd}`:defaultProfile}
            alt='프로필 사진'
            boxSize={'90px'}
            objectFit='fill'
            rounded='md' />
        </Box>
        {/* 정보 */}
        <Box my={3} w={'60%'} >
          <Flex
            align={{ sm: "flex-start", lg: "center" }}
            px="10px"
            w="130%"
            mb={2}
          >
            <Text
              color={textColor}
              fontSize="18px"
              fontWeight="700"
              lineHeight="100%"
            >{depGrp.empDto.empNm} </Text>
            <Spacer />
            <Box>
              <Text
                color={textColor}
                fontSize="15px"
                fontWeight="300"
                lineHeight="100%"
              >{depGrp.telNum}</Text>
            </Box>
          </Flex>
          <Text
            px="10px"
            color={textColor}
            fontSize="14px"
            fontWeight="600"
            lineHeight="100%"
            mb={2}
          >  {depGrp.rankNm} / {depGrp.pstnNm}</Text>
          <Flex
            align={{ sm: "flex-start", lg: "center" }}
            px="10px"
            w="130%"
            mb={2}
            color={textColor}
            fontSize="14px"
            fontWeight="300"
            lineHeight="100%"
          >
            <Text mr={2} whiteSpace={"nowrap"}>
              소속:
            </Text>
            <Text>
              {depGrp.dpPathNm &&
                depGrp.dpPathNm.map((pathNm, index) => {
                  return <span key={index}>{pathNm} {index + 1 !== depGrp.dpPathNm.length ? '>' : ''}
                  </span>
                })}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Card>

  );
};

export default DepGrpCard;
