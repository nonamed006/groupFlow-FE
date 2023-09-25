import { Box, Text, useColorModeValue, Input, Flex, Checkbox } from "@chakra-ui/react";
import React, { useState } from "react";
import Card from "components/card/Card";
import { UseMouseOver } from "hook/UseMouseOver";

const GroupCard = ({ group, index }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textNumColor = useColorModeValue("brand.500", "white");
    const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();
    return (

        <Card
            key={index}
            backgroundColor={mouseOverIndex === index ? 'navy.50' : 'white'}
            onMouseOut={onMouseOut}
            onMouseOver={() => {
                onMouseOver(index)
            }}
            boxShadow='lg'
            rounded='md'
            bg='white'
            m={2}
            w='98%'
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
