import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from 'react';
import LnbGridBar from "./InfoBoxBar";
import { useEffect } from "react";
const InfoBox = ({title, corp, sortValue}) => {
    
    useEffect(()=> {

    }, [corp]);
    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6"  backgroundColor="white">
            <LnbGridBar title={title} />
            <Box>
            </Box>
        </Box>
    );
};

export default InfoBox;