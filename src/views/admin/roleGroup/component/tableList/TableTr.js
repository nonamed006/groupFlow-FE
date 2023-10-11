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
            <Td align="center" >
                <Text color={textColor} fontSize="md" fontWeight="500">
                    {data.depGrpDto.dpNm}
                </Text>
            </Td>
            <Td align="center" >
                <Text color={textColor} fontSize="md" fontWeight="500">
                    {data.depGrpDto.rankNm} / {data.depGrpDto.pstnNm}
                </Text>
            </Td>
            <Td align="center" >
                <Text color={textColor} fontSize="md" fontWeight="500">
                    {data.depGrpDto.empNm} ({data.depGrpDto.mailId})
                </Text>
            </Td>
        </Tr>
    );
};

export default TableTr;
