import { Box, Text, useColorModeValue, Flex, Checkbox, Heading } from "@chakra-ui/react";
import React from "react";
import Card from "components/card/Card";
import { UseMouseOver } from "hook/UseMouseOver";

const GroupCard = ({ rgCd, group, index, setRgCd }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();
    return (
        <Card
            key={index}
            backgroundColor={(mouseOverIndex === index) || (rgCd === group.rgCd) ? 'navy.50' : !group.useYn ? 'gray.200' : 'white'}
            onMouseOut={onMouseOut}
            onMouseOver={() => {
                onMouseOver(index)
            }}
            boxShadow='lg'
            rounded='md'
            bg='white'
            my='2'
            display={'inline-block'}
            p='3'
            onClick={() => setRgCd(group.rgCd)}
            borderColor={rgCd === group.rgCd && 'brand.500'}
            shadow={rgCd === group.rgCd ? 'outline' : 'md'}
            cursor={'pointer'}>
            <Flex>
                <Heading flex={1} fontSize='xl'>
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
                </Heading>
                <Text textAlign={'right'} color={'gray.400'} w={'55px'}>{group.useYn ? '사용' : '미사용'}</Text>
            </Flex>
        </Card>


    );
};

export default GroupCard;
