import { Box, Grid, GridItem, HStack, RadioGroup, Text, Select, Input, Radio } from "@chakra-ui/react";
import React, { useState } from "react";


const GroupAddBox = () => {

    return (

        <Box>
            <Grid templateColumns="repeat(7, 1fr)" m={'2'}>
                <GridItem colSpan={2} m={'1'}>
                    <Text>회사</Text>
                </GridItem>
                <GridItem colStart={3} colEnd={8} m={'1'}>
                    <Select >
                        <option></option>
                    </Select>
                </GridItem>
                <GridItem colSpan={2} m={'1'}>
                    <Text>그룹명</Text>
                </GridItem>
                <GridItem colStart={3} colEnd={8} m={'1'}>
                    <Input placeholder="권한그룹명을 입력하세요" />
                </GridItem>
                <GridItem colSpan={2} m={'1'}>
                    <Text>사용여부</Text>
                </GridItem>
                <GridItem colStart={3} colEnd={8} m={'1'}>
                    <RadioGroup name="useYn" defaultValue={'true'}>
                        <HStack spacing="24px">
                            <Radio name="useYn" value="true"  >사용</Radio>
                            <Radio name="useYn" value="false"  >미사용</Radio>
                        </HStack>
                    </RadioGroup>
                </GridItem>

            </Grid>
        </Box>


    );
};

export default GroupAddBox;
