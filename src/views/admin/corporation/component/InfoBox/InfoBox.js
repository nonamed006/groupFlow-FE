import { Box , Button, Text, Flex, useColorModeValue, Table} from '@chakra-ui/react/dist/chakra-ui-react.cjs';
import React from 'react';
import InputTable from './InputTable';

const InfoBox = ({title}) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    return (
        <div>
            <InfoBox title={title} />
            <Box>
               <InputTable />
            </Box>
        </div>
    );
};

export default InfoBox;