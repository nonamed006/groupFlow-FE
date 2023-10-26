import React from 'react';
import Card from 'components/card/Card';
import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import searchIncon from 'assets/img/auth/searchIcon.png';
import { UseMouseOver } from "hook/UseMouseOver";

const ResultCard = ({ content, index, type }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();
    return (
        <>
            <Card
                key={index}
                backgroundColor={(mouseOverIndex === index) && type !== 'none' ? 'navy.50' : 'white'}
                onMouseOut={onMouseOut}
                onMouseOver={() => { type !== 'none' && onMouseOver(index) }}
                rounded='lg'
                h={'80%'}
                display={'inline-block'}
                p='3'
                onClick={() => { }}
                borderColor={'brand.500'}
                cursor={'pointer'}
            >
                <Flex justifyContent={'space-around'} >
                    {
                        type !== 'none' &&
                        <Image
                            boxSize={'4'}
                            src={searchIncon}
                            w={'16px'}
                        />
                    }
                    <Text
                        w={'93%'}
                        fontSize="17px"
                        fontWeight="500"
                        lineHeight="100%"
                        color={textColor}
                    >
                        {content}
                    </Text>
                </Flex>

            </Card>

        </>
    );
};
export default ResultCard;