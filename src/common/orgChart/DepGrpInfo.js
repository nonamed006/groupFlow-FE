import {
  Box, Flex, Text, useColorModeValue, Image, Grid, GridItem
} from "@chakra-ui/react"
import React from "react";

const DepGrpInfo = ({ depGrp }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textNumColor = useColorModeValue("brand.500", "white");
  return (

    <Box boxShadow='lg' bg='white' borderRadius='lg' h={'650px'} p={2}>
      <Box align={"center"}>
        <Box m={3}>
          <Image
            align={"center"}
            objectFit='cover'
            borderRadius='full'
            boxSize='120px'
            src='https://bit.ly/dan-abramov'
            alt='Dan Abramov'
          />
        </Box>
        <Text
          color={textColor}
          fontSize="18px"
          fontWeight="700"
          lineHeight="100%">{depGrp.empNm} {depGrp.rankNm}/{depGrp.pstnNm}</Text>
        <Text>{depGrp.mailId}</Text>
      </Box>
      <br />
      <Box>
        <Grid gap={2} p={2}>
          <GridItem m={1} colSpan={2} colStart={0} colEnd={2}>
            <Text color={textColor}
              fontSize="15px"
              fontWeight="600"
              lineHeight="100%">소속부서</Text>
          </GridItem>
          <GridItem m={1} colSpan={2} colStart={3} colEnd={5}>
            <Text
              color={textColor}
              fontSize="15px"
              fontWeight="300"
              lineHeight="100%">
              {depGrp.dpPathNm &&
                depGrp.dpPathNm.map((pathNm, index) => {
                  return <>{pathNm} {index + 1 !== depGrp.dpPathNm.length ? '>' : ''}
                  </>

                })} </Text>
          </GridItem>

          <GridItem m={1} colSpan={2} colStart={0} colEnd={2}>
            <Text color={textColor}
              fontSize="15px"
              fontWeight="600"
              lineHeight="100%">전화번호</Text>
          </GridItem>
          <GridItem m={1} colSpan={2} colStart={3} colEnd={5}>
            <Text
              color={textColor}
              fontSize="15px"
              fontWeight="300"
              lineHeight="100%"
            >{depGrp.telNum}</Text>
          </GridItem>

          <GridItem m={1} colSpan={2} colStart={0} colEnd={2}>
            <Text color={textColor}
              fontSize="15px"
              fontWeight="600"
              lineHeight="100%">회사메일</Text>
          </GridItem>
          <GridItem m={1} colSpan={2} colStart={3} colEnd={5}>
            <Text
              color={textColor}
              fontSize="15px"
              fontWeight="300"
              lineHeight="100%"
            >{depGrp.mailId}@{depGrp.coDomain}</Text>
          </GridItem>

          <GridItem m={1} colSpan={2} colStart={0} colEnd={2}>
            <Text color={textColor}
              fontSize="15px"
              fontWeight="600"
              lineHeight="100%">개인메일</Text>
          </GridItem>

          <GridItem m={1} colSpan={2} colStart={3} colEnd={5}>
            <Text
              color={textColor}
              fontSize="15px"
              fontWeight="300"
              lineHeight="100%"
            >{depGrp.psnMail}</Text>
          </GridItem>

        </Grid>
      </Box>
    </Box>
  );
};

export default DepGrpInfo;
