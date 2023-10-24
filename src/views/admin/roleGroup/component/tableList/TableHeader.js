import { useColorModeValue, Text, Td, Tr, Thead } from "@chakra-ui/react";
import React from "react";


const ListCardTableHeader = ({ headerGroups }) => {
    const headerColor = useColorModeValue("#8F9BBA",'white');

    return (

        <Thead>
            <Tr bg={'#F4F7FE'} boxShadow='lg' > 
                {headerGroups.map((header, index) => {
                    return ( 
                        <Td key={index} >
                            <Text
                                color={headerColor}
                                fontSize="md"
                                fontWeight="600"
                                lineHeight="100%"
                                w={'80px'}
                            >
                                {header}
                            </Text>
                        </Td>);
                })}
            </Tr>
        </Thead>

    );
};

export default ListCardTableHeader;
