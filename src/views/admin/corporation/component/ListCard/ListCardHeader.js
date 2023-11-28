import {
    Td,
    Text,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from "react";

const ListCardHeader = ({ type }) => {
    const headerGroups = ["회사명", "대표자", "회사구분", "사용" ];

    const headerColor = useColorModeValue("navy.700", 'white');
    return (
        <Thead
            w={'100%'}>
            <Tr
                bg={'#F4F7FE'}
            >
                <Td textAlign={"center"} >
                    <Text
                        color={headerColor}
                        fontSize="md"
                        fontWeight="600"
                        lineHeight="100%"
                        w={"80px"}
                    >
                        {headerGroups[0]}
                    </Text>
                </Td>
                <Td textAlign={"center"} >
                    <Text
                        color={headerColor}
                        fontSize="md"
                        fontWeight="600"
                        lineHeight="100%"
                        w={"50px"}
                    >
                        {headerGroups[1]}
                    </Text>
                </Td>
                <Td ktextAlign={"center"} >
                    <Text
                        color={headerColor}
                        fontSize="md"
                        fontWeight="600"
                        lineHeight="100%"
                        whiteSpace={type ?"normal":"nowrap"}
                        w={type ? "35px" : "60px"}
                    >
                        {headerGroups[2]}
                    </Text>
                </Td>
                <Td textAlign={"center"} >
                    <Text
                        color={headerColor}
                        fontSize="md"
                        fontWeight="600"
                        lineHeight="100%"
                        w={"50px"}
                    >
                        {headerGroups[3]}
                    </Text>
                </Td>
            </Tr>
        </Thead>
    );
};

export default ListCardHeader;
