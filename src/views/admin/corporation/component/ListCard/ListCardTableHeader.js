import { Box, Grid, useColorModeValue, Button, Flex, Text, Spacer, GridItem, Select, Input, Table, Th, Td, Tr, Tbody, Thead } from "@chakra-ui/react";
import React, { useState } from "react";


const TableHeader = ({ headerGroups }) => {
    const headerColor = useColorModeValue("#8F9BBA",'white');

    return (

            <Tr > 
                {headerGroups.map((header, index) => {
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

    );
};

export default TableHeader;
