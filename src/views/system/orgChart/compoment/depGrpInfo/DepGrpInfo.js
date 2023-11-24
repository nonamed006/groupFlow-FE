import {
  Box, Flex, Text, useColorModeValue, Image, Grid, GridItem
} from "@chakra-ui/react"
import React, { useEffect } from "react";
import { PORT } from 'set';
import defaultProfile from "assets/img/profile/employee.png";

const DepGrpInfo = ({ depGrp }) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  useEffect(() => {
  }, [depGrp]);

  return (

    <Box boxShadow='md' bg='white' borderRadius='5px' h={'650px'} p={2}>
      {depGrp ?
        <>
          <Box display={'flex'} justifyContent={"center"}>
            <Box align={"center"} mb={2} pb={2} borderBottom={"1px"} color={"lightgray"} w={'90%'}>
              <Box m={3} w={'120px'} h={'120px'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Image
                  align={"center"}
                  objectFit='cover'
                  borderRadius='lg'
                  mb={4}
                  boxSize={'120px'}
                  src={depGrp.empDto.fileCd ? `${PORT}/menu/icon-${depGrp.empDto.fileCd}` : defaultProfile}
                  alt='사원사진'
                />
              </Box>
              <Text
                color={textColor}
                fontSize="18px"
                fontWeight="700"
                lineHeight="100%">{depGrp.empDto.empNm}</Text>
            </Box>
          </Box>

          <Box>
            <Grid gap={2} p={2}>
              <GridItem m={1} colSpan={2} colStart={0} colEnd={2} >
                <Text color={textColor}
                  fontSize="15px"
                  fontWeight="600"
                  lineHeight="100%">직급</Text>
              </GridItem>
              <GridItem m={1} colSpan={2} colStart={3} colEnd={5}>
                <Text
                  color={textColor}
                  fontSize="15px"
                  fontWeight="300"
                  lineHeight="100%"
                >{depGrp.rankNm}</Text>
              </GridItem>
              <GridItem m={1} colSpan={2} colStart={0} colEnd={2} >
                <Text color={textColor}
                  fontSize="15px"
                  fontWeight="600"
                  lineHeight="100%">직책</Text>
              </GridItem>
              <GridItem m={1} colSpan={2} colStart={3} colEnd={5}>
                <Text
                  color={textColor}
                  fontSize="15px"
                  fontWeight="300"
                  lineHeight="100%"
                >{depGrp.pstnNm}</Text>
              </GridItem>
              <GridItem m={1} colSpan={2} colStart={0} colEnd={2} >
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
                      return (
                        <span key={index}>
                          {pathNm} {index + 1 !== depGrp.dpPathNm.length ? '>' : ''}
                        </span>
                      );
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
                >{depGrp.empDto.mailId}{depGrp.coDomain && '@' + depGrp.coDomain}</Text>
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
                >{depGrp.empDto.psnMail}</Text>
              </GridItem>

            </Grid>
          </Box></>
        :
        <Text
          pt={260}
          align={'center'}
          fontWeight={600}
          color={'lightgray'}
          fontSize={'18px'}
        >
          검색된 데이터가 없습니다.
        </Text>
      }
    </Box>
  );
};

export default DepGrpInfo;
