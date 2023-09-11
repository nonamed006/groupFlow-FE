import {Box} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from 'react';
import InputTable from './InputTable';
import InfoBoxBar from "./InfoBoxBar";
import InputGrid from "./InputGrid";

const InfoBox = ({title}) => {

    return (
        <Box borderRadius="lg" bg="white"  p="6"  backgroundColor="white">
            <InfoBoxBar title={title} />
            <Box>
                <InputTable />
                {/* <InputGrid /> */}
            </Box>
        </Box>
    );
};

export default InfoBox;