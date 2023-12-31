import React from 'react';
import Card from 'components/card/Card';
import { Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
import searchIncon from 'assets/img/auth/searchIcon.png';
import { UseMouseOver } from "hook/UseMouseOver";

const ResultCard = ({ menuInfo, index, type, content, keyword, handleUseHistory }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const textNumColor = useColorModeValue("brand.500", "white");
    const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

    return (
        <>
            <Card
                key={index}
                backgroundColor={(mouseOverIndex === index) && type !== 'none' ? 'navy.50' : 'white'}
                onMouseOut={onMouseOut}
                onMouseOver={() => { type !== 'none' && onMouseOver(index) }}
                rounded='none'
                minH={'43px'}
                display={'inline-block'}
                p='3'
                onClick={() => handleUseHistory(menuInfo.menuPath)}
                cursor={'pointer'}
            >
                {
                    type !== 'none' && menuInfo !== undefined &&
                    <>
                        <Flex justifyContent={'space-around'} w={'100%'}>
                            <Image
                                boxSize={'4'}
                                src={searchIncon}
                                w={'16px'}
                            />
                            <Flex
                                w={'90%'}
                                fontSize="16.5px"
                                fontWeight="400"
                                lineHeight="100%"
                                whiteSpace={'normal'}
                            >
                                {menuInfo !== undefined &&
                                    menuInfo.menuNmPath &&
                                    menuInfo.menuNmPath.map((pathNm, index) => {
                                        return (
                                            <>
                                                {
                                                    pathNm.includes(keyword) ?
                                                        <Text display={'flex'} whiteSpace={'nowrap'}>
                                                            {pathNm.split(keyword)[0]}
                                                            <Text textColor={textNumColor} fontWeight="600">{keyword}</Text>
                                                            {pathNm.split(keyword)[1]}
                                                        </Text>
                                                        :
                                                        <Text whiteSpace={'nowrap'} key={index} textColor={textColor}>{pathNm} </Text>
                                                }
                                                {index + 1 !== menuInfo.menuNmPath.length ? '> ' : ''}
                                            </>
                                        );
                                    })}
                            </Flex>
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