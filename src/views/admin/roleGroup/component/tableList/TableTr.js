import {
    Td,
    Text,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";
import { UseMouseOver } from "hook/UseMouseOver";

const TableTr = ({ data, index }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const [mouseOverIndex, onMouseOver, onMouseOut] = UseMouseOver();

    return (
        <Tr
            backgroundColor={mouseOverIndex === index ? 'navy.50' : 'white'}
            onMouseOut={onMouseOut}
            onMouseOver={() => {
                onMouseOver(index)
            }}
            boxShadow='lg'
            mb={'7'}
        >

            <Td textAlign="center" fontWeight={500} fontSize={'sm'} >
                <Text  color={textColor}  textOverflow={'ellipsis'}  whiteSpace={"nowrap"}  w={'80px'} overflow={'hidden'}>
                {data.dpNm}
                </Text>
            </Td>
            <Td textAlign="center" fontWeight={500} fontSize={'sm'} >
                <Text  color={textColor} textOverflow={'ellipsis'}  whiteSpace={"nowrap"}  w={'80px'} overflow={'hidden'}>
                {data.rankNm} / {data.pstnNm}
                </Text>
            </Td>
            <Td textAlign="center" fontWeight={500} fontSize={'sm'}>
                <Text  color={textColor}   textOverflow={'ellipsis'}  whiteSpace={"nowrap"}  w={'100px'} overflow={'hidden'}>
                    {data.empNm} ({data.mailId})
                </Text>
            </Td>
        </Tr>
    );
};

export default TableTr;
