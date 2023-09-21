import {
  Box, Flex, Text, useColorModeValue, Image, Spacer
} from "@chakra-ui/react"
import Card from "components/card/Card";
import { UseMouseOver } from "hook/UseMouseOver";
import React, { useState } from "react";

const DepGrpCard = ({ depGrp, index, setDepGrp }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textNumColor = useColorModeValue("brand.500", "white");
  const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

  return (

    <Card 
      key={depGrp.dpGrpcd}
      backgroundColor={mouseOverIndex === index ? 'navy.50' : 'white'}
      onMouseOut={onMouseOut}
      onMouseOver={() => {
        onMouseOver(index)
      }}
      onClick={()=>setDepGrp(depGrp)}
      boxShadow='lg'
      rounded='md'
      bg='white'
      m={2}
      w='98%'
      display={'inline-block'}
      p='0'>
      <Flex>
        {/* 프로필 */}
        <Box >
          <Image
            src='https://bit.ly/dan-abramov'
            alt='Dan Abramov'
            boxSize={'90px'}
            objectFit='cover'
            rounded='md' />
        </Box>
        {/* 정보 */}
        <Box my={3} w={'60%'} >
          <Flex
            align={{ sm: "flex-start", lg: "center" }}
            px="10px"
            pb="20px"
            mb="10px"
            w="130%"
          >
            <Text
              color={textColor}
              fontSize="18px"
              fontWeight="700"
              lineHeight="100%"
            >{depGrp.empDto.empNm} {depGrp.rankNm}/{depGrp.pstnNm}</Text>
            <Box w='1rem' />
            <Text
              color={textColor}
              fontSize="15px"
              fontWeight="300"
              lineHeight="100%"
            > {depGrp.empDto.mailId}</Text>

            <Box>
              <Text
                color={textColor}
                fontSize="15px"
                fontWeight="300"
                lineHeight="100%"
              >{depGrp.empDto.telNum}</Text>
            </Box>

          </Flex>

          <Text
            px="10px"
            color={textColor}
            fontSize="14px"
            fontWeight="300"
            lineHeight="100%">
            {depGrp.dpPathNm &&
              depGrp.dpPathNm.map((pathNm, index) => {
                return <>{pathNm} {index + 1 !== depGrp.dpPathNm.length ? '>' : ''}
                </>
              })}
          </Text>
        </Box>
      </Flex>
    </Card>

  );
};

export default DepGrpCard;
