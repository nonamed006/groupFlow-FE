import { Box, Text, useColorModeValue, Input, Flex, Checkbox } from "@chakra-ui/react";
import React, { useState } from "react";
import Card from "components/card/Card";
import { UseMouseOver } from "hook/UseMouseOver";

const GroupCard = ({ rgCd, group, index, setRgCd }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textNumColor = useColorModeValue("brand.500", "white");
    const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();
    return (

        <Card
            key={index}
            backgroundColor={(mouseOverIndex === index) || (rgCd === group.rgCd)? 'navy.50' : !group.useYn? '#E5E4E2' :'white'}
            onMouseOut={onMouseOut}
            onMouseOver={() => {
                onMouseOver(index)
            }}
            onClick={()=>setRgCd(group.rgCd)}
            boxShadow='lg'
            rounded='md'
            bg='white'
            my='2'
            display={'inline-block'}
            p='3'>
            <Flex>
                <Checkbox mx='3' />
                <Box>
                    <Text
                        color={textColor}
                        fontSize="15px"
                        fontWeight="300"
                        lineHeight="100%">
                        {group.coNm}</Text>
                    <Box my={3} />
                    <Text
                        color={textColor}
                        fontSize="15px"
                        fontWeight="700"
                        lineHeight="100%">
                        {group.grpNm}</Text>
                </Box>
            </Flex>
        </Card>
    );
};

export default GroupCard;
