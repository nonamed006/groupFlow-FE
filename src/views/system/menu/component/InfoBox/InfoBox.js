import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from 'react';
import InfoBoxBar from "./InfoBoxBar";
import { useEffect } from "react";
import InputGrid from "./InputGrid";

const InfoBox = ({title}) => {
    return (
        <Box borderRadius="lg" bg="white" h="700px" p="6"  backgroundColor="white">
            {/* <InfoBoxBar title={title} /> */}
            <Box>
                <InputGrid title={title}/>
            </Box>
        </Box>
    );
};

export default InfoBox;