import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Card from "components/card/Card";
import { UseMouseOver } from "hook/UseMouseOver";
import GroupCard from "./GroupCard";


const GroupCardList = ({ checkedList, checkHandler, roleGrpList, setRgCd, rgCd, total, coCd }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

    useEffect(()=>{},[roleGrpList]);

    return (
        <Box
            overflowY={"auto"}
            overflowX={'hidden'}
            bg='white'
            borderRadius='lg'
            h={'76%'}
            px={5}>

            {total &&
                <Card
                    index={coCd}
                    backgroundColor={(mouseOverIndex === coCd) || rgCd === 'total' ? 'navy.50' : 'white'}
                    onMouseOut={onMouseOut}
                    onMouseOver={() => {
                        onMouseOver(coCd)
                    }}
                    boxShadow='lg'
                    rounded='md'
                    bg='white'
                    my='2'
                    display={'inline-block'}
                    p='3'
                    h={'60px'}
                    onClick={() => setRgCd('total')}
                    borderColor={ rgCd === 'total' && 'brand.500'}
                    shadow={ rgCd === 'total' ? 'outline' : 'md'}
                    cursor={'pointer'}
                >
                    <Box ml={4}>
                        <Text
                        color={textColor}
                        fontSize="16px"
                        fontWeight="700"
                        lineHeight="40px"
                        textAlign={'left'}>
                        {'적용된 권한그룹'}</Text>
                    </Box>
                    
                </Card>

            }
            {roleGrpList &&
                roleGrpList.map((group, index) => {
                    return (
                        <GroupCard
                        checkedList={checkedList} 
                        checkHandler={checkHandler}
                            rgCd={rgCd}
                            key={index}
                            group={group}
                            index={index}
                            setRgCd={setRgCd}
                        />
                    );
                })}
        </Box>
    );
};

export default GroupCardList;
