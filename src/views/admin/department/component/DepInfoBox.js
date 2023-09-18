import {Stack, Button, Text, Flex , useColorModeValue, Grid, GridItem} from "@chakra-ui/react/dist/chakra-ui-react.cjs";
import React from 'react';
import { useEffect } from "react";
const InfoBox = ({title}) => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
    useEffect(()=> {

    }, );
    return (
        
          <Grid 
            templateColumns="repeat(15, 1fr)"
            gap={2} >
            <GridItem colStart={1} colEnd={3}>
            <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
              {title}
            </Text>
            </GridItem>

            <GridItem colStart={12} colEnd={16}>
                <Button variant="action">저장</Button>
                <Button variant="action">삭제</Button>
                <Button variant="action">변경이력</Button>
            </GridItem>
          
            
          </Grid>
    );
};

export default InfoBox;