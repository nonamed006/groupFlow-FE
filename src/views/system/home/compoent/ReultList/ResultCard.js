import React from 'react';
import Card from 'components/card/Card';
import { Flex, Image, Spacer, Text, useColorModeValue } from '@chakra-ui/react';
import searchIncon from 'assets/img/auth/searchIcon.png';
import { UseMouseOver } from "hook/UseMouseOver";

const ResultCard = ({ menuInfo, index, type, content }) => {
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
                minH={'50px'}
                display={'inline-block'}
                p='3'
                onClick={() => { }}
                borderColor={'brand.500'}
                cursor={'pointer'}
            >
                {
                    type !== 'none' && menuInfo !== undefined &&
                    <>
                        <Flex justifyContent={'space-around'} >
                            <Image
                                boxSize={'4'}
                                src={searchIncon}
                                w={'16px'}
                            />
                            <Text
                                w={'93%'}
                                fontSize="17px"
                                fontWeight="500"
                                lineHeight="100%"
                                color={textColor}
                            >
                                {menuInfo !== undefined &&
                                    menuInfo.menuNmPath &&
                                    menuInfo.menuNmPath.map((pathNm, index) => {
                                        return (
                                            <span key={index}>
                                                {pathNm} {index + 1 !== menuInfo.menuNmPath.length ? '> ' : ''}
                                            </span>
                                        );
                                    })}
                            </Text>
                        </Flex>
                    </>
                }
                <Text
                    w={'93%'}
                    fontSize="18px"
                    fontWeight="500"
                    lineHeight="100%"
                    color={textColor}
                >{content}</Text>
            </Card>
        </>
    );
};
export default ResultCard;