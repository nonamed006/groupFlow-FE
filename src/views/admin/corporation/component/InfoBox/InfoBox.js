import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from 'react';
import InfoBoxBar from "./InfoBoxBar";
import InputGrid from "./InputGrid";
import { useEffect } from "react";
const InfoBox = ({title, corp, sortValue}) => {
    
    useEffect(()=> {

    }, [corp]);
    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6"  backgroundColor="white">
            <InfoBoxBar title={title} />
            <Box>
                <InputGrid corp={corp} sortValue={sortValue}/>
            </Box>
        </Box>
    );
};

export default InfoBox;