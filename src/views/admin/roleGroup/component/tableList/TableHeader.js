import { Box, Grid, useColorModeValue, Button, Flex, Text, Spacer, GridItem, Select, Input, Table, Th, Td, Tr, Tbody, Thead } from "@chakra-ui/react";
import React, { useState } from "react";


const TableHeader = ({ groupHeader }) => {
    const headerColor = useColorModeValue("#8F9BBA",'white');

    return (

        <Thead >
            <Tr borderColor={headerColor}  boxShadow='lg' > 
                {groupHeader.map((header, index) => {
                    return (
                        <Td key={index} >
                            <Text
                                color={headerColor}
                                fontSize="15px"
                                fontWeight="600"
                                lineHeight="100%"
                            >
                                {header}
                            </Text>
                        </Td>);
                })}
            </Tr>
        </Thead>

    );
};

export default TableHeader;
